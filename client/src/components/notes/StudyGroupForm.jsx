import React, { useState } from "react";
import axios from "axios";
import "../../styles/studyGroupForm.css";

const CreateStudyGroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [userIDs, setUserIDs] = useState("");
  const [noteIds, setNoteIds] = useState("");

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleUserIDsChange = (e) => {
    setUserIDs(e.target.value);
  };

  const handleNoteIdsChange = (e) => {
    setNoteIds(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/notes/add-group",
        {
          groupName,
          userIDs: userIDs.split(",").map((id) => parseInt(id.trim(), 10)),
          noteIds: noteIds.split(",").map((id) => parseInt(id.trim(), 10)),
        }
      );

      console.log("Study group created:", response.data);
    } catch (error) {
      console.error("Error creating study group:", error);
    }
  };

  return (
    <div>
      <h2>Create Study Group</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </label>
        <br />
        <label>
          User IDs (comma-separated):
          <input type="text" value={userIDs} onChange={handleUserIDsChange} />
        </label>
        <br />
        <label>
          Note IDs (comma-separated):
          <input type="text" value={noteIds} onChange={handleNoteIdsChange} />
        </label>
        <br />
        <button type="submit">Create Study Group</button>
      </form>
    </div>
  );
};

export default CreateStudyGroupForm;
