import express from "express";
import {
  addNote,
  addAttachment,
  addClass,
  addGroup,
  getNotesByUser,
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
