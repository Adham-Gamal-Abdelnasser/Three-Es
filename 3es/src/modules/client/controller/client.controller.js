import clientModel from "../../../../dbConnection/models/client.model.js";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";

// Add a new client
const addClient = catchError(async (req, res, next) => {
  const { email } = req.body;

  // Check if a client with the same email already exists
  const existingClient = await clientModel.findOne({ email });
  if (existingClient) {
    return next(new AppError("Client with this email already exists", 409));
  }

  // If not, proceed to create and save the new client
  const preClient = new clientModel(req.body);
  const addedClient = await preClient.save();
  res.status(201).json({ message: "Client added successfully", addedClient });
});

// Get all clients
const getAllClients = catchError(async (req, res, next) => {
  const allClients = await clientModel.find();
  res.status(200).json({ message: "Clients retrieved successfully", allClients });
});

// Get a client by ID
const getClientById = catchError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new AppError("Invalid ID", 400));
  }
  
  const client = await clientModel.findById(id);
  if (!client) {
    return next(new AppError("Client not found", 404));
  }
  
  res.status(200).json({ message: "Client retrieved successfully", client });
});

// Update a client
const updateClient = catchError(async (req, res, next) => {
  const updatedClient = await clientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedClient) {
    return next(new AppError("Client not found", 404));
  }
  
  res.status(200).json({ message: "Client updated successfully", updatedClient });
});

// Delete a client
const deleteClient = catchError(async (req, res, next) => {
  const deletedClient = await clientModel.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return next(new AppError("Client not found", 404));
  }
  
  res.status(200).json({ message: "Client deleted successfully", deletedClient });
});

export { addClient, getAllClients, getClientById, updateClient, deleteClient };
