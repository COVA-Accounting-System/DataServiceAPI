import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    numberOfInput: {
      type: Number,
      required: true,
      trim: true
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider'
    },
    date: {
      type: String,
      required: true,
      trim: true
    },
    listOfMaterials: [
      {
        rawMaterial: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RawMaterial'
        },
        amount: {
          type: Number,
          required: true,
          trim: true
        },
        unitMeasure: {
          type: String,
          required: true,
          trim: true
        },
        price: {
          type: Number,
          required: true,
          trim: true
        }
      }
    ],
    totalPrice: {
      type: Number,
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

class inventoryInput {}

schema.loadClass(inventoryInput)
export const InventoryInput = mongoose.model('InventoryInput', schema)
