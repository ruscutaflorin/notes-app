import React from "react";
import NoteItem from "./NoteItem";
import "../../styles/noteList.css";

const NotesList = ({ notes, onNoteClick }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onClick={() => onNoteClick(note)} />
      ))}
    </div>
  );
};

export default NotesList;
