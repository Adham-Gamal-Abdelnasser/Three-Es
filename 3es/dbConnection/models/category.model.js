import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, "title is too short"],
      maxLength: [30, "title is too long"],
      trim: true,
      unique:true
    },
    slug:{
        type: String,
        required:true,
        lowerCase:true
    } ,
    image:{
        type:String
    }, 
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        
    }

  },
  { timestamps: true }
);
schema.post("init",function (doc) {
 if(doc.image) doc.image=process.env.BASE_URL+"uploads/"+doc.image
  
})
const categoryModel = mongoose.model("category", schema);

export default categoryModel;
