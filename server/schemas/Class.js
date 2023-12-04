import mongoose from "mongoose";
const { Schema } = mongoose;

export const ClassSchema = new Schema({
  className: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ClassModel = mongoose.model("Class", ClassSchema);

export default ClassModel;
