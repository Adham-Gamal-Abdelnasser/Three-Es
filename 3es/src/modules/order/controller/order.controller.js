// order.controller.js
import cartModel from "../../../../dbConnection/models/cart.model.js";
import orderModel from "../../../../dbConnection/models/order.model.js";
import productModel from "../../../../dbConnection/models/Product.model.js";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";

export const createOrder = catchError(async (req, res, next) => {
  const { clientId, unitId, cartId } = req.params;

  // Find the cart
  const cart = await cartModel.findOne({ _id: cartId, client: clientId });
  if (!cart) {
    return next(new AppError("Cart not found or doesn't belong to this client", 404));
  }

  // Calculate the total price
  const totalPrice = cart.totalPriceAfterDiscount || cart.totalPrice;

  // Create a new order
  const order = new orderModel({
    client: clientId,
    cartItems: cart.cartItems,
    totalOrderPrice: totalPrice,
    unitName: unitId,
    paymentMethod: req.body.paymentMethod || 'cash', // Default to cash if not specified
    status: "pending",
    isPaid: false,
  });

  // Save the order
  await order.save();

  // Update product quantities
  const bulkOptions = cart.cartItems.map((item) => ({
    updateOne: {
      filter: { _id: item.product },
      update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
    }
  }));
  await productModel.bulkWrite(bulkOptions);

  // Clear the cart
  await cartModel.findByIdAndDelete(cartId);

  res.status(201).json({
    status: 'success',
    message: "Order created successfully",
    data: { order }
  });
});

export const checkPaymentStatus = catchError(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await orderModel.findById(orderId);
  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: 'success',
    message: "Payment status retrieved successfully",
    data: {
      paymentStatus: order.isPaid ? "Paid" : "Not Paid",
      orderId: order._id,
      totalOrderPrice: order.totalOrderPrice,
    }
  });
});

// Add more order-related functions here as needed
export const getAllOrders = catchError(async (req, res, next) => {
  // Retrieve all orders from the database
  const orders = await orderModel.find();

  // Check if there are any orders
  if (!orders || orders.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: "No orders found",
    });
  }

  res.status(200).json({
    status: 'success',
    message: "Orders retrieved successfully",
    data: { orders },
  });
});
