// order.routes.js
import express from 'express';
import { createOrder, generateInvoice, getOrderById, getOrdersByClientId, updatePayment } from './controller/order.controller.js';

const orderRoutes = express.Router();
// Create a new order for a client
orderRoutes.post('/:clientId', createOrder);

// Update payment for an order
orderRoutes.put('/payment/:orderId', updatePayment);

// Get all orders for a client
orderRoutes.get('/client/:clientId', getOrdersByClientId);

// Get order details by order ID
orderRoutes.get('/:orderId', getOrderById);

// Generate invoice for an order
orderRoutes.get('/:orderId/invoice', generateInvoice);
export default orderRoutes;