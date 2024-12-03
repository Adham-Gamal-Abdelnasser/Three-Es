import ProductModel from "../../../../dbConnection/models/Product.model.js";
import roomModel from "../../../../dbConnection/models/room.model.js";
import unitModel from "../../../../dbConnection/models/unit.model.js";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";

// Add a new room
const addRoom = catchError(async (req, res, next) => {
  const { roomName, unitId, roomItems } = req.body;
  const { userId } = req.params;

  const unit = await unitModel.findById(unitId);
  if (!unit) {
    return next(new AppError("Unit not found", 404));
  }

  const existingRoom = await roomModel.findOne({ roomName, unitName: unitId });
  if (existingRoom) {
    return next(
      new AppError("Room with this name already exists in the unit", 409)
    );
  }

  const preRoom = new roomModel({
    roomName,
    unitName: unitId,
    roomItems,
    createdBy: userId,
  });

  const addedRoom = await preRoom.save();
  await addedRoom.populate("unitName");

  res.status(201).json({ message: "Room added successfully", addedRoom });
});

// Get all rooms (optional filter by userId or unitId)
const getAllRooms = catchError(async (req, res, next) => {
  const { userId, unitId } = req.query;
  const query = {};
  
  if (unitId) {
    const unit = await unitModel.findById(unitId);
    if (!unit) {
      return next(new AppError("Unit not found", 404));
    }
    query.unitName = unitId;
  }
  
  if (userId) {
    query.createdBy = userId;
  }

  const rooms = await roomModel
    .find(query)
    .populate("createdBy")
    .populate("unitName")
    .populate({
      path: 'roomItems.item',
      model: 'Product'
    });

  res.status(200).json({ 
    status: 'success',
    count: rooms.length,
    message: "Rooms retrieved successfully", 
    rooms 
  });
});

const getAllRoomsByUnitId = catchError(async (req, res, next) => {
  const { unitId } = req.params;
  

  // Validate unit ID
  if (!unitId) {
    return next(new AppError("Unit ID is required", 400));
  }

  // Verify unit exists
  const unitExists = await unitModel.findById(unitId);
  if (!unitExists) {
    return next(new AppError("Unit not found", 404));
  }

  // Find rooms by unitName
  const rooms = await roomModel
    .find({ unitName: unitId })
    .populate("createdBy")
    .populate("unitName")
    .populate({
      path: 'roomItems.item',
      model: 'Product'
    });


  res.status(200).json({ 
    status: 'success',
    count: rooms.length,
    message: "Rooms retrieved successfully", 
    rooms 
  });
});




const getRoomById = catchError(async (req, res, next) => {
  const { roomId } = req.params;

  const room = await roomModel
    .findById(roomId)
    .populate({
      path: 'roomItems.item',
      model: 'Product' // Specify the model name
    })
    .populate("createdBy unitName");
  if (!room) {
    return next(new AppError("Room not found", 404));
  }

  res.status(200).json({ message: "Room retrieved successfully", room });
});

// Update a room
const updateRoom = catchError(async (req, res, next) => {
  const { roomId } = req.params;
  const { unitId } = req.body;

  if (unitId) {
    const unit = await unitModel.findById(unitId);
    if (!unit) {
      return next(new AppError("Unit not found", 404));
    }
  }

  const updatedRoom = await roomModel
    .findByIdAndUpdate(roomId, req.body, { new: true })
    .populate("createdBy unitName")
    .populate({
      path: 'roomItems.item',
      model: 'Product' // Ensure this matches your Product model name
    });
  
  if (!updatedRoom) {
    return next(new AppError("Room not found", 404));
  }

  res.status(200).json({ message: "Room updated successfully", updatedRoom });
});

// Delete a room
const deleteRoom = catchError(async (req, res, next) => {
  const { roomId } = req.params;

  const deletedRoom = await roomModel.findByIdAndDelete(roomId);
  if (!deletedRoom) {
    return next(new AppError("Room not found", 404));
  }

  res.status(200).json({ message: "Room deleted successfully", deletedRoom });
});

// Add item to room
const addItemToRoom = catchError(async (req, res, next) => {
  const { roomId } = req.params; // Get room ID from request parameters
  const { productId, quantity } = req.body; // Get product ID and quantity from request body

  // Check if productId is provided and valid
  if (!productId || typeof productId !== 'string') {
    return next(new AppError("Valid Product ID is required", 400));
  }

  // Check if quantity is provided and valid
  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    return next(new AppError("Valid quantity is required (must be a positive number)", 400));
  }

  // Check if the room exists
  const room = await roomModel.findById(roomId);
  if (!room) {
    return next(new AppError("Room not found", 404));
  }

  // Check if the product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Check if the requested quantity is available
  if (quantity > product.quantity) {
    return next(new AppError(`Not enough quantity available. Only ${product.quantity} left in stock.`, 400));
  }

  // Check if the product already exists in the room
  const existingItemIndex = room.roomItems.findIndex(item => item.item.toString() === productId);

  if (existingItemIndex !== -1) {
    // If the product already exists, check if the updated quantity is available
    const newQuantity = room.roomItems[existingItemIndex].quantity + quantity;
    if (newQuantity > product.quantity) {
      return next(new AppError(`Not enough quantity available. Only ${product.quantity} left in stock.`, 400));
    }
    // Update the quantity of the existing item
    room.roomItems[existingItemIndex].quantity = newQuantity;
  } else {
    // If it's a new product, add it to the roomItems array
    room.roomItems.push({ item: productId, quantity });
  }

  // Update the product's quantity in stock
  product.quantity -= quantity;

  // Ensure that the product quantity does not go below zero
  if (product.quantity < 0) {
    product.quantity = 0;
  }

  // Save the changes to both the product and room atomically
  await Promise.all([product.save(), room.save()]);

  // Response to the client
  res.status(201).json({ message: "Product added/updated in room successfully", room });
});


const removeItemFromRoom = catchError(async (req, res, next) => {
  const { roomId, productId } = req.params;

  // Check if the room exists
  const room = await roomModel.findById(roomId);
  if (!room) {
    return next(new AppError("Room not found", 404));
  }

  // Remove the product from the room's roomItems
  room.roomItems = room.roomItems.filter(item => item.item.toString() !== productId);
  await room.save();

  res.status(200).json({ message: "Product removed from room successfully", room });
});
export {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  addItemToRoom,
  removeItemFromRoom,
  getAllRoomsByUnitId,
};
