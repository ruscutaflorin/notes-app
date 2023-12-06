import { sequelize } from "./config/db.js"; // Asigură-te că este calea corectă către fișierul cu instanța Sequelize
import { DataTypes } from 'sequelize';
import Attachment from './models/attachment.js'; // Asigură-te că este calea corectă către modelul Attachment
import Class from './models/class.js'; // Asigură-te că este calea corectă către modelul Class

const Note = sequelize.define('Note', {
  userId: {
    type: DataTypes.INTEGER, // sau DataTypes.UUID, în funcție de tipul id-ului User-ului
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Definirea relațiilor între modele
Note.belongsTo(Class, { foreignKey: 'classId' });
Note.belongsTo(User, { foreignKey: 'userId' });
Note.belongsToMany(Attachment, { through: 'NoteAttachment', foreignKey: 'noteId', otherKey: 'attachmentId' });

// Sincronizare model cu baza de date (aceasta creează tabela)
Note.sync().then(() => {
  console.log('Model sincronizat cu baza de date');
}).catch((err) => {
  console.error('Eroare la sincronizare model cu baza de date:', err);
});

export default Note;
