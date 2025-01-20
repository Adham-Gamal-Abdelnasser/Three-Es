import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      ref: "client", // Reference to the client model
      required: true, // Ensure this field is required
    },
    currencyRate: {
      type: Number,
      required: true, 
      default: 1, 
    },
    costPerItem: {
      type: Number,
    },
    profitMargin: {
      type: Number,
    },
    taxRate: {
      type: Number,
    },
    shippingCost: {
      type: Number,
    },
    customsCost: {
      type: Number,
    },
    customsClearance: {
      type: Number,
    },
    storage: {
      type: Number,
    },
    localShipping: {
      type: Number,
    },
    otherCosts: {
      type: Number,
      default: 0, // Miscellaneous costs
    },
    setup: {
      type: Number,
    },
    transportation: {
      type: Number,
    },
    discountRate: {
      type: Number,
      default: 0, // Percentage discount
    },
    commission: {
      type: Number,
      default: 0, // Commission amount
    },
    totalItems: {
      type: Number,
    },
    totalCost: {
      type: Number,
    },
    finalCost: {
      type: Number, // Final cost after all calculations
    },
  },
  { timestamps: true }
);

const calculationModel = mongoose.model("calculation", calculationSchema);

export default calculationModel;