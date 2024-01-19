import {
  addNoteService,
  addAttachmentService,
  addClassService,
  addGroupService,
  getUserNotes,
  getUsersById,
  getUserIdByUsername,
  getUserInfoByEmail,
  getNoteInfoById,
  deleteNoteByIdService,
  editNoteService,
  getGroupInfoByIdService,
  getGroupNotesByIdService,
  getGroupsByUserIdService,
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
    const studyGroup = await addGroupService(groupName, noteIds);
    const users = await getUsersById(userIDs);

    await studyGroup.addUsers(users);

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
    const userId = await getUserIdByUsername(req.query.username);
    const response = await getUserNotes(userId);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(501).json(error.message);
  }
};

export const getDetailsByEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.query;
    const response = await getUserInfoByEmail(email);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(501).json(error.message);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { noteId } = req.query;
    const response = await getNoteInfoById(noteId);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(501).json(error.message);
  }
};

export const deleteNoteById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { noteId } = req.query;

    await deleteNoteByIdService(noteId);

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const editNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { noteId } = req.query;
    const updatedData = req.body;

    const updatedNote = await editNoteService(noteId, updatedData);

    return res.status(200).json(updatedNote);
  } catch (err) {
    return res.status(501).json(err.message);
  }
};

export const getGroupInfoById = async (req, res) => {
  try {
    const { groupId } = req.query;
    const groupInfo = await getGroupInfoByIdService(groupId);

    return res.status(200).json(groupInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupNotesById = async (req, res) => {
  try {
    const { groupId } = req.query;
    console.log("test");
    const groupNotes = await getGroupNotesByIdService(groupId);
    return res.status(200).json(groupNotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const userGroups = await getGroupsByUserIdService(userId);

    return res.status(200).json(userGroups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
