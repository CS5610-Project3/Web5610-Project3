const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }
    // Generate new access token
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const expirationTime = new Date() + 1000 * 60 * 15; // 15 minutes
    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   //   secure: true,
    //   sameSite: "none",
    //   maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    // });
    res.json({ accessToken: accessToken, expireAt: expirationTime });
  });
};

module.exports = { handleRefreshToken };
