
import { sequelize } from "./config/db.js"; // Asigură-te că este calea corectă către fișierul cu instanța Sequelize
import { DataTypes } from 'sequelize';

const Class = sequelize.define('Class', {
  className: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING, // sau TEXT, în funcție de necesități
    allowNull: true,
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

// Sincronizare model cu baza de date (aceasta creează tabela)
Class.sync().then(() => {
  console.log('Model sincronizat cu baza de date');
}).catch((err) => {
  console.error('Eroare la sincronizare model cu baza de date:', err);
});

export default Class;
