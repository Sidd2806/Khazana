// Helper function to format image URLs with backend domain
const formatImageUrl = (product) => {
  const backendUrl = process.env.BACKEND_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:9000';
  
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
