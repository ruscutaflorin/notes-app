import { db } from "./config/db.js";
import express from "express";
import cors from "cors";
import UserModel from "./schemas/User.js";
import StudyGroupModel from "./schemas/StudyGroup.js";
import ClassModel from "./schemas/Class.js";
import NoteModel from "./schemas/Note.js";
import AttachmentModel from "./schemas/Attachment.js";
const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());

db.on("error", (error) => console.error(error));

db.once("connected", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* app.post("/study-groups", async (req, res) => {
  try {
    const newStudyGroup = await StudyGroupModel.create(req.body);
    res.status(201).json(newStudyGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/notes", async (req, res) => {
  try {
    const newNote = await NoteModel.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}); */

app.post("/classes", async (req, res) => {
  try {
    const newClass = await ClassModel.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/attachments", async (req, res) => {
  try {
    const newAttachment = await AttachmentModel.create(req.body);
    res.status(201).json(newAttachment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
