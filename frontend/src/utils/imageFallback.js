import featuredFallback from "../assets/featured.webp";

export const productImageFallback = featuredFallback;

export const handleImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = productImageFallback;
};
