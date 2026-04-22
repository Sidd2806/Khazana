const express = require("express");
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// helper function
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//@route POST /api/cart
//@desc Add to cart
//@access Private (optional guest)
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.color === color &&
          p.size === size,
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity: quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create new cart
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId || "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            color,
            size,
            quantity: quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route PUT /api/cart
//@desc Update cart
router.put("/", async (req, res) => {
  const { productId, guestId, color, size, quantity, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size,
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      return res.status(200).json(cart);
    } else
      return res.status(404).json({ message: "Product not found in Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//@route DELETE /api/cart
//@desc Remove item
router.delete("/", protect, async (req, res) => {
  const { productId, guestId, size, color } = req.body;

  const userId = req.user?._id;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size,
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      return res.status(200).json(cart);
    } else return res.status(400).json({ message: "Product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route GET /api/cart
//@desc Get cart
router.get("/", protect, async (req, res) => {
  const { guestId } = req.query;
  const userId = req.user?._id;

  try {
    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.color === guestItem.color &&
              item.size === guestItem.size,
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0,
        );

        await userCart.save();
        await Cart.findOneAndDelete({ guestId });

        return res.status(200).json(userCart);
      } else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;

        await guestCart.save();

        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }

      return res.status(400).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
