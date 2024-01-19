import express from "express";
import {
  addNote,
  addAttachment,
  addClass,
  addGroup,
  getNotesByUser,
  getDetailsByEmail,
  getNoteById,
  deleteNoteById,
  editNote,
} from "./views.js";
import {
  validateAttachment,
  validateClass,
  validateNote,
  validateStudyGroup,
} from "../utils/validation.js";

export const router = express.Router();

router.post("/add-note", validateNote, addNote);
router.post("/add-attachment", validateAttachment, addAttachment);
router.post("/add-class", validateClass, addClass);
router.post("/add-group", validateStudyGroup, addGroup);
router.get("/get-notes", getNotesByUser);
router.get("/get-details", getDetailsByEmail);
router.get("/get-attachments", getNoteById);
router.delete("/delete-note", deleteNoteById);
router.put("/edit-note", editNote);
