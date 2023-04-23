const User = require("../../models/User");
const bcrypt = require("bcrypt");

const handleSignup = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  // Check if username already exists
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "Username already exists" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    console.log(user);

    res
      .status(201)
      .json({ message: `New user ${username} created successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleSignup };
