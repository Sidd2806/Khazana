const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./model/Product");
const products = require("./data/products");

const extraImageFixes = [
  {
    sku: "CLTH123456",
    images: [
      {
        url: "/pictures/09-long-sleeve-thermal-tee-1.jpg",
        altText: "Winter Jacket",
      },
    ],
  },
  {
    sku: "API-TEST-2024617940",
    images: [
      {
        url: "/pictures/01-classic-oxford-button-down-shirt-1.jpg",
        altText: "API Test Shirt",
      },
    ],
  },
  {
    sku: "SHIRT001",
    images: [
      {
        url: "/pictures/05-slim-fit-easy-iron-shirt-1.jpg",
        altText: "Premium Shirt",
      },
    ],
  },
];

const updateProductImages = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  let updatedCount = 0;
  const missingSkus = [];

  for (const product of products) {
    const result = await Product.updateOne(
      { sku: product.sku },
      { $set: { images: product.images } },
    );

    if (result.matchedCount === 0) {
      missingSkus.push(product.sku);
      continue;
    }

    if (result.modifiedCount > 0) {
      updatedCount += 1;
    }
  }

  console.log(`Updated image fields for ${updatedCount} products`);

  if (missingSkus.length > 0) {
    console.log(`No matching product found for SKUs: ${missingSkus.join(", ")}`);
  }

  let extraUpdatedCount = 0;

  for (const product of extraImageFixes) {
    const result = await Product.updateOne(
      { sku: product.sku },
      { $set: { images: product.images } },
    );

    if (result.modifiedCount > 0) {
      extraUpdatedCount += 1;
    }
  }

  console.log(`Updated image fields for ${extraUpdatedCount} extra products`);
};

updateProductImages()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
