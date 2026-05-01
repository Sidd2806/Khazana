const express = require("express");
const Order = require("../model/Order");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// @route GET /api/order/my-order
// @desc get logges-in user order
// @access private

router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id}).sort({createdAt: -1});
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.send(500).json({ message: "Server Error" });
  }
});

// @ROUTE get api/orders/:id
// @desc Vget order details by id
// @access private

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      res.status(400).json({ message: "Order not found" });
    }
    //return the full order details now
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports=router
