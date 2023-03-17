import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    accountingSeat: {
      type: String,
      required: true,
      trim: true
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    date: {
      type: String,
      required: false,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      trim: true
    },
    concept: {
      type: String,
      required: true,
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

class income {}

schema.loadClass(income)
export const Income = mongoose.model('Income', schema)
