import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true
    },
    uiName: {
      type: String,
      required: true,
      trim: true
    },
    features: [
      {
        description: {
          type: String,
          required: false,
          trim: true
        }
      }
    ],
    unitMeasure: {
      _id: {
        type: Number,
        requeired: true,
        trim: true
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      uiName: {
        type: String,
        required: true,
        trim: true
      },
      pluralName: {
        type: String,
        required: true,
        trim: true
      },
      spanishName: {
        type: String,
        required: true,
        trim: true
      },
      pluralSpanishName: {
        type: String,
        required: true,
        trim: true
      },
      abbreviation: {
        type: String,
        required: true,
        trim: true
      }
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

class rawMaterial {}

schema.loadClass(rawMaterial)
export const RawMaterial = mongoose.model('RawMaterial', schema)
