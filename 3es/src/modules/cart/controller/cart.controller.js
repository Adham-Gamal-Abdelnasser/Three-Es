import cartModel from "../../../../dbConnection/models/cart.model.js";
import ProductModel from "../../../../dbConnection/models/Product.model.js";

import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";

function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });
  cart.totalPrice = totalPrice;
}

const createCart = catchError(async (req, res, next) => {
  let product = await ProductModel.findById(req.body.product).select("price");
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  req.body.price = product.price;

  let clientId = req.params.clientId;
  let isCartExist = await cartModel.findOne({ client: clientId });

  if (!isCartExist) {
    let preCart = new cartModel({ client: clientId, cartItems: [req.body] });
    calcPrice(preCart);
    let createdCart = await preCart.save();
    res.json({ message: "Added", createdCart });
  } else {
    let item = isCartExist.cartItems.find(
      (ele) => ele.product == req.body.product
    );
    if (item) {
      item.quantity += 1;
    } else {
      isCartExist.cartItems.push(req.body);
    }
    calcPrice(isCartExist);
    await isCartExist.save();
    res.json({ message: "Cart updated", isCartExist });
  }
});

// In cart.controller.js

const getCart = catchError(async (req, res, next) => {
  let clientId = req.params.clientId;
  let cart = await cartModel.findOne({ client: clientId }).populate({
    path: 'cartItems.product',
    select: 'title imageCover price'
  });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Transform the cart data to include product details
  const transformedCart = {
    ...cart.toObject(),
    cartItems: cart.cartItems.map(item => ({
      _id: item._id,
      product: item.product ? {
        _id: item.product._id,
        name: item.product.title,
        image: item.product.imageCover,
        price: item.product.price
      } : null, // or handle it in another way if needed
      quantity: item.quantity,
    }))
  };

  res.json({ message: "done", cart: transformedCart });
});

const removeCartItem = catchError(async (req, res, next) => {
  let clientId = req.params.clientId;
  let itemId = req.params.id;

  let cart = await cartModel.findOne({ client: clientId });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Remove the item from cartItems
  cart.cartItems = cart.cartItems.filter(
    (item) => item._id.toString() !== itemId
  );

  // Recalculate total price
  calcPrice(cart);

  await cart.save();

  res.json({ message: "Item deleted", cart });
});
const updateCart = catchError(async (req, res, next) => {
  let clientId = req.params.clientId;
  let itemId = req.params.id;
  let quantity = req.body.quantity;

  let cart = await cartModel.findOne({ client: clientId });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  let item = cart.cartItems.find((ele) => ele._id.toString() === itemId);

  if (!item) {
    return next(new AppError("Item not found in cart", 404));
  }

  item.quantity = quantity;
  if (quantity <= 0) {
    return next(new AppError("Invalid quantity", 400));
  }

  // Update quantity

  // Recalculate total price
  calcPrice(cart);

  await cart.save();

  res.json({ message: "Cart updated", cart });
});
const clearCart = catchError(async (req, res, next) => {
  let clientId = req.params.clientId;
  let cart = await cartModel.findOne({ client: clientId });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  cart.cartItems = [];
  cart.totalPrice = 0;

  await cart.save();

  res.json({ message: "Cart cleared", cart });
});

export { createCart, getCart, removeCartItem, updateCart, clearCart };
