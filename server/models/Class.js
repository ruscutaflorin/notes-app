import { sequelize } from "../config/db.js"; // Asigură-te că este calea corectă către fișierul cu instanța Sequelize
import { DataTypes } from "sequelize";

const Class = sequelize.define("Class", {
  className: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING, // sau TEXT, în funcție de necesități
    allowNull: true,
  },
});

export default Class;
