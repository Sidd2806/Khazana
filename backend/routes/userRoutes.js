// const express = require("express");
// const User = require("../model/User");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// // @route ppost  /api/user/register
// // @desc register a new user
// // @access Public

// router.post("/register", async (req,res)=>{
//     const {name,email,password}= req.body
//     try {
//         res.send({name,email,password})
//         console.log({name,email,password});
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server error")
        
//     }
// })
// module.exports=router;



const express = require("express");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
// @route ppost  /api/user/register
// @desc register a new user
// @access Public

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        res.send({ name, email, password });
        console.log({ name, email, password });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
