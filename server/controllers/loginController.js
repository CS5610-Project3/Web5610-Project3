const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if username exists
  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Missing user" });
  }

  // Check if password is correct
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({ message: "Incorrect password" });
  } else {
    // Generate access token
    const accessToken = generateAccessToken(foundUser);

    // Generate refresh token
    const refreshToken = generateRefreshToken(foundUser);

    // Update refresh token with current user in database
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    }); // secure: true,

    // Send tokens to client
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  }
};

// Help to generate access token
const generateAccessToken = (user) => {
  try {
    return jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error generating access token");
  }
};

// Help to generate refresh token
const generateRefreshToken = (user) => {
  try {
    return jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error generating refresh token");
  }
};

module.exports = { handleLogin };
