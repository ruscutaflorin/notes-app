import { sequelize } from "./config/db.js";
import { DataTypes } from 'sequelize';
import User from './models/user.js';
import Note from './models/note.js'; 

const StudyGroup = sequelize.define('StudyGroup', {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
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
StudyGroup.belongsToMany(User, { through: 'StudyGroupMember', foreignKey: 'groupId', otherKey: 'userId' });
StudyGroup.belongsToMany(Note, { through: 'StudyGroupNote', foreignKey: 'groupId', otherKey: 'noteId' });

// Sincronizare model cu baza de date (aceasta creează tabela)
StudyGroup.sync().then(() => {
  console.log('Model sincronizat cu baza de date');
}).catch((err) => {
  console.error('Eroare la sincronizare model cu baza de date:', err);
});

export default StudyGroup;
