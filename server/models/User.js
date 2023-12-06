
import { sequelize } from './config/db.js'; // Asigură-te că este calea corectă către fișierul cu instanța Sequelize
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
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

// Sincronizare model cu baza de date (aceasta creează tabela)
User.sync().then(() => {
  console.log('Model sincronizat cu baza de date');
}).catch((err) => {
  console.error('Eroare la sincronizare model cu baza de date:', err);
});

export default User;
