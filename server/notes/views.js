import {
  addNoteService,
  addAttachmentService,
  addClassService,
  addGroupService,
} from "./services/notes.js";
import { validationResult } from "express-validator";

export const addNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    const response = await addNoteService(data);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(501).json(err.message);
  }
};

export const addAttachment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    const response = await addAttachmentService(data);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(501).json(err.message);
  }
};

export const addClass = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    const response = await addClassService(data);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(501).json(err.message);
  }
};

export const addGroup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    const response = await addGroupService(data);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(501).json(err.message);
  }
};
