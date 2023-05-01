import { Schema, model } from "mongoose";

const InventorySchema = new Schema(
  {
    _author: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false,
  }
);

export default model("Inventory", InventorySchema);
