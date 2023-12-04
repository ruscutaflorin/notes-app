import mongoose from "mongoose";

const { Schema } = mongoose;

export const NoteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String },
  attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
  classId: { type: Schema.Types.ObjectId, ref: "Class" },
  labels: [{ type: String }],
  keywords: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const NoteModel = mongoose.model("Note", NoteSchema);

export default NoteModel;
