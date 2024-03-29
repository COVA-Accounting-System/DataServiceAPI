import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: false,
      trim: true
    },
    uiName: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true
    },
    phoneCountryCode: {
      type: String,
      required: false,
      trim: true
    },
    address: {
      type: String,
      required: false,
      trim: true
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    isVisible: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

class client {}

schema.loadClass(client)
export const Client = mongoose.model('Client', schema)
