import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {fetchAdminProducts} from "../../redux/slice/adminProductSlice"
import {fetchAllOrders} from "../../redux/slice/adminOrderSlice"
const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoaing,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(()=>{
    dispatch(fetchAdminProducts())
    dispatch(fetchAllOrders())
  },[dispatch])
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {
        productsLoading || ordersLoaing ? (
          <p>Loading ..</p>
        ) : productsError ? (
          <p className="text-red-500"> Error fetching products : {productsError}</p>
        ) :ordersError ? (
          <p className="text-red-500"> Error fetching orders: {ordersError}</p>
        ) : (

        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl"> ${totalSales.toFixed(2)}</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total orders</h2>
          <p className="text-2xl"> {totalOrders} </p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage orders{" "}
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl"> {products.length} </p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage products{" "}
          </Link>
        </div>
      </div>
      )
      }
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-gray-500 text-left">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Order Id</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-d hover:bg-gray-50 cursor-pointer text-gray-950"
                  >
                    <td className="p-4"> {order._id} </td>
                    <td className="p-4"> {order.user.name} </td>
                    <td className="p-4"> {order.totalPrice.toFixed(2)} </td>
                    <td className="p-4"> {order.status} </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent order found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
