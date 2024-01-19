import React, { useState } from "react";
import { useEffect } from "react";
import "../../styles/noteDetails.css";
import Modal from "./Modal";
import axios from "axios";
const NoteDetails = ({
  note,
  isVisible,
  onClose,
  onDeleteNote,
  onNoteUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });
  const [attachments, setAttachments] = useState();

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/notes/get-attachments?noteId=${editedNote.id}`
        );
        setAttachments(response.data.url);
      } catch (error) {
        console.error("Error fetching attachments:", error);
      }
    };

    fetchAttachments();
  }, [editedNote.id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/notes/edit-note?noteId=${editedNote.id}`,
        editedNote
      );

      const updatedNote = response.data;
      onNoteUpdate(updatedNote);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  const handleDeleteNote = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/notes/delete-note?noteId=${editedNote.id}`
      );
      onDeleteNote(editedNote.id);
      onClose();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return isVisible ? (
    <Modal onClose={onClose}>
      <div className="note-details">
        <h3>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleInputChange}
            />
          ) : (
            editedNote.title
          )}
        </h3>
        {isEditing ? (
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editedNote.content}</p>
        )}
        <div>
          <strong>User ID:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="userId"
              value={editedNote.userId}
              onChange={handleInputChange}
            />
          ) : (
            editedNote.userId
          )}
        </div>
        <div>
          <strong>Class ID:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="classId"
              value={editedNote.classId}
              onChange={handleInputChange}
            />
          ) : (
            editedNote.classId
          )}
        </div>
        <div>
          <strong>Labels:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="labels"
              value={editedNote.labels.join(", ")}
              onChange={(e) =>
                setEditedNote((prevNote) => ({
                  ...prevNote,
                  labels: e.target.value
                    .split(", ")
                    .map((label) => label.trim()),
                }))
              }
            />
          ) : (
            editedNote.labels.join(", ")
          )}
        </div>
        <div>
          <strong>Keywords:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="keywords"
              value={editedNote.keywords.join(", ")}
              onChange={(e) =>
                setEditedNote((prevNote) => ({
                  ...prevNote,
                  keywords: e.target.value
                    .split(", ")
                    .map((keyword) => keyword.trim()),
                }))
              }
            />
          ) : (
            editedNote.keywords.join(", ")
          )}
        </div>
        {/* <div>
          <strong>Attachments:</strong>
          <ul>
            {editedNote.attachments &&
              editedNote.attachments.map((attachment, index) => (
                <li key={index}>{attachment.file.name}</li>
              ))}
          </ul>
        </div> */}
        <div>
          <strong>Attachments URLs:</strong>
          <ul>
            <li key={0}>{attachments}</li>
          </ul>
        </div>
        {isEditing ? (
          <button onClick={handleSaveChanges}>Save Changes</button>
        ) : (
          <>
            <button onClick={handleEditToggle}>Edit Note</button>
            <button onClick={handleDeleteNote}>Delete Note</button>
          </>
        )}
      </div>
    </Modal>
  ) : null;
};

export default NoteDetails;
