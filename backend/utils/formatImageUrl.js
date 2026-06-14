const getBackendUrl = (backendUrl) => {
  if (backendUrl) {
    return backendUrl.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.replace(/\/$/, "");
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

    if (parsedUrl.pathname.startsWith("/pictures/")) {
      return toPictureUrl(backendUrl, parsedUrl.pathname.slice("/pictures/".length));
    }

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

const formatImageUrl = (product, backendUrl) => {
  if (!product) {
    return product;
  }

  const formattedBackendUrl = getBackendUrl(backendUrl);
  const productObject = typeof product.toObject === "function"
    ? product.toObject()
    : product;

  if (Array.isArray(productObject.images)) {
    productObject.images = productObject.images.map((img) => ({
      ...img,
      url: normalizeImageUrl(img.url, formattedBackendUrl),
    }));
  }

  return productObject;
};

const formatProductImages = (products, backendUrl) => {
  if (Array.isArray(products)) {
    return products.map((product) => formatImageUrl(product, backendUrl));
  }

  return formatImageUrl(products, backendUrl);
};

module.exports = { formatImageUrl, formatProductImages, normalizeImageUrl };
