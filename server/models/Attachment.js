import { sequelize } from "../config/db.js"; // Asigură-te că este calea corectă către fișierul cu instanța Sequelize
import { DataTypes } from "sequelize";

const Attachment = sequelize.define("Attachment", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Attachment;
