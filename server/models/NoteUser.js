import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const NoteUser = sequelize.define("NoteUser", {
  noteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default NoteUser;
