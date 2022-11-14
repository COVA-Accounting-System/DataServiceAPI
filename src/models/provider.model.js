import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: false,
      trim: true
    },
    country: {
      type: String,
      required: false,
      trim: true
    },
    phone: {
      type: Number,
      required: false,
      trim: true
    },
    nit: {
      type: Number,
      required: false,
      trim: true
    },
    address: {
      type: String,
      required: false,
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

class provider {}

schema.loadClass(provider)
export const Provider = mongoose.model('Provider', schema)
