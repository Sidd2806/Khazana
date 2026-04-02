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
  const handleDelete =(userId)=>{
    if(window.confirm("Are you sure you want to delete this product")){
      console.log("Delete product with id:",userId)
    }
  }
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
                    <Link to={`${product._id}/edit`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    > Edit</Link>
                    <button onClick={()=>handleDelete(product._id)}
                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr > 
                <td colspan={4} className="p-4 text-center text-gray-500"> No prdoducts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
