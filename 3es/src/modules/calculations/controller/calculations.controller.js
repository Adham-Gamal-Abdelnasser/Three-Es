import calculationModel from "../../../../dbConnection/models/calculations.model.js";
import cartModel from "../../../../dbConnection/models/cart.model.js";
import clientModel from "../../../../dbConnection/models/client.model.js";
import { catchError } from "../../../middleware/handleError.js";
import { AppError } from "../../../utils/AppError.js";

// Calculation controller
const calculateCart = catchError(async (req, res, next) => {
  const { clientId } = req.params;
  const {
    profitMargin,
    taxRate,
    shippingCost,
    customsCost,
    customsClearance,
    storage,
    localShipping,
    otherCosts,
    setup,
    transportation,
    discountRate,
    commission,
    currencyRate, // Get currencyRate from the request body
  } = req.body;

  // Step 1: Check if the client exists
  const client = await clientModel.findById(clientId);
  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  // Step 2: Check if the cart exists for the client
  const cart = await cartModel.findOne({ client: clientId }).populate('cartItems.product');
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Step 3: Access total items from the cart
  const totalItems = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Step 4: Calculate total cost based on cart items
  let totalCost = 0;
  cart.cartItems.forEach(item => {
    totalCost += item.price * item.quantity; // Calculate total cost for each item
  });

  // Step 5: Calculate cost per item based on the specified costs
  const totalAdditionalCosts = shippingCost + customsCost + customsClearance + storage + localShipping + otherCosts + setup + transportation;
  const costPerItem = totalAdditionalCosts / totalItems; // Set cost per item to the total of additional costs

  // Step 6: Calculate new price for each product
  let totalNewPrices = 0; // Initialize total of new prices
  cart.cartItems.forEach(item => {
    if (item.product) {
      let productPrice = parseFloat(item.price); // Get the price of the product
      let quantity = item.quantity; // Get the quantity of the product

      // Check if the price and quantity are valid numbers
      if (isNaN(productPrice) || isNaN(quantity)) {
        productPrice = 0; // Default to 0 if the price or quantity is not valid
        quantity = 0; // Default to 0 if the quantity is not valid
      }

      // Calculate the total price for the product based on quantity
      let newPrice = productPrice * quantity; // Total price for the product

      // Check if the currency is USD and convert to EGP using the provided currencyRate
      if (item.product.currency === 'USD') {
        const rate = parseFloat(currencyRate); // Ensure currencyRate is a number
        if (!isNaN(rate) && rate > 0) {
          newPrice = (productPrice * quantity) * rate; // Convert to EGP using the provided currency rate
        }
      }

      // Add costPerItem to the converted price
      item.newPrice = newPrice + costPerItem; 
      totalNewPrices += item.newPrice; // Add to total of new prices
    }
  });

  // Step 7: Calculate profit based on total of new prices
  const totalBasePrice = totalNewPrices; // Use the total of new prices
  const discountAmount = (totalBasePrice * discountRate) / 100;
  const totalAfterDiscount = totalBasePrice - discountAmount;

  // Calculate additional costs
  const profit = ( totalAfterDiscount * profitMargin) / 100; // Calculate profit based on total after discount
  const tax = (totalAfterDiscount * taxRate) / 100;

  // Calculate commission based on total after discount
  const commissionAmount = (totalAfterDiscount * commission) / 100; // Calculate commission as a percentage

  const finalCost = totalAfterDiscount + profit + tax + shippingCost + customsCost + customsClearance + storage + localShipping + otherCosts + setup + transportation + commissionAmount;

  // Save the calculation to the database
  const calculation = new calculationModel({
    clientId,
    totalBasePrice,
    discountAmount,
    profit,
    tax,
    shippingCost, 
    customsCost,
    customsClearance,
    storage,
    localShipping,
    otherCosts,
    setup,
    transportation,
    discountRate,
    commission,
    totalItems,
    finalCost,
  });

  await calculation.save();

  // Respond with calculation results
  res.json({
    message: "Calculations done and saved",
    data: {
      totalBasePrice,
      discountAmount,
      profit,
      tax,
      commissionAmount,
      finalCost,
      costPerItem,
      totalItems,
      cartItems: cart.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        newPrice: item.newPrice // Include the new price in the response
      })),
    },
  });
});

// Get all calculations for a specific client
const getAllCalculationsByClientId = catchError(async (req, res, next) => {
  const { clientId } = req.params;

  // Find all calculations for the specified client
  const calculations = await calculationModel.find({ clientId }).sort({ createdAt: -1 }); // Sort by creation date

  if (!calculations || calculations.length === 0) {
    return res.status(404).json({ message: "No calculations found for this client." });
  }

  res.status(200).json({
    message: "Calculations retrieved successfully",
    data: calculations,
  });
});

// Get all calculations globally
const getAllCalculations = catchError(async (req, res, next) => {
  // Find all calculations in the database
  const calculations = await calculationModel.find().sort({ createdAt: -1 }); // Sort by creation date

  if (!calculations || calculations.length === 0) {
    return res.status(404).json({ message: "No calculations found." });
  }

  res.status(200).json({
    message: "All calculations retrieved successfully",
    data: calculations,
  });
});

export { calculateCart, getAllCalculations, getAllCalculationsByClientId };