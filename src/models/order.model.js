import mongoose from "mongoose";
import { Client } from "../models/client.model.js";
import { production_stage } from "../enums/production_stage.js";

const schema = new mongoose.Schema(
  {
    orderName: {
      type: String,
      required: true,
      trim: true,
    },
    creationDate: {
      type: String,
      required: true,
      default: new Date(Date.now()).toLocaleDateString(),
      trim: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    stateCounter: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

class order {
  setClient(Client) {
    this.client = Client;
  }
  setState(StateCounter) {
    this.stateCounter = StateCounter;
    this.state = production_stage[this.stateCounter];
  }

  moveForward() {
    if (this.state != production_stage[production_stage.length - 1]) {
      this.stateCounter++;
      this.state = production_stage[this.stateCounter];
    }
  }
  moveBackward() {
    if (this.state != production_stage[0]) {
      this.stateCounter--;
      this.state = production_stage[this.stateCounter];
    }
  }
}

schema.loadClass(order);
export const Order = mongoose.model("Order", schema);
