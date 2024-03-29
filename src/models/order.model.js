import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    orderClient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    },
    orderProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    listOfIncomes: [
      {
        income: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Income'
        }
      }
    ],
    listOfInventoryOutputs: [
      {
        inventoryOutput: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'InventoryOutput'
        }
      }
    ],
    orderNumber: {
      type: String,
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
    orderPrePayedPrice: {
      type: Number,
      required: true,
      trim: true
    },
    orderPayedPrice: {
      type: Number,
      required: true,
      trim: true
    },
    orderBalance: {
      type: Number,
      required: true,
      trim: true
    },
    orderMaterialCosts: {
      type: Number,
      required: true,
      trim: true
    },
    orderLabourCosts: {
      type: Number,
      required: true,
      trim: true
    },
    orderIndirectCosts: {
      type: Number,
      required: true,
      trim: true
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
    orderPaidState: {
      type: String,
      required: true,
      trim: true
    },
    orderPaidStateNumber: {
      type: Number,
      required: true,
      trim: true
    },
    uiName: {
      type: String,
      required: true,
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
