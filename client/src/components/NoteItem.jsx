// NoteItem.js
import React from "react";

const NoteItem = ({ note }) => {
  return (
    <li>
      <p>{note.title}</p>
      {/* Display note details and actions (edit, delete, share) */}
    </li>
  );
};

export default NoteItem;
