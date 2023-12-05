import mongoose from "mongoose";

const { Schema } = mongoose;

const AttachmentSchema = new Schema({
  type: { type: String, required: true },
  url: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});

const AttachmentModel = mongoose.model("Attachment", AttachmentSchema);

export default AttachmentModel;
