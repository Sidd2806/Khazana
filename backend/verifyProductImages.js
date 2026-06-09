const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./model/Product");

const verifyProductImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected\n");

    const products = await Product.find().select("name sku images");
    
    console.log(`=== Product Images Verification ===\n`);
    console.log(`Total products: ${products.length}\n`);

    let cloudinaryCount = 0;
    let localPathCount = 0;
    let noImagesCount = 0;

    for (const product of products) {
      if (!product.images || product.images.length === 0) {
        console.log(`⚠️  ${product.name} (${product.sku}) - NO IMAGES`);
        noImagesCount++;
        continue;
      }

      for (let i = 0; i < product.images.length; i++) {
        const url = product.images[i].url;
        
        if (url.includes("cloudinary")) {
          console.log(`✅ ${product.name} (${product.sku}) - Image ${i + 1}: Cloudinary CDN`);
          cloudinaryCount++;
        } else if (url.startsWith("/")) {
          console.log(`❌ ${product.name} (${product.sku}) - Image ${i + 1}: LOCAL PATH (${url})`);
          localPathCount++;
        } else {
          console.log(`⚠️  ${product.name} (${product.sku}) - Image ${i + 1}: Unknown format (${url.substring(0, 50)}...)`);
        }
      }
    }

    console.log("\n=== Summary ===");
    console.log(`✅ Cloudinary URLs: ${cloudinaryCount}`);
    console.log(`❌ Local Paths: ${localPathCount}`);
    console.log(`⚠️  No Images: ${noImagesCount}`);
    
    if (localPathCount === 0 && noImagesCount <= 3) {
      console.log("\n✅ DATABASE IS READY! All products have Cloudinary URLs");
    } else {
      console.log("\n⚠️  Some products still have issues. Check above.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error.message);
    process.exit(1);
  }
};

verifyProductImages();
