import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "title too Short"],
      maxLength: [30, "title too long"],
      trim: true,
      required: true,
    }, 
    lastName: {
      type: String,
      minLength: [3, "title too Short"],
      maxLength: [30, "title too long"],
      trim: true,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const clientModel=mongoose.model("client",schema)

export default clientModel
