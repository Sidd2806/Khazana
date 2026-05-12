const express = require("express");
const Order = require("../model/Order");
const { protect, admin } = require("../Middleware/authMiddleware");

const router = express.Router();

// @route get /api/admin/user
// @desc get all order details (only Admin)
//  @access private/admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/admin/orders/:id
// @desc update the order status
// @access PRIVATE/admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.isDeliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.isDeliveredAt;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/order/:id
// @desc Delete an order
// @access PROTECT/admin

router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id)
        if(order){
            await order.deleteOne()
            res.json({message:"Order Removed Succesfully"})
        }else{
            res.status(404).json({message:"order not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
        
    }
})

module.exports = router;
