const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes= require("./routes/userRoutes.js")
const productRoutes= require("./routes/productRoutes.js")
const cartRoutes= require("./routes/cartRoutes.js")
const checkoutRoutes= require("./routes/checkoutRoutes.js")
const ordertRoutes= require("./routes/orderRoutes.js")
const uploadroutes=require("./routes/uploadRoutes.js")
const subscribeRoute=require("./routes/subscribeRoute.js")
const adminRoutes=require("./routes/adminRoutes.js")
const productAdminRoutes=require("./routes/productAdminRoutes.js")
const adminOrderRoutes=require("./routes/adminOrderRoutes.js")
// ✅ LOAD ENV FIRST
dotenv.config();

const app = express();
const connectDB = require("./config/db.js");

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

const PORT = process.env.PORT || 9000;

// Route
app.get("/", (req, res) => {
  res.send("Welcome to the MoodWear API!");
});

// API routes

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/checkout",checkoutRoutes)
app.use("/api/orders",ordertRoutes)
app.use("/api/upload",uploadroutes)
app.use("/api",subscribeRoute)

// Admin Routes
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",productAdminRoutes)
app.use("/api/admin/orders",adminOrderRoutes)

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});