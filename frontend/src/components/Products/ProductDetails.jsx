import React, { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const ProductDetails = () => {
  const selectedProduct = {
    name: "Stylish Jacket",
    price: "120",
    originalPrice: "150",
    description: "This is the perfect Stylish jacket for perfect occasion",
    brand: "FashionLeather",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket 2",
      },
    ],
  };
  const similarProduct = [
    {
      _id: 1,
      name: "Product 1",
      price: "100",
      images: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
      _id: 2,
      name: "Product 2",
      price: "200",
      images: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
    {
      _id: 3,
      name: "Product 3",
      price: "300",
      images: [{ url: "https://picsum.photos/500/500?random=5" }],
    },
    {
      _id: 4,
      name: "Product 4",
      price: "500",
      images: [{ url: "https://picsum.photos/500/500?random=6" }],
    },
  ];

  const [mainImage, setMainImage] = useState(selectedProduct.images[0].url);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddtoCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error(
        "Please select a Size and Color first before adding to cart.",
        {
          duration: 3000,
          className: "!bg-[#ff9966] !text-black font-semibold",
        }
      );
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart!", {
        duration: 1000,
        className: "!bg-green-500 text-white font-semibold",
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* left thumbnail */}
          <div className=" hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                  mainImage === image.url
                    ? "border-black"
                    : "border-gray-400"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Products"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* mobile thumbnail */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                  mainImage === image.url
                    ? "border-black"
                    : "border-gray-400"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* right Side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold ">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-500 line-through mb-1">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="mb-2 text-gray-600 text-lg">
              {selectedProduct.price}
            </p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full cursor-pointer border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    } `}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border cursor-pointer ${
                      selectedSize === size ? "bg-black text-white" : ""
                    } `}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="mb-3 mt-4">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-2 py-1 rounded bg-gray-200 text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-2 py-1 rounded bg-gray-200 text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddtoCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-4 w-full rounded-sm ${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding...." : "Add To Cart"}
              </button>

              <div className="mt-2 text-gray-700">
                <div className="text-xl font-bold mb-4">Characteristics:</div>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* you may also like section with men and women */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
