import React, { useState } from "react";

export default function SendNotes() {
  const [classId, setClassId] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("❌ Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/upload/${classId}/${encodeURIComponent(subject)}/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ Note uploaded successfully!");
        setClassId("");
        setSubject("");
        setFile(null);
      } else {
        setMessage(`❌ ${result.error || "Upload failed."}`);
      }
    } catch (err) {
      setMessage("❌ Server error.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Upload Class Notes (PDF)</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="class_id">Class ID:</label>
        <input
          type="text"
          id="class_id"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          required
        />

        <label htmlFor="subject_name">Subject Name:</label>
        <input
          type="text"
          id="subject_name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <label htmlFor="pdf_file">Select PDF File:</label>
        <input
          type="file"
          id="pdf_file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Upload</button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
