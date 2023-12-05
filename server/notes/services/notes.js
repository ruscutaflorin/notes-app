import StudyGroupModel from "../../models/StudyGroup.js";
import NoteModel from "../../models/Note.js";
import ClassModel from "../../models/Class.js";
import AttachmentModel from "../../models/Attachment.js";

export const addGroupService = async (data) => {
  try {
    const newStudyGroup = await StudyGroupModel.create(data);
    return newStudyGroup;
  } catch (error) {
    console.error(error);
  }
};

export const addNoteService = async (data) => {
  try {
    const newNote = await NoteModel.create(data);
    return newNote;
  } catch (error) {
    console.error(error);
  }
};

export const addClassService = async (data) => {
  try {
    const newClass = await ClassModel.create(data);
    return newClass;
  } catch (error) {
    console.error(error);
  }
};

export const addAttachmentService = async (data) => {
  try {
    const newAttachment = await AttachmentModel.create(data);
    return newAttachment;
  } catch (error) {
    console.error(error);
  }
};
