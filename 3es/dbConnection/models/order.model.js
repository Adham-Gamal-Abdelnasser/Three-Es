import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "client",
    },

    cartItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    

    totalOrderPrice: Number,
    discount: Number,
    totalOrderPriceAfterDiscount: Number,
  
    paymentMethod: {
      type: String,
      enum: ["cash", "credit"], // changed enums to enum and separated the values with commas
    },
    unitName:{
        type:mongoose.Types.ObjectId,
        ref:"unit"
    },
    isPaid:Boolean,
    paidAt:Date,
  },
  
  { timestamps: true }
);
const orderModel = mongoose.model("order", schema);

export default orderModel;
