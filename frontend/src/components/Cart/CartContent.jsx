import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slice/cartSlice";

const CartContent = ({ userId, guestId, cart }) => {
  const dispatch = useDispatch();

  // handle adding and subtracting quantity
  const handleToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      }),
    );
  };

  return (
    <div>
      {cart?.products?.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b border-gray-400"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="h-16 w-14 md:h-24 md:w-20 object-cover mr-4 rounded"
            />

            <div>
              <h3>{product.name}</h3>

              <p className="text-sm text-gray-500">
                color: {product.color} | size: {product.size}
              </p>

              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded md:px-2 md:py-1 text-xl font-medium"
                >
                  -
                </button>

                <span className="mx-1 md:mx-4">
                  {product.quantity}
                </span>

                <button
                  onClick={() =>
                    handleToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded md:px-2 md:py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="font-medium">
              $ {product.price.toLocaleString()}
            </p>

            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;