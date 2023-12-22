import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Class = sequelize.define("Class", {
  className: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Class;
