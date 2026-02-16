import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContent = () => {
  const cartProducts = [
    {
      productID: 1,
      name: "T-shirt",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 15,
      image: "https://www.picsum.photos/200?random=1",
    },
    {
      productID: 2,
      name: "shirt",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 15,
      image: "https://www.picsum.photos/200?random=2",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b border-gray-400"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className=" h-16 w-14 md:h-24 md:w-20 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                color:{product.color} | size : {product.size}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded   md:px-2 md:py-1 text-xl  font-medium">
                  -
                </button>
                <span className=" mx-1 md:mx-4">{product.quantity} </span>
                <button className="border rounded md:px-2 md:py-1 text-xl  font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium"> $ {product.price.toLocaleString()} </p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
