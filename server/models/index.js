import { sequelize } from "../config/db.js";
import User from "./User.js";
import StudyGroup from "./StudyGroup.js";
import Note from "./Note.js";
import Class from "./Class.js";
import Attachment from "./Attachment.js";

User.hasMany(Note, { foreignKey: "userId" });
User.belongsToMany(StudyGroup, {
  through: "StudyGroupMember",
  foreignKey: "userId",
});

StudyGroup.belongsToMany(User, {
  through: "StudyGroupMember",
  foreignKey: "groupId",
});
StudyGroup.belongsToMany(Note, {
  through: "StudyGroupNote",
  foreignKey: "groupId",
});

Note.belongsTo(User, { foreignKey: "userId" });
Note.belongsToMany(User, { through: "NoteUser", foreignKey: "noteId" });
Note.belongsTo(Class, { foreignKey: "classId" });
Note.belongsToMany(Attachment, {
  through: "NoteAttachment",
  foreignKey: "noteId",
  otherKey: "attachmentId",
});

Class.hasMany(Note, { foreignKey: "classId" });

Attachment.belongsToMany(Note, {
  through: "NoteAttachment",
  foreignKey: "attachmentId",
  otherKey: "noteId",
});

sequelize
  .sync()
  .then(() => {
    console.log("All models synchronized with the database");
  })
  .catch((err) => {
    console.error("Error synchronizing models with the database:", err);
  });
