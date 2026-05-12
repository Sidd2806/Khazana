const express = require("express");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router();
// @route post  /api/users/register
// @desc register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const email = req.body.email?.trim().toLowerCase();
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    user = new User({ name, email, password });
    await user.save();
    //jwt payload
    const payload = { user: { _id: user._id, role: user.role } };
    //signup and return token along withuser data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "20h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
  //   @route POST/api/users/login
  //  @desc authenticate user
  // @acess public
});
router.post("/login", async (req, res) => {
  const { password } = req.body;
  const email = req.body.email?.trim().toLowerCase();
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    //jwt payload
    const payload = { user: { _id: user._id, role: user.role } };

    //signup and return token along withuser data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "20h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.error("hii", error);
    res.status(500).json({ message: "Server Error" });
  }
});
// @users get api/users/profile
// @desc get the logged in user profile
// @access protected route
router.get("/profile", protect, (req, res) => {
  res.json(req.user)
});

module.exports = router;
