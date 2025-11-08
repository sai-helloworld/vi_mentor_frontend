import React, { useState } from "react";
import pdf_image from "../assets/pdf.png";
import "../styles/notes.css";

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
    <div class="notes_inputs_container">
      <h2>📚 Download Class Notes</h2>

      <input
        type="text"
        placeholder="Enter Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        class_name="notes_class_input"
      />

      <input
        type="text"
        placeholder="Enter Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        class="notes_subject_name"
      />

      <button onClick={fetchNotes}>Fetch Notes</button>

      <div>
        {message && <p>{message}</p>}

        {notes.length > 0 && (
          <ul id="notesList">
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
