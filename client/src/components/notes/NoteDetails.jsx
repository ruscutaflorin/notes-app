import React, { useState } from "react";
import "../../styles/noteDetails.css";
import Modal from "./Modal";
const NoteDetails = ({ note, isVisible, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });

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

  const handleSaveChanges = () => {
    // Implement logic to save changes, e.g., call an API or update state
    console.log("Saving changes:", editedNote);
    setIsEditing(false);
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          ) : (
            editedNote.keywords.join(", ")
          )}
        </div>
        <div>
          <strong>Attachments:</strong>
          <ul>
            {editedNote.attachments &&
              editedNote.attachments.map((attachment, index) => (
                <li key={index}>{attachment}</li>
              ))}
          </ul>
        </div>
        {isEditing ? (
          <button onClick={handleSaveChanges}>Save Changes</button>
        ) : (
          <button onClick={handleEditToggle}>Edit Note</button>
        )}
      </div>
    </Modal>
  ) : null;
};

export default NoteDetails;
