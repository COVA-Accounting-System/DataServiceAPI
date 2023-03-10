import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    orderClient: {
      uiName: {
        type: String,
        required: true,
        trim: true
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
      }
    },
    orderProduct: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
      },
      uiName: {
        type: String,
        required: true,
        trim: true
      },
      productType: {
        type: String,
        required: true,
        trim: true
      }
      // productPrice: {
      //   type: Number,
      //   required: true,
      //   trim: true
      // },
      // productDozenPrice: {
      //   type: Number,
      //   required: true,
      //   trim: true
      // }
    },
    orderNumber: {
      type: Number,
      required: true,
      trim: true
    },
    orderProductAmount: {
      type: Number,
      required: false,
      trim: true
    },
    orderProductAmountType: {
      type: String,
      required: true,
      trim: true
    },
    orderPrice: {
      type: Number,
      trim: true,
      required: true,
      default: 0
    },
    orderCreationDate: {
      type: String,
      required: false,
      trim: true
    },
    orderDeliveryDate: {
      type: String,
      required: false,
      trim: true
    },
    orderState: {
      type: String,
      required: false,
      trim: true
    },
    orderStateNumber: {
      type: Number,
      required: false,
      trim: true
    },
    orderFeatures: [
      {
        description: {
          type: String,
          required: false,
          trim: true
        }
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    isVisible: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

class order {}

schema.loadClass(order)
export const Order = mongoose.model('Order', schema)
