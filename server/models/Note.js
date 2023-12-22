import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Note = sequelize.define("Note", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  labels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  keywords: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

export default Note;
