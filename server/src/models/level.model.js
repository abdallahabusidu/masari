import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

levelSchema.methods.toJSON = function () {
  const o = this.toObject();
  o.id = o._id;
  delete o._id;
  delete o.__v;
  return o;
};

export const Level = mongoose.model("Level", levelSchema);
