import mongoose from "mongoose";

const schema = new mongoose.Schema({
  unitName: {
    type: String,
    required: true,
    minLength: [3, "title is too short"],
    maxLength: [30, "title is too long"],
    trim: true,
  },
  floorNum: {
    type: Number,
    required: true,
  },

  client:{
    type:mongoose.Types.ObjectId,
    ref:"client",

  },
},
  { timestamps: true }
);
const unitModel = mongoose.model("unit", schema);

export default unitModel;
  

