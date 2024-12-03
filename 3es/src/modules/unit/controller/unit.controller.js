import unitModel from "../../../../dbConnection/models/unit.model.js";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";

const addUnit = catchError(async (req, res) => {
  let preUnit = new unitModel(req.body);
  let addedUnit = await preUnit.save();
  res.json({ message: "Added", addedUnit });
});
const getAllUnits = catchError(async (req, res) => {
  let allUnits = await unitModel.find();
  res.json({ message: "Done", allUnits });
});
const getUnitById = catchError(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  let unit = await unitModel.findById(id);
  if (!unit) {
    return res.status(404).json({ message: "unit not found" });
  }
  res.json({ message: "unit retrieved successfully", unit });
});
// Get a room by unit ID
const getRoomByUnitId = catchError(async (req, res, next) => {
  const unitId = req.params.unitId;
  const roomId = req.params.roomId;
  const room = await roomModel.findOne({ unit: unitId, _id: roomId });

  if (!room) {
    return next(new AppError('Room not found', 404));
  }

  res.json({ message: 'Room retrieved successfully', room });
});
const updateUnit = catchError(async (req, res) => {
  let updatedUnit = await unitModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  updatedUnit && res.json({ message: "Done", updatedUnit });
  !updatedUnit && res.json(new AppError({ message: "Unit Not Found" }, 404));
});
const deleteUnit = catchError(async (req, res) => {
  let deletedUnit = await unitModel.findByIdAndDelete(req.params.id);
  deletedUnit && res.json({ message: "Done", deletedUnit });
  !deletedUnit && res.json(new AppError({ message: "Unit Not Found" }, 404));
});

export { addUnit, getAllUnits, getUnitById, updateUnit, deleteUnit,getRoomByUnitId };
