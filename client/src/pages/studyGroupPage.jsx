import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/studyGroupPage.module.css";
import Modal from "../components/notes/Modal";
import CreateStudyGroupForm from "../components/notes/StudyGroupForm";
const StudyGroupPage = ({ groupsId }) => {
  const [groupInfo, setGroupInfo] = useState({});
  const [groupNotes, setGroupNotes] = useState([]);

  const [isCreateFormVisible, setCreateFormVisible] = useState(false);

  const handleCreateFormOpen = () => {
    setCreateFormVisible(true);
  };

  const handleCreateFormClose = () => {
    setCreateFormVisible(false);
  };

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const groupInfoPromises = groupsId.map(async (groupId) => {
          const groupResponse = await axios.get(
            `http://localhost:3001/api/notes/get-group?groupId=${groupId}`
          );
          console.log(groupResponse.data);
          return groupResponse.data;
        });
        const groupNotesPromises = groupsId.map(async (groupId) => {
          const notesResponse = await axios.get(
            `http://localhost:3001/api/notes/get-group-notes?groupId=${groupId}`
          );
          console.log(notesResponse.data);

          return notesResponse.data;
        });

        const groupInfoResults = await Promise.all(groupInfoPromises);
        const groupNotesResults = await Promise.all(groupNotesPromises);

        setGroupInfo(groupInfoResults);
        setGroupNotes(groupNotesResults.flat());
      } catch (error) {
        console.error("Error fetching study group information:", error);
      }
    };

    fetchGroupInfo();
  }, [groupsId]);

  console.log(groupNotes);
  return (
    <div className={styles.container}>
      <button onClick={handleCreateFormOpen}>Create Study Group</button>

      {/* Modal for CreateStudyGroupForm */}
      {isCreateFormVisible && (
        <Modal onClose={handleCreateFormClose}>
          <CreateStudyGroupForm onClose={handleCreateFormClose} />
        </Modal>
      )}
      <h2>Study Group: {groupInfo.groupName}</h2>

      <h3>Group Notes</h3>
      <ul>
        {groupNotes.map((note, index) => (
          <li key={index}>
            <strong>Title:</strong> {note.title}, <strong>Content:</strong>{" "}
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyGroupPage;
