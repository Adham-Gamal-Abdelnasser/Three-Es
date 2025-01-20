import express from "express";
import { validation } from "../../middleware/validation.js";
import { addUnitSchema, getByIdSchema, updateUnitSchema } from "./unit.validation.js";
import { addUnit, deleteUnit, getAllUnits, getAllUnitsByClientId, getUnitById, updateUnit } from "./controller/unit.controller.js";
import { checkClient } from "../../middleware/checkClient.js";
import roomRoutes from "../room/room.routes.js";

const unitRoutes = express.Router();
unitRoutes.use("/:unit/room",roomRoutes)
unitRoutes.route("/")
.post(validation(addUnitSchema),checkClient,addUnit)
.get(getAllUnits);
unitRoutes.get('/clients/:clientId/units', getAllUnitsByClientId);


unitRoutes.route("/:id")

  .get(validation(getByIdSchema),getUnitById)
  .patch(validation(updateUnitSchema),updateUnit)
  .delete(validation(getByIdSchema),deleteUnit)

export default unitRoutes;
