const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const picturesDir = path.join(__dirname, "public", "pictures");

async function uploadAllImages() {
  console.log("🚀 Starting Cloudinary upload...\n");

  try {
    const files = fs.readdirSync(picturesDir).sort();
    console.log(`📷 Found ${files.length} images to upload\n`);

    const uploadedUrls = {};

    for (const file of files) {
      const filePath = path.join(picturesDir, file);
      const publicId = file.replace(/\.[^.]+$/, "");

      try {
        console.log(`⏳ Uploading: ${file}...`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: `khazana/products/${publicId}`,
          folder: "khazana/products",
          resource_type: "auto",
          overwrite: true,
        });

        uploadedUrls[publicId] = result.secure_url;
        console.log(`✅ ${file}\n`);
      } catch (error) {
        console.error(`❌ Failed: ${file} - ${error.message}\n`);
      }
    }

    // Map uploaded images to SKUs
    const skuMappings = {
      "01": "OX-SH-001", "02": "SLIM-SH-002", "03": "CAS-DEN-003", 
      "04": "PRNT-RES-004", "05": "SLIM-EIR-005", "06": "POLO-TSH-006",
      "07": "OVS-GRF-007", "08": "REG-HEN-008", "09": "LST-THR-009",
      "10": "VNECK-CLS-010", "11": "BW-001", "12": "BW-002", "13": "BW-003",
      "14": "BW-004", "15": "BW-005", "16": "BW-006", "17": "BW-007",
      "18": "BW-008", "19": "BW-009", "20": "BW-010", "21": "BW-011",
      "22": "BW-012", "23": "BW-013", "24": "BW-014", "25": "BW-015",
      "26": "BW-016", "27": "BW-017", "28": "BW-018", "29": "BW-019",
      "30": "BW-020", "31": "TW-001", "32": "TW-002", "33": "TW-003",
      "34": "TW-004", "35": "TW-005", "36": "TW-006", "37": "TW-007",
      "38": "TW-008", "39": "TW-009", "40": "TW-010"
    };

    const skuMap = {};
    
    // Initialize all SKUs
    Object.values(skuMappings).forEach(sku => {
      if (!skuMap[sku]) skuMap[sku] = [];
    });

    // Map uploaded images to SKUs
    for (const [publicId, url] of Object.entries(uploadedUrls)) {
      const num = publicId.split("-")[0];
      const sku = skuMappings[num];
      
      if (sku && skuMap[sku]) {
        skuMap[sku].push(url);
      }
    }

    // Generate new productImages.js
    let jsContent = "const productImages = {\n";
    
    for (const [sku, urls] of Object.entries(skuMap)) {
      if (urls.length > 0) {
        jsContent += `  "${sku}": [\n`;
        urls.forEach((url, index) => {
          jsContent += `    "${url}"${index < urls.length - 1 ? "," : ""}\n`;
        });
        jsContent += "  ],\n";
      }
    }
    
    jsContent += "};\n\nmodule.exports = productImages;\n";

    // Write updated file
    const productImagesPath = path.join(__dirname, "data", "productImages.js");
    fs.writeFileSync(productImagesPath, jsContent);

    console.log("\n✅ Successfully updated data/productImages.js");
    console.log(`📊 Total images uploaded: ${Object.keys(uploadedUrls).length}`);
    console.log(`📦 Total SKUs updated: ${Object.keys(skuMap).filter(sku => skuMap[sku].length > 0).length}`);
    console.log("\n🚀 Next steps:");
    console.log("1. Commit changes: git add . && git commit -m 'Upload images to Cloudinary'");
    console.log("2. Push to GitHub: git push");
    console.log("3. Vercel will auto-deploy!");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

uploadAllImages();
