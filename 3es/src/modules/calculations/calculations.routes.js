import express from "express";
import { calculateCart, getAllCalculations, getAllCalculationsByClientId } from "./controller/calculations.controller.js"; // Import the new function
import { checkClient } from "../../middleware/checkClient.js"; // Middleware to check client authorization
import { validation } from "../../middleware/validation.js"; // Import the validation middleware
import { calculateCartSchema } from "./calculations.validation.js"; // Import the Joi validation schema

const calculationsRoutes = express.Router();

// New route to get all calculations
calculationsRoutes.get('/', getAllCalculations); // Add this line
// Route to calculate cart with validation
calculationsRoutes.post('/client/:clientId/calculate', checkClient, validation(calculateCartSchema), calculateCart);

// New route to get all calculations for a specific client
calculationsRoutes.get('/client/:clientId/all', checkClient, getAllCalculationsByClientId);
export default calculationsRoutes;