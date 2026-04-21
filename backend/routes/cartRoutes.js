const express = require("express");
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// helper function to get a cart by user Id or guest Id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//@route POST /api/cart
//@desc Add a product to the cart for a guest or logged in user
//@access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);

    // ✅ FIX: correct check
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ FIX: correct function call
    let cart = await getCart(userId, guestId);

    // if cart exists → update
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.color === color &&
          p.size === size,
      );

      // ✅ FIX: correct condition
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url, // ✅ FIX: images not image
          price: product.price,
          size,
          color,
          quantity: Number(quantity),
        });
      }

      // ✅ FIX: correct reduce
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      return res.status(200).json(cart);
    }

    // create new cart
    const newCart = await Cart.create({
      user: userId || undefined,
      guestId: guestId || "guest_" + new Date().getTime(),
      products: [
        {
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          color,
          size,
          quantity: Number(quantity),
        },
      ],
      totalPrice: product.price * Number(quantity),
    });

    return res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//@route PUT /api/cart
//@desc Update product quantity in the cart for a guest or logged in user
// @acces PUBLIC

router.put("/", async (req, res) => {
  const { userId, productId, guestId, color, size, quantity } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = await cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size,
    );
    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove the product if the quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return res.status(200).json(cart);
    }else{
        return res.status(404).json({message:"Product not found in Cart"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server error"})
  }
});
module.exports = router;
