
import { sequelize } from "./config/db.js"; // Asigură-te că este calea corectă către fișierul cu instanța Sequelize
import { DataTypes } from 'sequelize';

const Attachment = sequelize.define('Attachment', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Sincronizare model cu baza de date (aceasta creează tabela)
Attachment.sync().then(() => {
  console.log('Model sincronizat cu baza de date');
}).catch((err) => {
  console.error('Eroare la sincronizare model cu baza de date:', err);
});

export default Attachment;
