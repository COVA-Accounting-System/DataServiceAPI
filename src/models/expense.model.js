import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    accountingSeat: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    concept: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      trim: true
    },
    inventoryInput: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryInput'
    },
    creditorEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    creditorProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider'
    },
    creditorEntity: {
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

class expense {}

schema.loadClass(expense)
export const Expense = mongoose.model('Expense', schema)
