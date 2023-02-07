import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    uiName: {
      type: String,
      required: false,
      trim: true
    },
    productFeatures: [
      {
        description: {
          type: String,
          required: false,
          trim: true
        }
      }
    ],
    // photography: {
    //   type: String,
    //   required: false,
    //   trim: true
    // },
    productType: {
      type: String,
      required: true,
      trim: true
    },
    productPrice: {
      type: Number,
      required: true,
      trim: true
    },
    productDozenPrice: {
      type: Number,
      required: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    isVisible: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

class product {}

schema.loadClass(product)
export const Product = mongoose.model('Product', schema)
