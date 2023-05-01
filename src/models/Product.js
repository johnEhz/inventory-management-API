import { Schema, model } from "mongoose";
import { BrandSchema } from "../models/Brand";
import { ProviderSchema } from "../models/Provider";

export const ProductSchema = new Schema(
  {
    _reference: {
      type: String,
      required: true,
    },
    _inventory: { type: Schema.Types.ObjectId, ref: "Inventory" },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    brand: {
      type: BrandSchema,
      required: false,
    },
    provider: {
      type: ProviderSchema,
      required: false,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    invest: {
      type: Number,
      default: function () {
        return this.price * this.quantity;
      },
    },
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", ProductSchema);
