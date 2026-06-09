const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./model/Product");
const axios = require("axios");

const verifyCloudinaryUrls = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const products = await Product.find().select("name sku images");
    
    if (!products.length) {
      console.log("No products found");
      process.exit(0);
    }

    console.log(`\nVerifying ${products.length} products...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
      if (!product.images || product.images.length === 0) {
        console.log(`⚠️  ${product.name} (${product.sku}) - No images`);
        errorCount++;
        continue;
      }

      for (let i = 0; i < product.images.length; i++) {
        const imageUrl = product.images[i].url;
        
        try {
          const response = await axios.head(imageUrl, { timeout: 5000 });
          if (response.status === 200 || response.status === 302) {
            console.log(`✅ ${product.name} - Image ${i + 1}: OK`);
            successCount++;
          } else {
            console.log(`❌ ${product.name} - Image ${i + 1}: Status ${response.status}`);
            errorCount++;
          }
        } catch (error) {
          console.log(`❌ ${product.name} - Image ${i + 1}: ${error.message}`);
          errorCount++;
        }
      }
    }

    console.log("\n=== Verification Summary ===");
    console.log(`✅ Accessible: ${successCount} images`);
    console.log(`❌ Failed: ${errorCount} images`);

    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
};

verifyCloudinaryUrls();
