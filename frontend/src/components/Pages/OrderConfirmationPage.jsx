import React from "react";

const Checkout = {
  _id: "123123",
  createdAt: new Date(),
  CheckoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "black",
      size: "L",
      price: 200,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "Shirt",
      color: "blueberry",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    address: "mithaas sector-62",
    city: "noida",
    country: "India",
  },
};
const OrderConfirmationPage = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); //add 10 days fo expected delivery after the order date
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for your order!
      </h1>
      {Checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-semibold">Order Id:{Checkout._id}</h2>
              <p className="text-gray-500">
                Order date : {new Date(Checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-emerald-700 tex-sm">
                Estimated Delivery :{" "}
                {calculateEstimatedDelivery(Checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div className="mb-20">
            {Checkout.CheckoutItems.map((item)=>(
                <div key={item.productId}
                className="flex items-center mb-4"
                >
                    <img src={item.image} alt={item.name}
                    className="h-16 w-16 object-cover rounded-md mr-4" />
                    <div>
                        <h4 className="text-md font-semibold"> {item.name}</h4>
                        <p className="text-sm text-gray-500">
                            {item.color} | {item.size}
                        </p>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-md">{item.price}</p>
                        <p className="text-gray-600 text-sm ">Qty : {item.quantity}</p>
                    </div>
                </div>
            ))}
          </div>
          {/* Payment info */}
          <div className="grid grid-cols-2 gap-8">
            <div>
                <h4 className="text-lg font-semibold  mb-2">Payment Method</h4>
                <p className="text-gray-600 font-medium">PayPal</p>
            </div>
            {/* Delivery Info */}
            <div>
                <h4 className="text-lg font-semibold mb-2"> 
                    Delivery
                </h4>
                <p className="text-gray-600 font-medium">{Checkout.shippingAddress.address}</p>
                <p className="text-gray-600 font-medium">{Checkout.shippingAddress.city} {" "} {Checkout.shippingAddress.country} </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
