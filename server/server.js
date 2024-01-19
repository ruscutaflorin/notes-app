import express from "express";
import cors from "cors";
import { router } from "./router.js";
import { sequelize } from "./config/db.js";
import "../server/models/index.js";
import { generateUploadURL } from "./s3.js";

const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL(req.query.type);
  res.send({ url });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectat cu succes la baza de date");
  })
  .catch((err) => {
    console.error("Eroare de conectare la baza de date:", err);
  });
