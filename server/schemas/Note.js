import mongoose from "mongoose";

export const NoteSchema = new mongoose.Schema({
  _id: ObjectId("note_id"),
  userId: ObjectId("user_id"),
  title: "Note Title",
  content: "Markdown text content",
  attachments: ["attachment_id_1", "attachment_id_2"],
  classId: ObjectId("class_id"),
  labels: ["label1", "label2"],
  keywords: ["keyword1", "keyword2"],
  created_at: ISODate("timestamp"),
  updated_at: ISODate("timestamp"),
});

module.exports = mongoose.model("noteSchema", NoteSchema);
