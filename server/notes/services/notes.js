import {
  User,
  StudyGroup,
  Note,
  Class,
  Attachment,
} from "../../models/index.js";

export const addGroupService = async (data) => {
  try {
    const newStudyGroup = await StudyGroup.create({
      groupName: data,
    });
    return newStudyGroup;
  } catch (error) {
    console.error(error);
  }
};

export const addNoteService = async (data) => {
  try {
    const newNote = await Note.create(data);
    return newNote;
  } catch (error) {
    console.error(error);
  }
};

export const addClassService = async (data) => {
  try {
    const newClass = await Class.create(data);
    return newClass;
  } catch (error) {
    console.error(error);
  }
};

export const addAttachmentService = async (data) => {
  try {
    const { userId, noteId, ...attachmentData } = data;

    // Create the Attachment model with attachmentData
    const newAttachment = await Attachment.create({
      ...attachmentData,
      userId: userId,
    });

    // Associate with Note if noteId is provided
    if (noteId) {
      const note = await Note.findByPk(noteId);
      if (note) {
        await note.addAttachment(newAttachment);
      } else {
        console.error("Note not found");
      }
    }

    console.log("newAttachment", newAttachment);
    return newAttachment;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersById = async (data) => {
  try {
    const users = await User.findAll({
      where: {
        id: data,
      },
    });
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getUserIdByUsername = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        username: data,
      },
    });
    return user.id;
  } catch (error) {
    console.error(error);
  }
};

export const getUserNotes = async (data) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: data,
      },
    });
    return notes;
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfoByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        username: email,
      },
    });
    console.log(user);
    if (user) {
      const { id, username, email } = user;
      return { id, username, email };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user info by email:", error.message);
    throw error;
  }
};

export const getNoteInfoById = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId, {
      include: [{ model: Attachment, through: "NoteAttachment" }],
    });

    if (!note) {
      throw new Error("Note not found");
    }

    const attachments = note.Attachments;
    if (!attachments || attachments.length === 0) {
      throw new Error("No attachments found for the note");
    }
    const attachmentId = attachments[0].NoteAttachment.attachmentId;
    const attachment = await Attachment.findByPk(attachmentId);
    return attachment;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNoteByIdService = async (noteId) => {
  try {
    // Find the note by ID
    const note = await Note.findByPk(noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    // Delete the note along with its associated attachments
    await note.destroy();

    console.log(`Note with ID ${noteId} deleted successfully`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editNoteService = async (noteId, updatedData) => {
  try {
    const note = await Note.findByPk(noteId);

    if (!note) {
      throw new Error("Note not found");
    }

    // Update the note information with the provided data
    await note.update(updatedData);

    // Fetch the updated note to include associations
    const updatedNote = await Note.findByPk(noteId);

    return updatedNote;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
