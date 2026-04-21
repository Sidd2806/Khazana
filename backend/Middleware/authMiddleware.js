const jwt=require("jsonwebtoken")
const User= require("../model/User")


const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.replace("Bearer", "").trim();

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user._id || decoded.id).select("-password");

      next();
    } catch (error) {
      console.log("ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

const admin = (req,res,next)=>{
  if(req.user && req.user.role==="admin"){
    next();
  }else{
    res.status(403).json({message:"Not authorized as an Admin"})
  }
}

module.exports= {protect,admin};