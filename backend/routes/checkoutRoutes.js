const express = require("express");
const Checkout = require("../model/Checkout");
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const Order = require("../model/Order");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router();

//@route post /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body || {};

  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }
  try {
    //create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`checkout created for user ${req.user._id}`);
    res.status(200).json(newCheckout);
  } catch (error) {
    console.error("Error creating new checkout session", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route put /api/checkout/:id/pay
// @desc update chekout to mark as paid after succeffull payment
// @acces Private

router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;

      await checkout.save();

      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route post  /api/checkout/:id/finalize
// @desc finalize checkout and convert to an order after payment confirmation
// @access  private

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "CheckOut not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      //create final order based on checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: true,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });
      //mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.isFinalizedAt = Date.now();
      await checkout.save();
      //delete the cart associate with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(200).json(checkout);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout is already finalized" });
    } else {
      res.status(400).json({ message: "checkout is not paid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
