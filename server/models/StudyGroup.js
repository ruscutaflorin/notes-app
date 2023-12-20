import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Note from "./Note.js";

const StudyGroup = sequelize.define("StudyGroup", {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default StudyGroup;
