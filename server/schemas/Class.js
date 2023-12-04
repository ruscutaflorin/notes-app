import mongoose from "mongoose";

export const ClassSchema = new mongoose.Schema({
  _id: ObjectId("class_id"),
  className: "Class Name",
  description: "Class Description",
  created_at: ISODate("timestamp"),
  updated_at: ISODate("timestamp"),
});

module.exports = mongoose.model("classSchema", ClassSchema);
