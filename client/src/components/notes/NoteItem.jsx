// NoteItem.js
import React, { useState } from "react";
import "../../styles/noteItem.css";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "./Modal";
import { useEffect } from "react";

const NoteItem = ({ note, onClick }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const openPdfModal = (pdf, e) => {
    e.stopPropagation(); // Prevents the event from propagating to the parent div
    setSelectedPdf(pdf);
    setSelectedImage(null);
  };

  const openImageModal = (image, e) => {
    e.stopPropagation(); // Prevents the event from propagating to the parent div
    setSelectedImage(image);
    setSelectedPdf(null);
  };

  const closePdfModal = (e) => {
    e.stopPropagation(); // Prevents the event from propagating to the parent div

    setSelectedPdf(null);
  };

  const closeImageModal = (e) => {
    e.stopPropagation(); // Prevents the event from propagating to the parent div
    setSelectedImage(null);
  };
  console.log(note.attachments);
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  return (
    <div key={note.id} className="note-item" onClick={onClick}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div>
        <strong>User ID:</strong> {note.userId}
      </div>
      <div>
        <strong>Class ID:</strong> {note.classId}
      </div>
      <div>
        <strong>Labels:</strong> {note.labels.join(", ")}
      </div>
      <div>
        <strong>Keywords:</strong> {note.keywords.join(", ")}
      </div>
      {note.attachments && note.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <ul>
            {note.attachments.map((attachment, index) => (
              <li key={index}>
                {attachment.isPdf ? (
                  <button onClick={(e) => openPdfModal(attachment, e)}>
                    Open PDF {index + 1}
                  </button>
                ) : (
                  <button onClick={(e) => openImageModal(attachment, e)}>
                    Open Image {index + 1}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedPdf && (
        <Modal onClose={closePdfModal}>
          <Document
            file={selectedPdf}
            onLoadSuccess={({ numPages }) => console.log(numPages)}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Modal>
      )}

      {selectedImage && (
        <Modal onClose={closeImageModal}>
          <img src={selectedImage} alt="Selected Attachment" />
        </Modal>
      )}
    </div>
  );
};

export default NoteItem;
