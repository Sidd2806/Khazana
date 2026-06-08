// Helper function to format image URLs with backend domain
const formatImageUrl = (product) => {
  let backendUrl = process.env.BACKEND_URL;
  
  if (!backendUrl && process.env.VERCEL_URL) {
    backendUrl = `https://${process.env.VERCEL_URL}`;
  }
  
  if (!backendUrl) {
    backendUrl = 'http://localhost:9000';
  }
  
  if (product.images && Array.isArray(product.images)) {
    product.images = product.images.map(img => ({
      ...img,
      url: img.url.startsWith('http') 
        ? img.url 
        : `${backendUrl}${img.url}`
    }));
  }
  return product;
};

// Format array of products
const formatProductImages = (products) => {
  if (Array.isArray(products)) {
    return products.map(product => formatImageUrl(product));
  }
  return formatImageUrl(products);
};

module.exports = { formatImageUrl, formatProductImages };
