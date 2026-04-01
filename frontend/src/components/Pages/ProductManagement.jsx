import React from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const products = [
    {
      _id: 12345,
      name: "shirt",
      price: 120,
      sku: "120120120",
    },
    {
      _id: 12345,
      name: "shirt",
      price: 120,
      sku: "120120120",
    },
    {
      _id: 12345,
      name: "shirt",
      price: 120,
      sku: "120120120",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflox-x-auto shadow-md sm:shadow-lg">
        <table className="min-w-full text-left text-gray-500 ">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-4"> {product.name} </td>
                  <td className="p-4"> ${product.price} </td>
                  <td className="p-4"> {product.sku} </td>
                  <td>
                    <Link to={`admin/products/${product._id}/edit`}
                    className=""
                    > </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr> No product available</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
