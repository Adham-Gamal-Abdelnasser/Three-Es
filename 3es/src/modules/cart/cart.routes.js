import express from "express";
import { clearCart, createCart, getCart, removeCartItem, updateCart } from "./controller/cart.controller.js";
import { checkClient } from "../../middleware/checkClient.js";


const cartRoutes = express.Router();
cartRoutes.route('/clients/:clientId')
.post( createCart)
.get(checkClient,getCart)
cartRoutes.route('/:clientId/item/:id')
.delete(checkClient,removeCartItem)
.patch(checkClient,updateCart)
cartRoutes.delete('/:clientId', clearCart);


export default cartRoutes;
