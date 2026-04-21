const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./model/Product");
const User = require("./model/User");
const products = require("./data/products");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.create({
      name: "Admin User",
      email: "user@gmail.com",
      password: "123456",
      role: "admin",
    });

    console.log("User created");

    const userId = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    await Product.insertMany(sampleProducts);

    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();