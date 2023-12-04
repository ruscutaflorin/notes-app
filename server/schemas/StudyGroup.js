import mongoose from "mongoose";

export const StudyGroupSchema = new mongoose.Schema({
  _id: ObjectId("group_id"),
  groupName: "Study Group Name",
  members: [ObjectId("user_id_1"), ObjectId("user_id_2")],
  notes: [ObjectId("note_id_1"), ObjectId("note_id_2")],
  created_at: ISODate("timestamp"),
  updated_at: ISODate("timestamp"),
});

module.exports = mongoose.model("studyGroupSchema", StudyGroupSchema);
