import express from "express";
import { addNote, addAttachment, addClass, addGroup } from "./views.js";
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
router.get("/add-group", validateStudyGroup, addGroup);
