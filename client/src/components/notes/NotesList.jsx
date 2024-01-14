import React from "react";
import NoteItem from "./NoteItem";
const NotesList = () => {
  // Fetch notes data from API or state

  return (
    <div>
      <h3>All Notes</h3>
      {/* Add filtering/sorting options */}
      <ul>
        {/* Map through notes and render NoteItem for each */}
        {/* <NoteItem key={note.id} note={note} /> */}
      </ul>
    </div>
  );
};

export default NotesList;
