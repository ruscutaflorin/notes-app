import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: ObjectId("user_id"),
  username: "student_username",
  email: "student@stud.ase.ro",
  password: "hashed_password",
  created_at: ISODate("timestamp"),
  updated_at: ISODate("timestamp"),
});

module.exports = mongoose.model("userSchema", UserSchema);
