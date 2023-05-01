import { model, Schema } from "mongoose";

export const BrandSchema = new Schema(
  {
    _author: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
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

export default model("Brand", BrandSchema);
