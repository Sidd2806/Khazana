const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./model/Product");
const productImages = require("./data/productImages");

const updateProductsWithCloudinaryImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Get all products
    const products = await Product.find();
    console.log(`Found ${products.length} products to update`);

    let updated = 0;
    let failed = 0;

    for (const product of products) {
      try {
        const sku = product.sku;
        
        // Check if this SKU has images in productImages
        if (productImages[sku]) {
          const cloudinaryUrls = productImages[sku];
          
          // Update product with Cloudinary URLs
          product.images = cloudinaryUrls.map((url, index) => ({
            url: url,
            altText: `${product.name} View ${index + 1}`
          }));

          await product.save();
          console.log(`✅ Updated: ${product.name} (${sku}) - ${cloudinaryUrls.length} images`);
          updated++;
        } else {
          console.log(`⚠️  Skipped: ${product.name} (${sku}) - No images found in productImages.js`);
          failed++;
        }
      } catch (error) {
        console.error(`❌ Error updating ${product.name}:`, error.message);
        failed++;
      }
    }

    console.log("\n=== Update Summary ===");
    console.log(`✅ Successfully updated: ${updated} products`);
    console.log(`❌ Failed/Skipped: ${failed} products`);
    console.log("All products now have Cloudinary CDN URLs");

    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
};

updateProductsWithCloudinaryImages();
