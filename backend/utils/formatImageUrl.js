const getBackendUrl = () => {
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:9000";
};

const toPictureUrl = (backendUrl, filename) =>
  `${backendUrl}/pictures/${filename.replace(/^\/+/, "")}`;

const normalizeImageUrl = (url, backendUrl) => {
  if (!url) {
    return url;
  }

  const imageUrl = String(url).trim();
  const localPictureMatch = imageUrl.match(
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/pictures\/(.+)$/i,
  );

  if (localPictureMatch) {
    return toPictureUrl(backendUrl, localPictureMatch[1]);
  }

  if (imageUrl.startsWith("/pictures/")) {
    return `${backendUrl}${imageUrl}`;
  }

  try {
    const parsedUrl = new URL(imageUrl);
    const cloudinaryProductsPath = "/khazana/products/";
    const productsPathIndex = parsedUrl.pathname.indexOf(cloudinaryProductsPath);

    if (
      parsedUrl.hostname === "res.cloudinary.com" &&
      productsPathIndex !== -1
    ) {
      const filename = parsedUrl.pathname.slice(
        productsPathIndex + cloudinaryProductsPath.length,
      );
      return toPictureUrl(backendUrl, filename);
    }

    return imageUrl;
  } catch {
    return `${backendUrl}/${imageUrl.replace(/^\/+/, "")}`;
  }
};

const formatImageUrl = (product) => {
  if (!product) {
    return product;
  }

  const backendUrl = getBackendUrl();
  const productObject = typeof product.toObject === "function"
    ? product.toObject()
    : product;

  if (Array.isArray(productObject.images)) {
    productObject.images = productObject.images.map((img) => ({
      ...img,
      url: normalizeImageUrl(img.url, backendUrl),
    }));
  }

  return productObject;
};

const formatProductImages = (products) => {
  if (Array.isArray(products)) {
    return products.map((product) => formatImageUrl(product));
  }

  return formatImageUrl(products);
};

module.exports = { formatImageUrl, formatProductImages, normalizeImageUrl };
