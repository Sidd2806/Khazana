const express = require("express");
const router = express.Router();
const Subscriber = require("../model/Subscriber");

// @route post /api/subscriber
// @desc Handle newletter subscription
// @access public

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    // check if email already subscribe

    let subscriber= await Subscriber.findOne({email})

    if(subscriber){
        return res.status(400).json({message:"Email is already subscribed"})
    }
    // Create a new subscriber
    subscriber = new Subscriber({email});
    await subscriber.save();
    res.status(201).json({message:"Succesfully subscriibed to the newsletter"})
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server error"})
    
  }
});
module.exports=router;
