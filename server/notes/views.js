import {
  addNoteService,
  addAttachmentService,
  addClassService,
  addGroupService,
  getUserNotes,
  getUsersById,
  getUserIdByUsername,
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

    const { groupName, userIDs, noteIds } = req.body;
    const studyGroup = await addGroupService(groupName);
    const users = await getUsersById(userIDs);
    const notes = await getUserNotes(noteIds);

    await studyGroup.addUsers(users);
    await studyGroup.addNotes(notes);

    return res.status(201).json("StudyGroup created successfully");
  } catch (err) {
    return res.status(501).json(err.message);
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const response = await getUserIdByUsername(req.query.username);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(501).json(error.message);
  }
};

export const getNotesByUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = await getUsersById(req.query.username);
    const response = await getUserNotes(userId);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(501).json(error.message);
  }
};
