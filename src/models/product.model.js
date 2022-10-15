import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    photography: {
      type: String,
      required: false,
      trim: true,
    },
    unitPrice: {
      type: Number,
      required: false,
      trim: true,
    },
    dozenPrice: {
      type: Number,
      required: false,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    isVisible: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

class product {}

schema.loadClass(product);
export const Product = mongoose.model("Product", schema);
