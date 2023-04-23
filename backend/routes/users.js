const express = require("express");
const router = express.Router();
const loginController = require("../controllers/users/loginController");
const logoutController = require("../controllers/users/logoutController");
const signupController = require("../controllers/users/signupController");
const refreshTokenController = require("../controllers/users/refreshTokenController");


router.post("/login", loginController.handleLogin);

router.post("/logout", logoutController.handleLogout);

router.post("/signup", signupController.handleSignup);

router.post("/refresh", refreshTokenController.handleRefreshToken);


module.exports = router;