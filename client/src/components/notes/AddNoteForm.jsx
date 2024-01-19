import React, { useState } from "react";
import "../../styles/addNoteForm.css";
import axios from "axios";
import Modal from "./Modal";
import { useAuthContext } from "../../hooks/useAuthContext";
const AddNoteForm = ({ onAddNote, onCloseForm, isVisible }) => {
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 999999),
    userId: "",
    title: "",
    content: "",
    classId: "",
    labels: [],
    keywords: [],
    attachments: [],
    attachmentUrl: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAttachmentChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      // No files selected or user canceled file selection
      return;
    }

    const parts = file.name.split(".");
    const fileExtension = "." + parts[parts.length - 1];

    setFormData((prevData) => ({
      ...prevData,
      attachments: file,
    }));

    // Fetch S3 URL for uploading the attachment
    const { url } = await fetch(
      `http://localhost:3001/s3Url?type=${fileExtension}`
    ).then((res) => res.json());

    // Upload the attachment to S3
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    // Save the S3 URL in the state (you may want to store this in the database)
    setFormData((prevData) => ({
      ...prevData,
      attachmentUrl: url.split("?")[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the note
    const response = await axios.post(
      "http://localhost:3001/api/notes/add-note",
      {
        userId: formData.userId,
        ...formData,
      }
    );
    const part = formData.attachments.name.split(".");
    const fileExtension = "." + part[part.length - 1];
    // Create an attachment
    const res = await axios.post(
      "http://localhost:3001/api/notes/add-attachment",
      {
        type: fileExtension,
        url: formData.attachmentUrl,
        userId: formData.userId,
        noteId: formData.id,
      }
    );
    // Reset the form data
    onAddNote(response.data);
    setFormData({
      id: Math.floor(Math.random() * 999999),
      userId: "",
      title: "",
      content: "",
      classId: "",
      labels: [],
      keywords: [],
      attachments: [],
      attachmentUrl: [],
    });

    console.log("Form submitted with data:", formData);
  };

  return isVisible ? (
    <Modal onClose={onCloseForm}>
      <div className="close-button" onClick={onCloseForm}>
        X
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Class ID:
          <input
            type="number"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Labels (comma-separated):
          <input
            type="text"
            name="labels"
            value={formData.labels.join(",")}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                labels: e.target.value.split(",").map((label) => label.trim()),
              }))
            }
          />
        </label>
        <br />

        <label>
          Keywords (comma-separated):
          <input
            type="text"
            name="keywords"
            value={formData.keywords.join(",")}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                keywords: e.target.value
                  .split(",")
                  .map((keyword) => keyword.trim()),
              }))
            }
          />
        </label>
        <br />
        <label>
          Attachments:
          <input
            type="file"
            name="attachments"
            onChange={handleAttachmentChange}
            multiple
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  ) : null;
};

export default AddNoteForm;
