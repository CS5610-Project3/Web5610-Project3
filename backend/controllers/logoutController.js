const User = require("../models/User");

const handleLogout = async (req, res) => {
  // on client side, delete the accessToken

  // Get refresh token from cookie
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // Check if refresh token exists in DB
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
    return res.sendStatus(204);
  }

  // Delete refresh token in DB
  try {
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.sendStatus(204);
};

module.exports = { handleLogout };
