import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slice/productsSlice";
import axios from "axios";

const buildProductFormData = (product) => ({
  name: product?.name || "",
  description: product?.description || "",
  price: product?.price || "",
  countInStock: product?.countInStock || "",
  sku: product?.sku || "",
  category: product?.category || "",
  brand: product?.brand || "",
  sizes: product?.sizes || [],
  colors: product?.colors || [],
  collections: product?.collections || "",
  material: product?.material || "",
  gender: product?.gender || "",
  images: product?.images || [],
});

const ProductEditForm = ({ selectedProduct, id }) => {
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [productData, setProductData] = useState(() =>
    buildProductFormData(selectedProduct)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      setUploading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProductData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          {
            url: data.imageUrl,
            altText: "",
          },
        ],
      }));

      setUploading(false);
    } catch (error) {
      console.error(error);

      setUploading(false);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      updateProduct({
        id,
        productData,
      })
    );

    navigate("/admin/products");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Name
          </label>

          <input
            type="text"
            value={productData.name}
            name="name"
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Description
          </label>

          <textarea
            value={productData.description}
            name="description"
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Count In Stock
          </label>

          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            SKU
          </label>

          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>

          <input
            type="text"
            name="sizes"
            value={productData.sizes?.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value
                  .split(",")
                  .map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-400 p-2"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>

          <input
            type="text"
            name="colors"
            value={productData.colors?.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value
                  .split(",")
                  .map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-400 p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Upload Image
          </label>

          <label className="flex items-center gap-3 rounded-md px-3 py-2 w-fit cursor-pointer hover:border-gray-600 transition">
            <span className="bg-gray-200 px-3 py-1 rounded-md text-sm">
              Choose File
            </span>

            <span className="text-gray-600 text-sm">
              {fileName || "No file chosen"}
            </span>

            <input
              type="file"
              onChange={(e) => {
                handleImageUpload(e);

                setFileName(
                  e.target.files[0]?.name ||
                    "No file chosen"
                );
              }}
              className="hidden"
            />
          </label>

          {/* Uploading state */}
          {uploading && (
            <p className="text-blue-500 mt-2">
              Uploading image...
            </p>
          )}

          {/* Images */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images?.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={
                    image.altText || "product image"
                  }
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="w-full text-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Update Product
        </button>
      </form>
    </div>
  );
};

const EditProductManagement = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  // Fetch product details
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!selectedProduct) return <p>Product not found</p>;

  return (
    <ProductEditForm
      key={selectedProduct._id || selectedProduct.sku || id}
      selectedProduct={selectedProduct}
      id={id}
    />
  );
};

export default EditProductManagement;
