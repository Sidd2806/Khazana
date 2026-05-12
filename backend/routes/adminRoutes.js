const express = require("express");
const User = require("../model/User");
const { protect, admin } = require("../Middleware/authMiddleware");

const router = express.Router();

// @route get /api/admin/users
// @desc get all the user (admin only)
// @access Private

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route post /api/admin/users
// @desc add new user
// @access PRIVATE/admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    res.status(201).json({ message: "User created succesfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route put /api/admin/users/:id
// @desc update user info name and email
// @access PRIVATE/admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();

      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route delete /api/users/admin/:id
// @des  delete a existing user
// @access private/admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
