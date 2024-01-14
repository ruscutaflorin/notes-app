import React from "react";
import NotesList from "../components/notes/NotesList";
import AddNoteForm from "../components/notes/AddNoteForm";
import "../styles/notesPage.css";

const NotesPage = () => {
  return (
    <div className="container-wrapper notes-wrapper">
      <h2>My Notes</h2>
      <div className="component-wrapper">
        <AddNoteForm />
      </div>
      <div className="component-wrapper">
        <NotesList />
      </div>
    </div>
  );
};

export default NotesPage;
