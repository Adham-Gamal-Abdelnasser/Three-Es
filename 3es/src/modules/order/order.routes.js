// order.routes.js
import express from 'express';
import { createOrder, checkPaymentStatus, getAllOrders } from './controller/order.controller.js';
import { checkClient } from '../../middleware/checkClient.js'; // Assuming you have this middleware

const orderRoutes = express.Router();

orderRoutes.post('/clients/:clientId/units/:unitId/carts/:cartId', checkClient, createOrder);
orderRoutes.get('/:orderId/payment-status', checkPaymentStatus);
orderRoutes.get('/', getAllOrders);
// Add more routes here as needed

export default orderRoutes;