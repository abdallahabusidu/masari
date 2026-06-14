import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    level: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true, index: true },
    name: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

subjectSchema.methods.toJSON = function () {
  const o = this.toObject();
  o.id = o._id;
  delete o._id;
  delete o.__v;
  return o;
};

export const Subject = mongoose.model("Subject", subjectSchema);
