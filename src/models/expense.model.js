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
      required: false,
      trim: true
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
    creditorEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    creditorProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider'
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
