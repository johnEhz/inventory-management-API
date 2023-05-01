import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true
    },
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.ecryptPassword = async (password) => {
  const steps = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, steps)
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", UserSchema);
