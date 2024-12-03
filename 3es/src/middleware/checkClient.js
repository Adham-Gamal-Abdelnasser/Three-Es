import clientModel from "../../dbConnection/models/client.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "./handleError.js";

export const checkClient = catchError(async (req, res, next) => {
    let clientId = req.body.client || req.params.clientId;
    
    if (!clientId) {
        return next(new AppError("Client ID not provided", 400));
    }

    let client = await clientModel.findById(clientId);

    if (!client) {
        return next(new AppError("Client not found", 404));
    }

    req.client = client;

    next();
});
