import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: "client",
    },

    cartItems: [{
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
            type:Number,
            default:1
        },
        price:Number
      }],

      totalPrice:Number,
      discount:Number,
      totalPriceAfterDiscount:Number

  },
  { timestamps: true }
);
const cartModel = mongoose.model("cart", schema);

export default cartModel;
