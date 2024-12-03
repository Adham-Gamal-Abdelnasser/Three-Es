import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    unitName: {
      type: mongoose.Types.ObjectId,
      ref: "unit",  // Reference to the "unit" model
      required: true
    },
    roomName: {
      type: String,
      required: true,
      minLength: [3, "Room name is too short"],
      maxLength: [50, "Room name is too long"],
      trim: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",  // Reference to the "user" who created the room
    },
    roomItems: [
      {
        item: {
          type: mongoose.Types.ObjectId,
          ref: "product",  // Reference to the item (similar to product in the cart)
        },
        quantity: {
          type: Number,
          default: 1  // Default quantity of the item in the room
        }
      }
    ]
  },
  { timestamps: true }
);

const roomModel = mongoose.model("room", schema);

export default roomModel;
