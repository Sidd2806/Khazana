import React, { useState } from "react";

const EditProductManagement = () => {
  const [fileName,setFileName]=useState("")
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    countInstock: "",
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(productData)
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} >
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={productData.name}
            name="name"
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
          />
        </div>
        {/* description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            type="text"
            value={productData.description}
            name="description"
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            rows={4}
            required
          />
        </div>
        {/* price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>
        {/* countInStock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">count in stock</label>
          <input
            type="number"
            name="countInstock"
            value={productData.countInstock}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>
        {/* sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-400 p-2"
          />
        </div>
        {/* COLORS */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-400 p-2"
          />
        </div>
        {/* Image upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>

          <label className="flex items-center gap-3  rounded-md px-3 py-2 w-fit cursor-pointer hover:border-gray-600 transition">
            <span className="bg-gray-200 px-3 py-1 rounded-md text-sm">
              Choose File
            </span>

            {/* File name text */}
            <span className="text-gray-600 text-sm">{fileName}</span>

            {/* Hidden real input */}
            <input
              type="file"
              onChange={(e) => {
                handleImageUpload(e);
                setFileName(e.target.files[0]?.name || "No file chosen");
              }}
              className="hidden"
            />
          </label>

          {/* Images */}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "product images"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
        className="w-full text-center p-2 bg-green-500 text-white rounded-md"
        >Update Product</button>
      </form>
    </div>
  );
};

export default EditProductManagement;
