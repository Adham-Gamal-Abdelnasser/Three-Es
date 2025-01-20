import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: [3, "Title too short"],
      maxLength: [30, "Title too long"],
      trim: true,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      set: (value) => value.toLowerCase(),
    },
    description: {
      type: String,
      minLength: [3, "Description is too short"],
      maxLength: [300, "Description is too long"],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    sold: {
      type: Number,
      default: 0,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EGP"],
      required: true,
    },
    type: {
      type: String,
      enum: ["OutSide", "InSide"],
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    rateCount: Number,
    rateAvag: {
      type: Number,
      min: 1,
      max: 5,
    },
    serialNumber: {
      type: String,
     
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

schema.post("init", function (doc) {
  if (doc.imageCover && !doc.imageCover.startsWith(process.env.BASE_URL)) {
    doc.imageCover = process.env.BASE_URL + "uploads/" + doc.imageCover;
  }
  if (doc.images) {
    doc.images = doc.images.map((ele) => {
      if (!ele.startsWith(process.env.BASE_URL)) {
        return process.env.BASE_URL + "uploads/" + ele;
      }
      return ele;
    });
  }
});

const ProductModel = mongoose.models.Product || mongoose.model("Product", schema);

export default ProductModel;
