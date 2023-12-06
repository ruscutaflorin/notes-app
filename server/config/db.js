// import mongoose from "mongoose";

// mongoose.connect(
//   "mongodb+srv://admin:admin@app-notes-cluster.dgqxe4y.mongodb.net/"
// );

// export const db = mongoose.connection;


import { Sequelize } from "sequelize";

const sequelize = new Sequelize({

    dialect:'sqlite',
    storage:'./sqlite/notes.db'

})



sequelize.authenticate()
  .then(() => {
    console.log('Conectat cu succes la baza de date');
  })
  .catch((err) => {
    console.error('Eroare de conectare la baza de date:', err);
  });


export {sequelize}