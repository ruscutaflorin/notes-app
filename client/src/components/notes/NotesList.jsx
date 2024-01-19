import React, { useState } from "react";
import NoteItem from "./NoteItem";
import "../../styles/noteList.css";

const NotesList = ({ notes, onNoteClick }) => {
  const itemsPerPage = 3; // Adjust the number of notes per page as needed
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNote = currentPage * itemsPerPage;
  const indexOfFirstNote = indexOfLastNote - itemsPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="notes-list">
      <div className="wrapperNotes">
        {currentNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onClick={() => onNoteClick(note)}
          />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(notes.length / itemsPerPage) }).map(
          (item, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default NotesList;
