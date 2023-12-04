import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:admin@app-notes-cluster.dgqxe4y.mongodb.net/"
);

export const db = mongoose.connection;
