import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const StudyGroup = sequelize.define("StudyGroup", {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default StudyGroup;
