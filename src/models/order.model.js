import mongoose from 'mongoose'
import { productionStage } from '../enums/productionStage.js'

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

class order {
  setState (StateCounter) {
    this.stateCounter = StateCounter
    this.state = productionStage[this.stateCounter]
  }

  moveForward () {
    if (this.state !== productionStage[productionStage.length - 1]) {
      this.stateCounter++
      this.state = productionStage[this.stateCounter]
    }
  }

  moveBackward () {
    if (this.state !== productionStage[0]) {
      this.stateCounter--
      this.state = productionStage[this.stateCounter]
    }
  }
}

schema.loadClass(order)
export const Order = mongoose.model('Order', schema)
