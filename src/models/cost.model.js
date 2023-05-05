import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
      trim: true
    },
    endDate: {
      type: String,
      required: true,
      trim: true
    },
    expenses: [
      {
        expense: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

class cost {}

schema.loadClass(cost)
export const Cost = mongoose.model('Cost', schema)
