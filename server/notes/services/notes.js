import {
  User,
  StudyGroup,
  Note,
  Class,
  Attachment,
} from "../../models/index.js";

export const addGroupService = async (groupName, noteIds) => {
  try {
    const existingGroup = await StudyGroup.findOne({
      where: { groupName: groupName },
    });

    if (existingGroup) {
      if (noteIds && noteIds.length > 0) {
        const notes = await getNotesByIds(noteIds);
        await existingGroup.addNotes(notes);
      }

      return existingGroup;
    }

    const newStudyGroup = await StudyGroup.create({
      groupName: groupName,
    });

    if (noteIds && noteIds.length > 0) {
      const notes = await getNotesByIds(noteIds);
      await newStudyGroup.addNotes(notes);
    }

    return newStudyGroup;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNotesByIds = async (noteIds) => {
  try {
    const notes = await Note.findAll({
      where: { id: noteIds },
    });
    return notes;
  } catch (error) {
    console.error(error);
    throw error;
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

    const newAttachment = await Attachment.create({
      ...attachmentData,
      userId: userId,
    });

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
      return { url: "No attachment found!" };
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
    const note = await Note.findByPk(noteId);

    if (!note) {
      throw new Error("Note not found");
    }

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

    await note.update(updatedData);

    const updatedNote = await Note.findByPk(noteId);

    return updatedNote;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGroupInfoByIdService = async (groupId) => {
  try {
    const groupInfo = await StudyGroup.findByPk(groupId);

    if (!groupInfo) {
      throw new Error("Study group not found");
    }

    return groupInfo;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

export const getGroupNotesByIdService = async (groupId) => {
  try {
    const group = await StudyGroup.findByPk(groupId, {
      include: [{ model: Note }],
    });

    if (!group) {
      throw new Error(`Study group with ID ${groupId} not found`);
    }

    return group.Notes || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getGroupsByUserIdService = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: StudyGroup }],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const groupIds = user.StudyGroups.map((group) => group.id);
    return groupIds || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
