import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      default: 0,
      trim: true
    },
    inventoryInputNumber: {
      type: Number,
      required: true,
      default: 0,
      trim: true
    },
    inventoryOutputNumber: {
      type: Number,
      required: true,
      trim: true
    },
    incomeNumber: {
      type: Number,
      required: true,
      default: 0,
      trim: true
    },
    expenseNumber: {
      type: Number,
      required: true,
      default: 0,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

class config {}

schema.loadClass(config)
export const Config = mongoose.model('Config', schema)
