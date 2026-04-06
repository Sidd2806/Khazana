const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email adress"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);


// pasword hash before middleware
userSchema.pre("save",async function(next){ // whener .save() called this function will run 
    if(!this.isModified("password")) return next(); // isModified internal working of mongoose that chack pass changed or not
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt) 
})

// now matching password with saved hased pass

userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password) // internally bcrypt compare hased pass with the given pass
}

module.exports= mongoose.model("User",userSchema)