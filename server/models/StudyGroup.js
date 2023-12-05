import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const StudyGroupSchema = new Schema({
  groupName: { type: String, required: true },
  members: [{ type: Types.ObjectId, ref: "userSchema" }],
  notes: [{ type: Types.ObjectId, ref: "noteSchema" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const StudyGroupModel = mongoose.model("StudyGroup", StudyGroupSchema);

export default StudyGroupModel;
