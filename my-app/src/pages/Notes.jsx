

// import React, { useState, useEffect } from "react";
// // Make sure this path is correct for your project
// import pdf_image from "../assets/pdf.png"; 

// const Notes = () => {
//   const [sectionId, setSectionId] = useState("");
//   const [subjectName, setSubjectName] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [studentName, setStudentName] = useState("");

//   // 1. Auto-fill Student Details on Component Mount
//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       const rollNumber = localStorage.getItem("student_roll_number");

//       if (rollNumber) {
//         try {
//           // Fetch student details using the roll number
//           const response = await fetch(`http://127.0.0.1:8000/api/student/${rollNumber}`);
          
//           if (response.ok) {
//             const data = await response.json();
//             // Automatically set the section ID
//             setSectionId(data.section_id); 
//             setStudentName(data.name);
//           }
//         } catch (error) {
//           console.error("Failed to auto-fetch student details", error);
//         }
//       }
//     };

//     fetchStudentDetails();
//   }, []);

//   // 2. Fetch Notes based on Section ID and Subject
//   const fetchNotes = async () => {
//     setMessage("");
//     setNotes([]);
//     setLoading(true);

//     if (!sectionId || !subjectName.trim()) {
//       setMessage("❗ Please enter a subject name.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Assuming your backend expects 'className' to be the section_id based on previous context
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/notes/?className=${sectionId}&subjectName=${encodeURIComponent(subjectName)}`
//       );

//       if (!response.ok) throw new Error(`Server status: ${response.status}`);

//       const data = await response.json();

//       if (data.length === 0) {
//         setMessage("📭 No notes found for this subject.");
//       } else {
//         setNotes(data);
//       }
//     } catch (error) {
//       setMessage(`⚠️ Failed to fetch notes: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Styles ---
//   const styles = {
//     container: {
//       maxWidth: "800px",
//       margin: "40px auto",
//       padding: "30px",
//       backgroundColor: "#1e1e1e",
//       color: "#e0e0e0",
//       borderRadius: "12px",
//       boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
//       fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: "30px",
//       color: "#ffffff",
//       borderBottom: "1px solid #333",
//       paddingBottom: "15px",
//     },
//     inputGroup: {
//       display: "flex",
//       gap: "15px",
//       marginBottom: "25px",
//       flexWrap: "wrap",
//     },
//     inputWrapper: {
//       flex: 1,
//       minWidth: "200px",
//     },
//     label: {
//       display: "block",
//       marginBottom: "8px",
//       fontWeight: "600",
//       color: "#aaa",
//       fontSize: "0.9rem",
//     },
//     input: {
//       width: "100%",
//       padding: "12px",
//       backgroundColor: "#333",
//       border: "1px solid #444",
//       borderRadius: "6px",
//       color: "white",
//       fontSize: "1rem",
//       boxSizing: "border-box",
//     },
//     button: {
//       width: "100%",
//       padding: "14px",
//       backgroundColor: "#6366f1", // Indigo
//       color: "white",
//       border: "none",
//       borderRadius: "6px",
//       fontSize: "1.1rem",
//       fontWeight: "bold",
//       cursor: "pointer",
//       transition: "background 0.2s",
//     },
//     notesGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
//       gap: "20px",
//       marginTop: "30px",
//     },
//     noteCard: {
//       backgroundColor: "#2a2a2a",
//       padding: "15px",
//       borderRadius: "8px",
//       textAlign: "center",
//       transition: "transform 0.2s, background 0.2s",
//       cursor: "pointer",
//       textDecoration: "none",
//       color: "inherit",
//       display: "block",
//       border: "1px solid #333",
//     },
//     pdfIcon: {
//       width: "50px",
//       height: "50px",
//       marginBottom: "10px",
//       objectFit: "contain",
//     },
//     fileName: {
//       fontSize: "0.85rem",
//       wordBreak: "break-word",
//       lineHeight: "1.4",
//     },
//     message: {
//       marginTop: "20px",
//       textAlign: "center",
//       color: "#aaa",
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>
//         📚 Class Notes {studentName && <span style={{fontSize: "0.6em", color: "#6366f1"}}>for {studentName}</span>}
//       </h2>

//       <div style={styles.inputGroup}>
//         {/* Read-only Section ID */}
//         <div style={styles.inputWrapper}>
//           <label style={styles.label}>Your Section ID</label>
//           <input
//             type="text"
//             value={sectionId || "Loading..."}
//             readOnly
//             style={{...styles.input, cursor: "not-allowed", opacity: 0.7}}
//           />
//         </div>

//         {/* Subject Input */}
//         <div style={styles.inputWrapper}>
//           <label style={styles.label}>Subject Name</label>
//           <input
//             type="text"
//             placeholder="e.g. Data Structures"
//             value={subjectName}
//             onChange={(e) => setSubjectName(e.target.value)}
//             style={styles.input}
//           />
//         </div>
//       </div>

//       <button onClick={fetchNotes} style={styles.button} disabled={loading}>
//         {loading ? "Searching..." : "Find Notes"}
//       </button>

//       {/* Message Area */}
//       {message && <p style={styles.message}>{message}</p>}

//       {/* Notes Grid Display */}
//       {notes.length > 0 && (
//         <div style={styles.notesGrid}>
//           {notes.map((note) => (
//             <a
//               key={note.id}
//               href={`http://127.0.0.1:8000/download/${note.id}/`}
//               download
//               style={styles.noteCard}
//               // Adding hover effect via inline styles is tricky, 
//               // usually handled in CSS, but the card structure is solid.
//             >
//               <img
//                 src={pdf_image}
//                 alt="PDF"
//                 style={styles.pdfIcon}
//               />
//               <div style={styles.fileName}>
//                 {note.filename.length > 20 
//                   ? note.filename.substring(0, 18) + "..." 
//                   : note.filename}
//               </div>
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notes;






import React, { useState, useEffect } from "react";
// Make sure this path is correct for your project
import pdf_image from "../assets/pdf.png"; 

const Notes = () => {
  const [sectionId, setSectionId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]); // 📌 New state for subjects dropdown
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");

  // 1. Auto-fill Student Details & Subjects on Component Mount
  useEffect(() => {
    const rollNumber = localStorage.getItem("student_roll_number");

    if (!rollNumber) return; // Exit early if no roll number

    const fetchStudentDetails = async () => {
      try {
        // Fetch student details using the roll number
        const response = await fetch(`http://127.0.0.1:8000/api/student/${rollNumber}`);
        
        if (response.ok) {
          const data = await response.json();
          // Automatically set the section ID
          setSectionId(data.section); 
          setStudentName(data.name);
        }
      } catch (error) {
        console.error("Failed to auto-fetch student details", error);
      }
    };

    // 📌 New function to fetch subjects from your new API
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/student/${rollNumber}/subjects/`);
        
        if (response.ok) {
          const data = await response.json();
          // Your Django backend returns {"subjects": [...]}, so we use data.subjects
          const subjectsList = data.subjects || [];
          setSubjects(subjectsList);
          
          // Automatically select the first subject in the list if it exists
          if (subjectsList.length > 0) {
            setSubjectName(subjectsList[0].name);
          }
        }
      } catch (error) {
        console.error("Failed to fetch subjects list", error);
      }
    };

    fetchStudentDetails();
    fetchSubjects(); // Call the subject fetcher
  }, []);

  // 2. Fetch Notes based on Section ID and Subject
  const fetchNotes = async () => {
    setMessage("");
    setNotes([]);
    setLoading(true);

    if (!sectionId || !subjectName.trim()) {
      setMessage("❗ Please select a subject.");
      setLoading(false);
      return;
    }

    try {
      // Assuming your backend expects 'className' to be the section_id based on previous context
      const response = await fetch(
        `http://127.0.0.1:8000/api/notes/?className=${encodeURIComponent(sectionId)}&subjectName=${encodeURIComponent(subjectName)}`
      );

      if (!response.ok) throw new Error(`Server status: ${response.status}`);

      const data = await response.json();

      if (data.length === 0) {
        setMessage("📭 No notes found for this subject.");
      } else {
        setNotes(data);
      }
    } catch (error) {
      setMessage(`⚠️ Failed to fetch notes: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Styles ---
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#1e1e1e",
      color: "#e0e0e0",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#ffffff",
      borderBottom: "1px solid #333",
      paddingBottom: "15px",
    },
    inputGroup: {
      display: "flex",
      gap: "15px",
      marginBottom: "25px",
      flexWrap: "wrap",
    },
    inputWrapper: {
      flex: 1,
      minWidth: "200px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#aaa",
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#333",
      border: "1px solid #444",
      borderRadius: "6px",
      color: "white",
      fontSize: "1rem",
      boxSizing: "border-box",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#6366f1", // Indigo
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    notesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
      gap: "20px",
      marginTop: "30px",
    },
    noteCard: {
      backgroundColor: "#2a2a2a",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
      transition: "transform 0.2s, background 0.2s",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
      display: "block",
      border: "1px solid #333",
    },
    pdfIcon: {
      width: "50px",
      height: "50px",
      marginBottom: "10px",
      objectFit: "contain",
    },
    fileName: {
      fontSize: "0.85rem",
      wordBreak: "break-word",
      lineHeight: "1.4",
    },
    message: {
      marginTop: "20px",
      textAlign: "center",
      color: "#aaa",
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        📚 Class Notes {studentName && <span style={{fontSize: "0.6em", color: "#6366f1"}}>for {studentName}</span>}
      </h2>

      <div style={styles.inputGroup}>
        {/* Read-only Section ID */}
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Your Section ID</label>
          <input
            type="text"
            value={sectionId || "Loading..."}
            readOnly
            style={{...styles.input, cursor: "not-allowed", opacity: 0.7}}
          />
        </div>

        {/* 📌 Subject Dropdown */}
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Select Subject</label>
          <select
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            style={styles.input}
          >
            {subjects.length === 0 ? (
              <option value="" disabled>Loading subjects...</option>
            ) : (
              subjects.map((sub) => (
                <option key={sub.id} value={sub.name}>
                  {sub.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <button onClick={fetchNotes} style={styles.button} disabled={loading || subjects.length === 0}>
        {loading ? "Searching..." : "Find Notes"}
      </button>

      {/* Message Area */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Notes Grid Display */}
      {notes.length > 0 && (
        <div style={styles.notesGrid}>
          {notes.map((note) => (
            <a
              key={note.id}
              href={`http://127.0.0.1:8000/download/${note.id}/`}
              download
              style={styles.noteCard}
            >
              <img
                src={pdf_image}
                alt="PDF"
                style={styles.pdfIcon}
              />
              <div style={styles.fileName}>
                {note.filename.length > 20 
                  ? note.filename.substring(0, 18) + "..." 
                  : note.filename}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;