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
      required: true,
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
    ci: {
      type: Number,
      required: true,
      trim: true
    },
    startDate: {
      type: String,
      // default: new Date(Date.now()).toLocaleDateString(),
      required: false,
      trim: true
    },
    nationality: {
      type: String,
      required: false,
      trim: true
    },
    birthday: {
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

class employee {}

schema.loadClass(employee)
export const Employee = mongoose.model('Employee', schema)
