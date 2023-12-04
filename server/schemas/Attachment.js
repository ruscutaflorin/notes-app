import mongoose from "mongoose";

export const AttachmentSchema = new mongoose.Schema({
  _id: ObjectId("attachment_id"),
  type: "image/document",
  url: "attachment_url",
  created_at: ISODate("timestamp"),
});

module.exports = mongoose.model("attachmentSchema", AttachmentSchema);
