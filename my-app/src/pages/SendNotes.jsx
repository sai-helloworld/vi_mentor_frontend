
// import React, { useState, useEffect } from "react";

// export default function SendNotes() {
//   const [assignments, setAssignments] = useState([]);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [files, setFiles] = useState([]); // Changed to array
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);

//   // 1. Fetch Assignments
//   useEffect(() => {
//     const teacherId = localStorage.getItem("teacher_id");

//     if (!teacherId) {
//       setMessage({ text: "Please login as a teacher first.", type: "error" });
//       setLoading(false);
//       return;
//     }

//     const fetchAssignments = async () => {
//       try {
//         const res = await fetch(`http://localhost:8000/api/teacher/${teacherId}/assignments/`);
//         const data = await res.json();

//         if (res.ok && data.assignments) {
//           setAssignments(data.assignments);
//           if (data.assignments.length > 0) {
//             setSelectedAssignment(data.assignments[0]);
//           }
//         } else {
//           setMessage({ text: "No classes assigned found.", type: "error" });
//         }
//       } catch (err) {
//         setMessage({ text: "Failed to load class details.", type: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   // 2. Handle File Selection (Append new files to existing list)
//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//       setMessage({ text: "", type: "" });
//     }
//   };

//   // 3. Remove a specific file from the list
//   const removeFile = (indexToRemove) => {
//     setFiles(files.filter((_, index) => index !== indexToRemove));
//   };

//   const handleAssignmentChange = (e) => {
//     setSelectedAssignment(assignments[e.target.value]);
//   };

//   // 4. Submit - Loop through files and upload individually
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ text: "", type: "" });

//     if (!selectedAssignment || files.length === 0) {
//       setMessage({ text: "Please select a class and at least one PDF.", type: "error" });
//       return;
//     }

//     setIsUploading(true);
//     const classId = selectedAssignment.section_id;
//     const subjectName = selectedAssignment.subject_name;
    
//     let successCount = 0;
//     let failCount = 0;

//     // Loop through every file and upload it
//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("pdf_file", file);

//       try {
//         const res = await fetch(
//           `http://127.0.0.1:8000/upload/${classId}/${encodeURIComponent(subjectName)}/`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (res.ok) {
//           successCount++;
//         } else {
//           failCount++;
//         }
//       } catch (err) {
//         failCount++;
//       }
//     }

//     setIsUploading(false);

//     if (failCount === 0) {
//         setMessage({ text: `✅ All ${successCount} files uploaded successfully!`, type: "success" });
//         setFiles([]); // Clear list on full success
//     } else {
//         setMessage({ text: `⚠️ Uploaded ${successCount} files, but ${failCount} failed.`, type: "error" });
//     }
//   };

//   // --- Styles ---
//   const styles = {
//     container: {
//       maxWidth: "600px",
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
//       marginBottom: "25px",
//       color: "#ffffff",
//       borderBottom: "1px solid #333",
//       paddingBottom: "15px",
//     },
//     label: {
//       display: "block",
//       marginBottom: "8px",
//       fontWeight: "600",
//       color: "#aaa",
//       fontSize: "0.9rem",
//     },
//     select: {
//       width: "100%",
//       padding: "12px",
//       marginBottom: "25px",
//       backgroundColor: "#333",
//       border: "1px solid #444",
//       borderRadius: "6px",
//       color: "white",
//       fontSize: "1rem",
//       outline: "none",
//     },
//     fileArea: {
//       border: "2px dashed #444",
//       padding: "20px",
//       textAlign: "center",
//       borderRadius: "8px",
//       backgroundColor: "#2a2a2a",
//       marginBottom: "20px",
//       cursor: "pointer",
//     },
//     fileInput: { display: "none" },
//     fileLabel: {
//       cursor: "pointer",
//       color: "#6366f1",
//       fontWeight: "bold",
//       display: "block",
//     },
//     fileList: {
//       listStyle: "none",
//       padding: 0,
//       margin: "0 0 25px 0",
//     },
//     fileItem: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       backgroundColor: "#333",
//       padding: "10px",
//       borderRadius: "6px",
//       marginBottom: "8px",
//       fontSize: "0.9rem",
//     },
//     removeBtn: {
//       background: "none",
//       border: "none",
//       color: "#ef4444",
//       cursor: "pointer",
//       fontWeight: "bold",
//       fontSize: "1.2rem",
//     },
//     button: {
//       width: "100%",
//       padding: "14px",
//       backgroundColor: isUploading ? "#4b5563" : "#10b981",
//       color: "white",
//       border: "none",
//       borderRadius: "6px",
//       fontSize: "1.1rem",
//       fontWeight: "bold",
//       cursor: isUploading ? "wait" : "pointer",
//       transition: "background 0.2s",
//     },
//     message: {
//       marginTop: "20px",
//       padding: "12px",
//       borderRadius: "6px",
//       textAlign: "center",
//       fontWeight: "500",
//       backgroundColor: message.type === "error" ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)",
//       color: message.type === "error" ? "#fca5a5" : "#6ee7b7",
//       border: `1px solid ${message.type === "error" ? "#ef4444" : "#10b981"}`,
//     }
//   };

//   if (loading) return <div style={{...styles.container, textAlign: "center"}}>Loading classes...</div>;

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Upload Class Notes</h2>

//       <form onSubmit={handleSubmit}>
//         <label style={styles.label}>Select Class & Subject</label>
//         <select style={styles.select} onChange={handleAssignmentChange}>
//           {assignments.map((assign, index) => (
//             <option key={index} value={index}>
//               {assign.section_name} — {assign.subject_name}
//             </option>
//           ))}
//         </select>

//         <label style={styles.label}>Select Notes (PDF)</label>
//         <div style={styles.fileArea}>
//           <input
//             type="file"
//             id="pdf_files"
//             accept="application/pdf"
//             multiple // ✅ Allows multiple files
//             onChange={handleFileChange}
//             style={styles.fileInput}
//           />
//           <label htmlFor="pdf_files" style={styles.fileLabel}>
//             + Add Files
//           </label>
//         </div>

//         {/* Selected Files List */}
//         {files.length > 0 && (
//           <ul style={styles.fileList}>
//             {files.map((file, index) => (
//               <li key={index} style={styles.fileItem}>
//                 <span>📄 {file.name}</span>
//                 <button 
//                   type="button" 
//                   onClick={() => removeFile(index)} 
//                   style={styles.removeBtn}
//                   title="Remove file"
//                 >
//                   &times;
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}

//         <button 
//           type="submit" 
//           style={styles.button}
//           disabled={isUploading || files.length === 0}
//         >
//           {isUploading ? "Uploading..." : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
//         </button>
//       </form>

//       {message.text && <div style={styles.message}>{message.text}</div>}
//     </div>
//   );
// }







// import React, { useState, useEffect } from "react";

// export default function SendNotes() {
//   const [assignments, setAssignments] = useState([]);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [files, setFiles] = useState([]);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);

//   // 1. Fetch teacher assignments
//   useEffect(() => {
//     const teacherId = localStorage.getItem("teacher_id");

//     if (!teacherId) {
//       setMessage({ text: "Please login as a teacher first.", type: "error" });
//       setLoading(false);
//       return;
//     }

//     const fetchAssignments = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:8000/api/teacher/${teacherId}/assignments/`
//         );
//         const data = await res.json();

//         if (res.ok && data.assignments) {
//           setAssignments(data.assignments);
//           if (data.assignments.length > 0) {
//             setSelectedAssignment(data.assignments[0]);
//           }
//         } else {
//           setMessage({ text: "No assignments found.", type: "error" });
//         }
//       } catch {
//         setMessage({ text: "Failed to load class details.", type: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   // 2. File selection
//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
//       setMessage({ text: "", type: "" });
//     }
//   };

//   const removeFile = (indexToRemove) => {
//     setFiles(files.filter((_, index) => index !== indexToRemove));
//   };

//   const handleAssignmentChange = (e) => {
//     setSelectedAssignment(assignments[e.target.value]);
//   };

//   // 3. Upload handler (UPDATED)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ text: "", type: "" });

//     if (!selectedAssignment || files.length === 0) {
//       setMessage({ text: "Please select a class and at least one PDF.", type: "error" });
//       return;
//     }

//     const teacherId = localStorage.getItem("teacher_id");

//     // 🔁 CHANGED: use IDs, not names
//     const subjectId = selectedAssignment.subject_id;
//     const sectionId = selectedAssignment.section_id;

//     setIsUploading(true);
//     let successCount = 0;
//     let failCount = 0;

//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("pdf_file", file);

//       try {
//         const res = await fetch(
//           `http://127.0.0.1:8000/upload/${teacherId}/${subjectId}/${sectionId}/`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (res.ok) {
//           successCount++;
//         } else {
//           failCount++;
//         }
//       } catch {
//         failCount++;
//       }
//     }

//     setIsUploading(false);

//     if (failCount === 0) {
//       setMessage({
//         text: `✅ All ${successCount} file(s) uploaded successfully!`,
//         type: "success",
//       });
//       setFiles([]);
//     } else {
//       setMessage({
//         text: `⚠️ Uploaded ${successCount} file(s), ${failCount} failed.`,
//         type: "error",
//       });
//     }
//   };

//   if (loading) {
//     return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading classes...</div>;
//   }

//   return (
//     <div style={{ maxWidth: "600px", margin: "40px auto" }}>
//       <h2>Upload Class Notes</h2>

//       <form onSubmit={handleSubmit}>
//         <label>Select Class & Subject</label>
//         <select onChange={handleAssignmentChange}>
//           {assignments.map((assign, index) => (
//             <option key={index} value={index}>
//               {assign.section_name} — {assign.subject_name}
//             </option>
//           ))}
//         </select>

//         <br /><br />

//         <input
//           type="file"
//           accept="application/pdf"
//           multiple
//           onChange={handleFileChange}
//         />

//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>
//               {file.name}
//               <button type="button" onClick={() => removeFile(index)}>
//                 ❌
//               </button>
//             </li>
//           ))}
//         </ul>

//         <button type="submit" disabled={isUploading}>
//           {isUploading ? "Uploading..." : "Upload Notes"}
//         </button>
//       </form>

//       {message.text && <p>{message.text}</p>}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";

export default function SendNotes() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Fetch Assignments
  useEffect(() => {
    const teacherId = localStorage.getItem("teacher_id");

    if (!teacherId) {
      setMessage({ text: "Please login as a teacher first.", type: "error" });
      setLoading(false);
      return;
    }

    const fetchAssignments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/teacher/${teacherId}/assignments/`
        );
        const data = await res.json();

        if (res.ok && data.assignments) {
          setAssignments(data.assignments);
          if (data.assignments.length > 0) {
            setSelectedAssignment(data.assignments[0]);
          }
        } else {
          setMessage({ text: "No classes assigned found.", type: "error" });
        }
      } catch {
        setMessage({ text: "Failed to load class details.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // 2. File Selection
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
      setMessage({ text: "", type: "" });
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleAssignmentChange = (e) => {
    setSelectedAssignment(assignments[e.target.value]);
  };

  // 3. Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!selectedAssignment || files.length === 0) {
      setMessage({ text: "Please select a class and at least one PDF.", type: "error" });
      return;
    }

    const teacherId = localStorage.getItem("teacher_id");
    const subjectId = selectedAssignment.subject_id;
    const sectionId = selectedAssignment.section_id;

    setIsUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
      const formData = new FormData();
      formData.append("pdf_file", file);

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/upload/${teacherId}/${subjectId}/${sectionId}/`,
          {
            method: "POST",
            body: formData,
          }
        );

        res.ok ? successCount++ : failCount++;
      } catch {
        failCount++;
      }
    }

    setIsUploading(false);

    if (failCount === 0) {
      setMessage({
        text: `✅ All ${successCount} files uploaded successfully!`,
        type: "success",
      });
      setFiles([]);
    } else {
      setMessage({
        text: `⚠️ Uploaded ${successCount} files, ${failCount} failed.`,
        type: "error",
      });
    }
  };

  // --- Styles (UNCHANGED) ---
  const styles = {
    container: {
      maxWidth: "600px",
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
      marginBottom: "25px",
      color: "#ffffff",
      borderBottom: "1px solid #333",
      paddingBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#aaa",
      fontSize: "0.9rem",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "25px",
      backgroundColor: "#333",
      border: "1px solid #444",
      borderRadius: "6px",
      color: "white",
      fontSize: "1rem",
      outline: "none",
    },
    fileArea: {
      border: "2px dashed #444",
      padding: "20px",
      textAlign: "center",
      borderRadius: "8px",
      backgroundColor: "#2a2a2a",
      marginBottom: "20px",
      cursor: "pointer",
    },
    fileInput: { display: "none" },
    fileLabel: {
      cursor: "pointer",
      color: "#6366f1",
      fontWeight: "bold",
      display: "block",
    },
    fileList: {
      listStyle: "none",
      padding: 0,
      margin: "0 0 25px 0",
    },
    fileItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#333",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "8px",
      fontSize: "0.9rem",
    },
    removeBtn: {
      background: "none",
      border: "none",
      color: "#ef4444",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: isUploading ? "#4b5563" : "#10b981",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      cursor: isUploading ? "wait" : "pointer",
    },
    message: {
      marginTop: "20px",
      padding: "12px",
      borderRadius: "6px",
      textAlign: "center",
      fontWeight: "500",
      backgroundColor:
        message.type === "error"
          ? "rgba(239, 68, 68, 0.2)"
          : "rgba(16, 185, 129, 0.2)",
      color: message.type === "error" ? "#fca5a5" : "#6ee7b7",
      border: `1px solid ${
        message.type === "error" ? "#ef4444" : "#10b981"
      }`,
    },
  };

  if (loading)
    return (
      <div style={{ ...styles.container, textAlign: "center" }}>
        Loading classes...
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Upload Class Notes</h2>

      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Select Class & Subject</label>
        <select style={styles.select} onChange={handleAssignmentChange}>
          {assignments.map((assign, index) => (
            <option key={index} value={index}>
              {assign.section_name} — {assign.subject_name}
            </option>
          ))}
        </select>

        <label style={styles.label}>Select Notes (PDF)</label>
        <div style={styles.fileArea}>
          <input
            type="file"
            id="pdf_files"
            // accept="application/pdf"
            accept=".pdf,.docx"
            multiple
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          <label htmlFor="pdf_files" style={styles.fileLabel}>
            + Add Files
          </label>
        </div>

        {files.length > 0 && (
          <ul style={styles.fileList}>
            {files.map((file, index) => (
              <li key={index} style={styles.fileItem}>
                <span>📄 {file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  style={styles.removeBtn}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          style={styles.button}
          disabled={isUploading || files.length === 0}
        >
          {isUploading
            ? "Uploading..."
            : `Upload ${files.length} File${files.length !== 1 ? "s" : ""}`}
        </button>
      </form>

      {message.text && <div style={styles.message}>{message.text}</div>}
    </div>
  );
}
