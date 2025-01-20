import mongoose from "mongoose";
const schema = new mongoose.Schema({  client: {
  type: mongoose.Types.ObjectId,
  ref: 'client',
  required: true,
},
clientName: {
  type: String,
  required: true,
},
orderItems: [
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1'],
    },
    newPrice: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
  },
],
subtotal: {
  type: Number,
  required: true,
  min: [0, 'Subtotal cannot be negative'],
},
discountRate: {
  type: Number,
  default: 0,
  min: [0, 'Discount rate cannot be negative'],
},
discountAmount: {
  type: Number,
  default: 0,
  min: [0, 'Discount amount cannot be negative'],
},
taxRate: {
  type: Number,
  default: 0,
  min: [0, 'Tax rate cannot be negative'],
},
taxAmount: {
  type: Number,
  default: 0,
  min: [0, 'Tax amount cannot be negative'],
},
commissionRate: {
  type: Number,
  default: 0,
  min: [0, 'Commission rate cannot be negative'],
},
commissionAmount: {
  type: Number,
  default: 0,
  min: [0, 'Commission amount cannot be negative'],
},
totalAmount: {
  type: Number,
  required: true,
  min: [0, 'Total amount cannot be negative'],
},
amountPaid: {
  type: Number,
  default: 0,
  min: [0, 'Amount paid cannot be negative'],
},
outstandingAmount: {
  type: Number,
  default: 0,
  min: [0, 'Outstanding amount cannot be negative'],
},
paymentHistory: [
  {
    amount: {
      type: Number,
      required: true,
      min: [0, 'Payment amount cannot be negative'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: String,
  },
],
status: {
  type: String,
  enum: ['Pending', 'Partially Paid', 'Paid', 'Completed'],
  default: 'Pending',
},
},
{ timestamps: true }
);
const orderModel = mongoose.model("order", schema);
export default orderModel;