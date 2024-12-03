// File: src/modules/room/room.routes.js

import express from "express";
import { 
  addRoom, 
  getAllRooms, 
  getRoomById, 
  updateRoom, 
  deleteRoom, 
  addItemToRoom, 
  removeItemFromRoom, 
  getAllRoomsByUnitId
} from "./controller/room.controller.js";
import { checkUnit } from "../../middleware/checkUnit.js";

const roomRoutes = express.Router({ mergeParams: true });

roomRoutes
  .route("/")
  .post(checkUnit, addRoom)
  .get(getAllRooms);

roomRoutes
  .get('/units/:unitId/rooms', getAllRoomsByUnitId);

roomRoutes
  .route("/:roomId")
  .get(getRoomById)
  .patch(checkUnit, updateRoom)
  .delete(deleteRoom);

roomRoutes
  .route("/:roomId/product")
  .post(addItemToRoom);

roomRoutes
  .route("/:roomId/product/:productId")
  .delete(removeItemFromRoom);

export default roomRoutes;