import orderModel from "../../../../dbConnection/models/order.model.js";
import clientModel from "../../../../dbConnection/models/client.model.js";
import calculationModel from "../../../../dbConnection/models/calculations.model.js";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";
import cartModel from "../../../../dbConnection/models/cart.model.js";
// Create a new order based on the calculated cart
const createOrder = catchError(async (req, res, next) => {
  const { clientId } = req.params;

  // Step 1: Verify the client exists
  const client = await clientModel.findById(clientId);
  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  // Step 2: Retrieve the latest calculation for this client
  const calculation = await calculationModel
    .findOne({ clientId })
    .sort({ createdAt: -1 });

  if (!calculation) {
    return next(new AppError("No calculations found for this client", 404));
  }

  // Step 3: Retrieve the cart items with product details
  const cart = await cartModel
    .findOne({ client: clientId })
    .populate("cartItems.product");

  if (!cart || cart.cartItems.length === 0) {
    return next(new AppError("Cart is empty or not found", 404));
  }

  // Step 4: Prepare order items
  const orderItems = cart.cartItems.map((item) => ({
    product: item.product._id,
    productName: item.product.title,
    quantity: item.quantity,
    newPrice: item.newPrice || 0, // Ensure newPrice is available
  }));

  // Step 5: Calculate subtotal
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  // Step 6: Create the order
  const order = new orderModel({
    client: client._id,
    clientName: `${client.firstName} ${client.lastName}`,
    orderItems,
    subtotal,
    discountRate: calculation.discountRate || 0,
    discountAmount: calculation.discountAmount || 0,
    taxRate: calculation.taxRate || 0,
    taxAmount: calculation.tax || 0,
    commissionRate: calculation.commission || 0,
    commissionAmount: calculation.commissionAmount || 0,
    totalAmount: calculation.finalCost || subtotal,
    outstandingAmount: calculation.finalCost || subtotal, // Initially, the outstanding amount is the total amount
    status: "Pending",
  });

  // Step 7: Save the order
  await order.save();

  // Optionally, clear the client's cart after creating the order
  // await cartModel.findOneAndDelete({ client: clientId });

  res.status(201).json({
    message: "Order created successfully",
    data: order,
  });
});
// Update payment for an order
const updatePayment = catchError(async (req, res, next) => {
  const { orderId } = req.params;
  const { amount, note } = req.body;

  // Validate payment amount
  if (!amount || isNaN(amount) || amount <= 0) {
    return next(new AppError("Invalid payment amount", 400));
  }

  // Find the order
  const order = await orderModel.findById(orderId);
  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Update amountPaid and outstandingAmount
  const newAmountPaid = (order.amountPaid || 0) + amount;
  const newOutstandingAmount = order.totalAmount - newAmountPaid;

  // Update payment history
  order.paymentHistory.push({
    amount,
    date: new Date(),
    note,
  });

  // Update order status
  if (newOutstandingAmount <= 0) {
    order.status = "Paid";
    order.outstandingAmount = 0;
    order.amountPaid = order.totalAmount;
  } else {
    order.status = "Partially Paid";
    order.amountPaid = newAmountPaid;
    order.outstandingAmount = newOutstandingAmount;
  }

  // Save the updated order
  await order.save();

  res.status(200).json({
    message: "Payment updated successfully",
    data: order,
  });
});
// Get all orders for a client
const getOrdersByClientId = catchError(async (req, res, next) => {
  const { clientId } = req.params;

  // Verify client exists
  const client = await clientModel.findById(clientId);
  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  // Find orders for this client
  const orders = await orderModel
    .find({ client: clientId })
    .sort({ createdAt: -1 })
    .populate("orderItems.product"); // Populate product details if needed

  if (orders.length === 0) {
    return res.status(404).json({ message: "No orders found for this client" });
  }

  res.status(200).json({
    message: "Orders retrieved successfully",
    data: orders,
  });
});
// Get order details by order ID
const getOrderById = catchError(async (req, res, next) => {
  const { orderId } = req.params;

  // Find the order
  const order = await orderModel
    .findById(orderId)
    .populate("client")
    .populate("orderItems.product");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    message: "Order retrieved successfully",
    data: order,
  });
});
// Generate invoice for an order
const generateInvoice = catchError(async (req, res, next) => {
  const { orderId } = req.params;

  // Find the order
  const order = await orderModel
    .findById(orderId)
    .populate("client")
    .populate("orderItems.product");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Prepare invoice data
  const invoiceData = {
    invoiceNumber: `INV-${order._id}`,
    date: order.createdAt,
    clientName: order.clientName,
    orderItems: order.orderItems.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.newPrice,
      totalPrice: item.newPrice * item.quantity,
    })),
    subtotal: order.subtotal,
    discountRate: order.discountRate,
    discountAmount: order.discountAmount,
    taxRate: order.taxRate,
    taxAmount: order.taxAmount,
    commissionRate: order.commissionRate,
    commissionAmount: order.commissionAmount,
    totalAmount: order.totalAmount,
    amountPaid: order.amountPaid,
    outstandingAmount: order.outstandingAmount,
  };

  res.status(200).json({
    message: "Invoice generated successfully",
    data: invoiceData,
  });
});
export {
  createOrder,
  updatePayment,
  getOrdersByClientId,
  getOrderById,
  generateInvoice,
};