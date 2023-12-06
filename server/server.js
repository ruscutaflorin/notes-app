import { db } from "./config/db.js";
import express from "express";
import cors from "cors";
import { router } from "./router.js";
const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

db.on("error", (error) => console.error(error));

db.once("connected", () => {
  console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
