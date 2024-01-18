import React, { useEffect } from "react";
import NotesList from "../components/notes/NotesList";
import AddNoteForm from "../components/notes/AddNoteForm";
import "../styles/notesPage.css";
import NoteDetails from "../components/notes/NoteDetails";
import { useState } from "react";
import tasks from "../files/tasks.pdf";
import bacau from "../files/bacau.jpg";
const NotesPage = () => {
  console.log(tasks);
  const [isAddNoteFormVisible, setIsAddNoteFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([
    {
      id: 1,
      userId: 123,
      title: "First Note",
      content: "This is the content of the first note.",
      classId: 456,
      labels: ["Label1", "Label2"],
      keywords: ["Keyword1", "Keyword2"],
      attachments: [bacau, tasks],
    },
    {
      id: 2,
      userId: 456,
      title: "Second Note",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      classId: 789,
      labels: ["Label3", "Label4"],
      keywords: ["Keyword3", "Keyword4"],
    },
    {
      id: 3,
      userId: 789,
      title: "Third Note",
      content: "This is the content of the third note.",
      classId: 123,
      labels: ["Label5", "Label6"],
      keywords: ["Keyword5", "Keyword6"],
    },
  ]);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleAddNoteClick = () => {
    setIsAddNoteFormVisible(!isAddNoteFormVisible);
  };
  const handleAddNoteFormClose = () => {
    setIsAddNoteFormVisible(false);
  };
  return (
    <div className="container-wrapper notes-wrapper">
      <div className="component-wrapper">
        <button onClick={() => setIsAddNoteFormVisible(true)}>Add Note</button>
        <AddNoteForm
          onAddNote={handleAddNote}
          onCloseForm={() => setIsAddNoteFormVisible(false)}
          isVisible={isAddNoteFormVisible}
        />
      </div>
      <div className="component-wrapper">
        <NotesList notes={notes} onNoteClick={handleNoteClick} />
      </div>
      <div className="component-wrapper">
        {selectedNote && (
          <NoteDetails
            note={selectedNote}
            isVisible={true}
            onClose={() => setSelectedNote(null)}
          />
        )}
      </div>
    </div>
  );
};

export default NotesPage;
