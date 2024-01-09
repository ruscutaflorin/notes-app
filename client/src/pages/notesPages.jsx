import React from "react";
import NotesList from "../components/NotesList";
import AddNoteForm from "../components/AddNoteForm";
import "../styles/notesPage.css";

const NotesPage = () => {
  return (
    <div className="container-wrapper">
      <h2>My Notes</h2>
      <AddNoteForm />
      <NotesList />
    </div>
  );
};

export default NotesPage;
