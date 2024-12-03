import unitModel from "../../dbConnection/models/unit.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "./handleError.js";

export const checkUnit = catchError(async (req, res, next) => {
  let unitId = req.body.unitId || req.body.unitName || req.params.unitId;

  if (req.method === "PATCH" && !unitId) {
    return next();
  }

  if (!unitId) {
    return next(new AppError("Unit ID not provided", 400));
  }

  let unit = await unitModel.findById(unitId);

  if (!unit) {
    return next(new AppError("Unit not found", 404));
  }

  req.unit = unit;

  next();
});
