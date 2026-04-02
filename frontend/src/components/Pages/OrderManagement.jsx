import React from "react";

const OrderManagement = () => {
  const orders = [
    {
      _id: 1234,
      user: {
        name: "Himanshu",
      },
      total_price: 34,
      status: "",
    },
  ];
  const handleChange = (userid, status) => {
    console.log({ id: userid, status: status });
  };
  const handleStatusChange = (orderId)=>{
    console.log(orderId);
    
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold">Order Management</h2>
      <table className="min-w-full text-left ">
        <thead className="uppercase bg-gray-100 text-xs text-gray-700 ">
          <tr>
            <th className="py-3 px-4">order Id</th>
            <th className="py-3 px-4">customer</th>
            <th className="py-3 px-4">total Price</th>
            <th className="py-3 px-4">status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                className="border-b cursor-pointer hover:bg-gray-300"
              >
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                  {" "}
                  #{order._id}{" "}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                  {" "}
                  {order.user.name}{" "}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                  {" "}
                  ${order.total_price}{" "}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                  <select
                    value={order.status}
                    onChange={(e) => handleChange(order._id, e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleStatusChange(order._id, "Delivered")}
                    className="bg-green-500 text-white px-4 py-3 hover:bg-green-600 rounded"
                  >
                    Mark As Delivered
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No Order Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
