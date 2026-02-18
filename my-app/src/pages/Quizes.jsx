// import React, { useState, useEffect } from "react";

// export default function Quizes({ role, email }) {
//   const [teacherId, setTeacherId] = useState(null);
//   const [quizId, setQuizId] = useState(null);

//   const [quizForm, setQuizForm] = useState({
//     title: "",
//     description: "",
//     subject_id: "",
//     section_id: "",
//   });

//   const [questionForm, setQuestionForm] = useState({
//     text: "",
//     option_a: "",
//     option_b: "",
//     option_c: "",
//     option_d: "",
//     correct_option: "",
//   });

//   const [quizMessage, setQuizMessage] = useState("");
//   const [questionMessage, setQuestionMessage] = useState("");

//   // 🔍 Fetch teacher ID if role is faculty
//   useEffect(() => {
//     const fetchTeacherId = async () => {
//       if (role === "faculty" && email) {
//         try {
//           const res = await fetch(`http://localhost:8000/api/teacher/id/?email=${email}`);
//           const result = await res.json();
//           if (res.ok) {
//             setTeacherId(result.teacher_id);
//           } else {
//             setQuizMessage(`❌ ${result.error || "Teacher not found."}`);
//           }
//         } catch (err) {
//           setQuizMessage("❌ Server error while fetching teacher ID.");
//         }
//       }
//     };
//     fetchTeacherId();
//   }, [role, email]);

//   // Handle quiz form input
//   const handleQuizChange = (e) => {
//     setQuizForm({ ...quizForm, [e.target.id]: e.target.value });
//   };

//   // Handle question form input
//   const handleQuestionChange = (e) => {
//     setQuestionForm({ ...questionForm, [e.target.id]: e.target.value });
//   };

//   // Submit quiz
//   const handleQuizSubmit = async (e) => {
//     e.preventDefault();
//     setQuizMessage("");

//     const payload = {
//       ...quizForm,
//       teacher_id: teacherId,
//       subject_id: parseInt(quizForm.subject_id),
//       section_id: parseInt(quizForm.section_id),
//     };

//     try {
//       const res = await fetch("http://localhost:8000/api/quiz/create/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setQuizId(result.quiz_id);
//         setQuizMessage(`✅ Quiz created! ID: ${result.quiz_id}`);
//       } else {
//         setQuizMessage(`❌ ${result.error || "Quiz creation failed."}`);
//       }
//     } catch (err) {
//       setQuizMessage("❌ Server error.");
//     }
//   };

//   // Submit question
//   const handleQuestionSubmit = async (e) => {
//     e.preventDefault();
//     setQuestionMessage("");

//     const payload = {
//       quiz_id: quizId,
//       ...questionForm,
//       correct_option: questionForm.correct_option.toUpperCase(),
//     };

//     try {
//       const res = await fetch("http://localhost:8000/api/quiz/add-question/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setQuestionMessage(`✅ Question added! ID: ${result.question_id}`);
//         setQuestionForm({
//           text: "",
//           option_a: "",
//           option_b: "",
//           option_c: "",
//           option_d: "",
//           correct_option: "",
//         });
//       } else {
//         setQuestionMessage(`❌ ${result.error || "Failed to add question."}`);
//       }
//     } catch (err) {
//       setQuestionMessage("❌ Server error.");
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Arial", padding: "20px", backgroundColor: "black", color: "white", maxWidth: "700px", margin: "auto" }}>
//       <h2>Create a Quiz</h2>

//       {role === "faculty" && teacherId && (
//         <p><strong>Teacher ID:</strong> {teacherId}</p>
//       )}

//       <form onSubmit={handleQuizSubmit}>
//         <input type="text" id="title" placeholder="Title" value={quizForm.title} onChange={handleQuizChange} required />
//         <textarea id="description" placeholder="Description" value={quizForm.description} onChange={handleQuizChange} required />
//         <input type="number" id="subject_id" placeholder="Subject ID" value={quizForm.subject_id} onChange={handleQuizChange} required />
//         <input type="number" id="section_id" placeholder="Section ID" value={quizForm.section_id} onChange={handleQuizChange} required />
//         <button type="submit" disabled={!teacherId}>Create Quiz</button>
//       </form>

//       {quizMessage && <p>{quizMessage}</p>}

//       {quizId && (
//         <div style={{ marginTop: "30px" }}>
//           <h3>Add Questions to Quiz #{quizId}</h3>
//           <form onSubmit={handleQuestionSubmit}>
//             <textarea id="text" placeholder="Question Text" value={questionForm.text} onChange={handleQuestionChange} required />
//             <input type="text" id="option_a" placeholder="Option A" value={questionForm.option_a} onChange={handleQuestionChange} required />
//             <input type="text" id="option_b" placeholder="Option B" value={questionForm.option_b} onChange={handleQuestionChange} required />
//             <input type="text" id="option_c" placeholder="Option C" value={questionForm.option_c} onChange={handleQuestionChange} required />
//             <input type="text" id="option_d" placeholder="Option D" value={questionForm.option_d} onChange={handleQuestionChange} required />
//             <input type="text" id="correct_option" placeholder="Correct Option (A/B/C/D)" value={questionForm.correct_option} onChange={handleQuestionChange} required />
//             <button type="submit">Add Question</button>
//           </form>
//           {questionMessage && <p>{questionMessage}</p>}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function QuizManager() {
  const [teacherId, setTeacherId] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Quiz State
  const [quizId, setQuizId] = useState(null);
  const [isQuizCreated, setIsQuizCreated] = useState(false);
  
  // Question State
  const [questionCount, setQuestionCount] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  // Forms
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    selected_assignment: "", // Stores "subjectId-sectionId"
  });

  const [questionForm, setQuestionForm] = useState({
    text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "A",
  });

  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'

  // 1. Initial Load: Get Teacher ID from LocalStorage & Fetch Assignments
  useEffect(() => {
    const storedTeacherId = localStorage.getItem("teacher_id");
    
    if (storedTeacherId) {
      setTeacherId(storedTeacherId);
      fetchAssignments(storedTeacherId);
    } else {
      setLoading(false);
      setMessage({ text: "Please login as a teacher first.", type: "error" });
    }
  }, []);

  const fetchAssignments = async (tid) => {
    try {
      const res = await fetch(`http://localhost:8000/api/teacher/${tid}/assignments/`);
      const data = await res.json();
      
      if (res.ok && data.assignments) {
        setAssignments(data.assignments);
        // Auto-select the first assignment if available
        if (data.assignments.length > 0) {
          const first = data.assignments[0];
          setQuizForm(prev => ({
            ...prev,
            selected_assignment: `${first.subject_id}-${first.section_id}`
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Inputs
  const handleQuizChange = (e) => {
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setQuestionForm({ ...questionForm, [e.target.name]: e.target.value });
  };

  // 3. Create Quiz (Header)
  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!quizForm.selected_assignment) {
      setMessage({ text: "Please select a subject/section.", type: "error" });
      return;
    }

    const [subjId, sectId] = quizForm.selected_assignment.split("-");

    const payload = {
      title: quizForm.title,
      description: quizForm.description,
      teacher_id: teacherId,
      subject_id: parseInt(subjId),
      section_id: parseInt(sectId),
    };

    try {
      const res = await fetch("http://localhost:8000/api/quiz/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok) {
        setQuizId(result.quiz_id);
        setIsQuizCreated(true);
        setMessage({ text: "Quiz initialized! Now add exactly 10 questions.", type: "success" });
      } else {
        setMessage({ text: result.error || "Failed to create quiz.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Server error.", type: "error" });
    }
  };

  // 4. Add Question (Loop 10 times)
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const payload = {
      quiz_id: quizId,
      ...questionForm,
      correct_option: questionForm.correct_option,
    };

    try {
      const res = await fetch("http://localhost:8000/api/quiz/add-question/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok) {
        if (questionCount < 10) {
          // Prepare for next question
          setQuestionCount(prev => prev + 1);
          setQuestionForm({
            text: "",
            option_a: "",
            option_b: "",
            option_c: "",
            option_d: "",
            correct_option: "A",
          });
          setMessage({ text: `Question ${questionCount} saved. Next...`, type: "success" });
        } else {
          // Finished
          setIsFinished(true);
          setMessage({ text: "All 10 questions added successfully!", type: "success" });
        }
      } else {
        setMessage({ text: result.error || "Failed to add question.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Server error.", type: "error" });
    }
  };

  const resetProcess = () => {
    setIsQuizCreated(false);
    setIsFinished(false);
    setQuizId(null);
    setQuestionCount(1);
    setQuizForm(prev => ({ ...prev, title: "", description: "" }));
    setMessage({ text: "", type: "" });
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
    section: {
      backgroundColor: "#2a2a2a",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
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
      marginBottom: "20px",
      backgroundColor: "#333",
      border: "1px solid #444",
      borderRadius: "6px",
      color: "white",
      fontSize: "1rem",
      boxSizing: "border-box", // Important for padding
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      backgroundColor: "#333",
      border: "1px solid #444",
      borderRadius: "6px",
      color: "white",
      fontSize: "1rem",
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
    progressBar: {
      height: "10px",
      backgroundColor: "#444",
      borderRadius: "5px",
      marginBottom: "20px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#10b981", // Emerald
      width: `${(questionCount / 10) * 100}%`,
      transition: "width 0.3s ease",
    },
    message: {
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "20px",
      textAlign: "center",
      backgroundColor: message.type === "error" ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)",
      color: message.type === "error" ? "#fca5a5" : "#6ee7b7",
      border: `1px solid ${message.type === "error" ? "#ef4444" : "#10b981"}`,
    }
  };

  if (loading) return <div style={{...styles.container, textAlign: "center"}}>Loading assignment details...</div>;

  // --- Render: Success State ---
  if (isFinished) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2 style={{ color: "#10b981", fontSize: "3rem", margin: 0 }}>✓</h2>
          <h1>Quiz Completed!</h1>
          <p>The quiz has been created with 10 questions.</p>
          <button 
            style={{...styles.button, backgroundColor: "#333", marginTop: "20px"}} 
            onClick={resetProcess}
          >
            Create Another Quiz
          </button>
        </div>
      </div>
    );
  }

  // --- Render: Main Forms ---
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        {isQuizCreated ? `Adding Questions (Quiz ID: ${quizId})` : "Create New Quiz"}
      </h2>

      {message.text && <div style={styles.message}>{message.text}</div>}

      {/* STEP 1: QUIZ META DATA */}
      {!isQuizCreated ? (
        <form onSubmit={handleCreateQuiz} style={styles.section}>
          <label style={styles.label}>Select Class & Subject</label>
          <select 
            name="selected_assignment" 
            style={styles.select} 
            value={quizForm.selected_assignment} 
            onChange={handleQuizChange}
          >
            {assignments.length === 0 && <option>No classes assigned</option>}
            {assignments.map((assign, idx) => (
              <option key={idx} value={`${assign.subject_id}-${assign.section_id}`}>
                {assign.section_name} - {assign.subject_name}
              </option>
            ))}
          </select>

          <label style={styles.label}>Quiz Title</label>
          <input 
            name="title" 
            style={styles.input} 
            placeholder="e.g., Data Structures Mid-Term" 
            value={quizForm.title} 
            onChange={handleQuizChange} 
            required 
          />

          <label style={styles.label}>Description</label>
          <textarea 
            name="description" 
            style={{...styles.input, height: "100px", resize: "vertical"}} 
            placeholder="Enter instructions..." 
            value={quizForm.description} 
            onChange={handleQuizChange} 
            required 
          />

          <button type="submit" style={styles.button}>Start Quiz Setup</button>
        </form>
      ) : (
        /* STEP 2: ADD 10 QUESTIONS */
        <div style={styles.section}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span>Progress</span>
            <span>{questionCount} / 10</span>
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>

          <form onSubmit={handleAddQuestion}>
            <label style={styles.label}>Question Text</label>
            <textarea 
              name="text" 
              style={{...styles.input, height: "80px"}} 
              placeholder={`Enter question #${questionCount}...`}
              value={questionForm.text} 
              onChange={handleQuestionChange} 
              required 
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={styles.label}>Option A</label>
                <input name="option_a" style={styles.input} value={questionForm.option_a} onChange={handleQuestionChange} required />
              </div>
              <div>
                <label style={styles.label}>Option B</label>
                <input name="option_b" style={styles.input} value={questionForm.option_b} onChange={handleQuestionChange} required />
              </div>
              <div>
                <label style={styles.label}>Option C</label>
                <input name="option_c" style={styles.input} value={questionForm.option_c} onChange={handleQuestionChange} required />
              </div>
              <div>
                <label style={styles.label}>Option D</label>
                <input name="option_d" style={styles.input} value={questionForm.option_d} onChange={handleQuestionChange} required />
              </div>
            </div>

            <label style={styles.label}>Correct Option</label>
            <select 
              name="correct_option" 
              style={styles.select} 
              value={questionForm.correct_option} 
              onChange={handleQuestionChange}
            >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>

            <button type="submit" style={{...styles.button, backgroundColor: "#10b981"}}>
              {questionCount === 10 ? "Finish Quiz" : "Next Question ->"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}