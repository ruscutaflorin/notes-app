import { sequelize } from "../config/db.js"; // Asigură-te că este calea corectă către fișierul cu instanța Sequelize
import { DataTypes } from "sequelize";
import Attachment from "./Attachment.js";
import User from "./User.js";
import Class from "./Class.js";
import NoteUser from "./NoteUser.js"; // Import the junction table model

const Note = sequelize.define("Note", {
  userId: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING, // sau TEXT, în funcție de necesități
    allowNull: true,
  },
  classId: {
    type: DataTypes.INTEGER, // sau DataTypes.UUID, în funcție de tipul id-ului Class-ului
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

// Sincronizare model cu baza de date (aceasta creează tabela)
Note.sync()
  .then(() => {
    console.log("Model sincronizat cu baza de date");
  })
  .catch((err) => {
    console.error("Eroare la sincronizare model cu baza de date:", err);
  });

export default Note;
