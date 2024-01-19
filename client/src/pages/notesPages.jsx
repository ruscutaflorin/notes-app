import React, { useState, useEffect } from "react";
import axios from "axios";
import NotesList from "../components/notes/NotesList";
import AddNoteForm from "../components/notes/AddNoteForm";
import "../styles/notesPage.css";
import NoteDetails from "../components/notes/NoteDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const { user } = useAuthContext();
  const [isAddNoteFormVisible, setIsAddNoteFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
  };
  const handleNoteUpdate = (updatedNote) => {
    const updatedNoteIndex = notes.findIndex(
      (note) => note.id === updatedNote.id
    );

    if (updatedNoteIndex !== -1) {
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        newNotes[updatedNoteIndex] = updatedNote;
        return newNotes;
      });
    }
  };

  const splitAndTrimKeywords = (keywords) =>
    keywords.split(",").map((keyword) => keyword.trim());

  const filteredNotes = notes.filter((note) => {
    const searchKeywords = splitAndTrimKeywords(searchQuery);
    return (
      searchKeywords.some((keyword) =>
        note.keywords.includes(keyword.toLowerCase())
      ) ||
      searchKeywords.some((keyword) =>
        note.labels.includes(keyword.toLowerCase())
      ) ||
      searchKeywords.some((keyword) =>
        note.classId.toString().includes(keyword.toLowerCase())
      ) ||
      searchKeywords.some((keyword) =>
        note.title.includes(keyword.toLowerCase())
      ) ||
      searchKeywords.some((keyword) =>
        note.content.includes(keyword.toLowerCase())
      )
    );
  });

  return (
    <div className="container-wrapper notes-wrapper">
      <div className="component-wrapper">
        <input
          type="text"
          placeholder="Search by keywords, labels, or class ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setIsAddNoteFormVisible(true)}>Add Note</button>
        <AddNoteForm
          onAddNote={handleAddNote}
          onCloseForm={() => setIsAddNoteFormVisible(false)}
          isVisible={isAddNoteFormVisible}
        />
      </div>
      <div className="component-wrapper-notes">
        <NotesList notes={filteredNotes} onNoteClick={handleNoteClick} />
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
