import React, { useState, useEffect } from "react";
import axios from "axios";
import NotesList from "../components/notes/NotesList";
import AddNoteForm from "../components/notes/AddNoteForm";
import "../styles/notesPage.css";
import NoteDetails from "../components/notes/NoteDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const { user } = useAuthContext(); // Assuming your auth context provides the user's data, adjust accordingly
  const [isAddNoteFormVisible, setIsAddNoteFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (user && user.username) {
          const response = await axios.get(
            `http://localhost:3001/api/notes/get-notes?username=${user.username}`
          );
          setNotes(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [user]);

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

  const handleDeleteNote = (deletedNoteId) => {
    // Update the state by filtering out the deleted note
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
  };
  const handleNoteUpdate = (updatedNote) => {
    // Find the index of the updated note in the notes array
    const updatedNoteIndex = notes.findIndex(
      (note) => note.id === updatedNote.id
    );

    // If the note is found, update the state with the new data
    if (updatedNoteIndex !== -1) {
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        newNotes[updatedNoteIndex] = updatedNote;
        return newNotes;
      });
    }
  };
  console.log(notes);
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
      <div className="component-wrapper-notes">
        <NotesList notes={notes} onNoteClick={handleNoteClick} />
      </div>
      <div className="component-wrapper">
        {selectedNote && (
          <NoteDetails
            note={selectedNote}
            isVisible={true}
            onClose={() => setSelectedNote(null)}
            onDeleteNote={handleDeleteNote}
            onNoteUpdate={handleNoteUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default NotesPage;
