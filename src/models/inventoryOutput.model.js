import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    numberOfInput: {
      type: Number,
      required: true,
      trim: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
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
    estimatedPrice: {
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

class inventoryOutput {}

schema.loadClass(inventoryOutput)
export const InventoryOutput = mongoose.model('InventoryOutput', schema)
