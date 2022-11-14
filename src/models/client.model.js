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
    phone: {
      type: Number,
      required: false,
      trim: true
    },
    inDebt: {
      type: Number,
      required: true,
      default: 0,
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
