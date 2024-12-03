import express from "express";
import { validation } from "../../middleware/validation.js";
import { addClientSchema, getByIdSchema, updateClientSchema } from "./client.validation.js";
import { addClient, deleteClient, getAllClients, getClientById, updateClient } from "./controller/client.controller.js";


const clientRoutes = express.Router();

clientRoutes.route("/")
.post(validation(addClientSchema),addClient)
.get(getAllClients);

clientRoutes.route("/:id")

  .get(validation(getByIdSchema),getClientById)
  .patch(validation(updateClientSchema),updateClient)
  .delete(validation(getByIdSchema),deleteClient)

export default clientRoutes;
