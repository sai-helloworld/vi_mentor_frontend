import React, { useState } from "react";
import pdf_image from "../assets/pdf.png";
const Notes = () => {
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  const fetchNotes = async () => {
    setMessage("");
    setNotes([]);

    if (!className.trim() || !subjectName.trim()) {
      setMessage("❗ Please enter both class and subject names.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/notes/?className=${className}&subjectName=${subjectName}`
      );

      if (!response.ok)
        throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();

      if (data.length === 0) {
        setMessage("📭 No notes found for this class and subject.");
      } else {
        setNotes(data);
      }
    } catch (error) {
      setMessage(`⚠️ Failed to fetch notes: ${error.message}`);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h2>📚 Download Class Notes</h2>

      <input
        type="text"
        placeholder="Enter Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        style={{
          margin: "0.5rem 0",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <input
        type="text"
        placeholder="Enter Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        style={{
          margin: "0.5rem 0",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <button
        onClick={fetchNotes}
        style={{
          margin: "0.5rem 0",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        Fetch Notes
      </button>

      <div id="notesList" style={{ marginTop: "1rem" }}>
        {message && <p>{message}</p>}

        {notes.length > 0 && (
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              listStyle: "none",
              padding: "0",
            }}
          >
            {notes.map((note) => (
              <li key={note.id} style={{ textAlign: "center", width: "120px" }}>
                <a
                  href={`http://127.0.0.1:8000/download/${note.id}/`}
                  download
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <img
                    src={pdf_image}
                    alt="PDF icon"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginBottom: "8px",
                    }}
                  />
                  <div style={{ fontSize: "0.9rem" }}>{note.filename}</div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notes;
