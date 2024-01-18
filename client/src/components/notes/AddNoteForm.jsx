import React, { useState } from "react";
import "../../styles/addNoteForm.css";
import { useEffect } from "react";
import Modal from "./Modal";
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
  });

  const handleAttachmentChange = async (e) => {
    const file = e.target.files[0];

    // // Convert FileList to an array of objects with random keys
    // const attachments = Array.from(files).map((file) => ({
    //   file: file,
    //   type: file.type,
    //   isPdf: file.name.toLowerCase().endsWith(".pdf"),
    //   url: URL.createObjectURL(file),
    // }));

    // // Update state with the array of objects
    setFormData((prevData) => ({
      ...prevData,
      attachments: file,
    }));
    const { url } = await fetch("http://localhost:3001/s3Url").then((res) =>
      res.json()
    );
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];
    console.log(imageUrl);

    // post requst to my server to store any extra data

    const img = document.createElement("img");
    img.src = imageUrl;
    console.log(imageUrl);
    document.body.appendChild(img);

    console.log(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to the server
    onAddNote(formData);
    console.log("Form submitted with data:", formData);
    /* setFormData({
      userId: "",
      title: "",
      content: "",
      classId: "",
      labels: [],
      keywords: [],
      attachments: [],
    }); */
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
