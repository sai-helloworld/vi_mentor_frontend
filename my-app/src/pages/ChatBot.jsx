
// import React, { useEffect, useState } from "react";
// import "../styles/ChatBot.css";

// const ChatBot = () => {
//   const rollNumber = localStorage.getItem("student_roll_number");

//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");

//   const [sessions, setSessions] = useState([]);
//   const [currentSession, setCurrentSession] = useState(null);

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ---------------------------
//   // 1️⃣ Fetch Subjects
//   // ---------------------------
//   useEffect(() => {
//     if (!rollNumber) return;

//     const fetchSubjects = async () => {
//       try {
//         const res = await fetch(
//           `http://127.0.0.1:8000/api/student/${rollNumber}/subjects/`
//         );
//         const data = await res.json();
//         if (res.ok) setSubjects(data.subjects);
//       } catch (err) {
//         console.error("Failed to load subjects");
//       }
//     };

//     fetchSubjects();
//   }, [rollNumber]);

//   // ---------------------------
//   // 2️⃣ Fetch Chat Sessions
//   // ---------------------------
//   const fetchSessions = async () => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/chat/list/${rollNumber}/`
//       );
//       const data = await res.json();
//       if (res.ok) setSessions(data.sessions);
//     } catch (err) {
//       console.error("Failed to load sessions");
//     }
//   };

//   useEffect(() => {
//     if (rollNumber) fetchSessions();
//   }, [rollNumber]);

//   // ---------------------------
//   // 3️⃣ Create New Chat
//   // ---------------------------
//   const createNewChat = async () => {
//     if (!selectedSubject) return alert("Select a subject first");

//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat/new/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           roll_number: rollNumber,
//           subject_id: selectedSubject,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setCurrentSession(data.session_id);
//         setMessages([]);
//         fetchSessions();
//       }
//     } catch (err) {
//       console.error("Failed to create chat");
//     }
//   };

//   // ---------------------------
//   // 4️⃣ Load Chat History
//   // ---------------------------
//   const loadChatHistory = async (sessionId) => {
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/chat/history/${sessionId}/`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setMessages(
//           data.messages.map((msg) => ({
//             sender: msg.sender === "USER" ? "user" : "bot",
//             text: msg.message,
//           }))
//         );
//         setCurrentSession(sessionId);
//       }
//     } catch (err) {
//       console.error("Failed to load chat history");
//     }
//   };

//   // ---------------------------
//   // 5️⃣ Send Message
//   // ---------------------------
//   const handleSend = async () => {
//     if (!input.trim() || !currentSession) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat/ask/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           session_id: currentSession,
//           question: input,
//         }),
//       });

//       const data = await res.json();

//       const botMessage = {
//         sender: "bot",
//         text: data.answer || "Error occurred",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//       fetchSessions();
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Server error." },
//       ]);
//     }

//     setInput("");
//     setLoading(false);
//   };

//   // ---------------------------
//   // UI
//   // ---------------------------
//   return (
//     <div className="chat-layout">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h3>Your Subjects</h3>

//         <select
//           className="subject-select"
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//         >
//           <option value="">Select Subject</option>
//           {subjects.map((sub) => (
//             <option key={sub.id} value={sub.id}>
//               {sub.name}
//             </option>
//           ))}
//         </select>

//         <button className="new-chat-btn" onClick={createNewChat}>
//           + New Chat
//         </button>

//         <h4>Previous Chats</h4>
//         <div className="session-list">
//           {sessions.map((session) => (
//             <div
//               key={session.session_id}
//               className="session-item"
//               onClick={() => loadChatHistory(session.session_id)}
//             >
//               {session.title}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="chatbot-container">
//         <h2>Academic Assistant</h2>

//         <div className="chat-window">
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.sender}`}>
//               <span>{msg.text}</span>
//             </div>
//           ))}

//           {loading && (
//             <div className="message bot">
//               <span>Typing...</span>
//             </div>
//           )}
//         </div>

//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Ask your doubt..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;









import React, { useEffect, useState, useRef } from "react";
import "../styles/ChatBot.css";

const ChatBot = () => {
  const rollNumber = localStorage.getItem("student_roll_number");
  const messagesEndRef = useRef(null);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Auto Scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // 1️⃣ Fetch Subjects
  useEffect(() => {
    if (!rollNumber) return;

    const fetchSubjects = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/student/${rollNumber}/subjects/`
        );
        const data = await res.json();
        if (res.ok) setSubjects(data.subjects);
      } catch (err) {
        console.error("Failed to load subjects");
      }
    };

    fetchSubjects();
  }, [rollNumber]);

  // 2️⃣ Fetch Sessions
  const fetchSessions = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/chat/list/${rollNumber}/`
      );
      const data = await res.json();
      if (res.ok) setSessions(data.sessions);
    } catch (err) {
      console.error("Failed to load sessions");
    }
  };

  useEffect(() => {
    if (rollNumber) fetchSessions();
  }, [rollNumber]);

  // 3️⃣ Create New Chat
  const createNewChat = async () => {
    if (!selectedSubject) {
      alert("Please select a subject first");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/new/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roll_number: rollNumber,
          subject_id: selectedSubject,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentSession(data.session_id);
        setMessages([]);
        fetchSessions();
      }
    } catch (err) {
      console.error("Failed to create chat");
    }
  };

  // 4️⃣ Load Chat History
  const loadChatHistory = async (sessionId) => {
    setCurrentSession(sessionId);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/chat/history/${sessionId}/`
      );
      const data = await res.json();

      if (res.ok) {
        setMessages(
          data.messages.map((msg) => ({
            sender: msg.sender === "USER" ? "user" : "bot",
            text: msg.message,
            followUps: [], // history doesn't contain follow-ups
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load chat history");
    }
  };

  // 5️⃣ Send Message (supports follow-up click)
  const handleSend = async (overrideQuestion = null) => {
    const questionToSend = overrideQuestion || input;

    if (!questionToSend.trim() || !currentSession) return;

    const userMessage = {
      sender: "user",
      text: questionToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: currentSession,
          question: questionToSend,
        }),
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "Error occurred",
        followUps: data.follow_up_questions || [],
      };

      setMessages((prev) => [...prev, botMessage]);
      fetchSessions();
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Try again.", followUps: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Follow-Up Click
  const handleFollowUpClick = (question) => {
    handleSend(question);
  };

  return (
    <div className="chat-layout">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>🎓 AI Tutor</h3>
        </div>

        <div className="new-chat-section">
          <select
            className="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select a Subject...</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          <button
            className="new-chat-btn"
            onClick={createNewChat}
            disabled={!selectedSubject}
          >
            <span>+</span> New Chat
          </button>
        </div>

        <div className="session-list-container">
          <h4>Recent Conversations</h4>

          <div className="session-list">
            {sessions.length === 0 && (
              <p className="no-sessions">No history yet.</p>
            )}

            {sessions.map((session) => (
              <div
                key={session.session_id}
                className={`session-item ${
                  currentSession === session.session_id ? "active" : ""
                }`}
                onClick={() => loadChatHistory(session.session_id)}
              >
                <span className="session-icon">💬</span>
                <span className="session-title">
                  {session.title || "Untitled Chat"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* --- MAIN CHAT AREA --- */}
      <main className="chatbot-container">
        {!currentSession ? (
          <div className="empty-state">
            <div className="empty-icon">🤖</div>
            <h2>Welcome to your Academic Assistant</h2>
            <p>
              Select a subject from the sidebar and start a new chat to clear
              your doubts.
            </p>
          </div>
        ) : (
          <>
            <div className="chat-header">
              <h2>Current Discussion</h2>
            </div>

            <div className="chat-window">
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.sender}`}>
                  <div className="message-bubble">{msg.text}</div>

                  {/* 🔹 Follow-Up Buttons */}
                  {msg.sender === "bot" &&
                    msg.followUps &&
                    msg.followUps.length > 0 && (
                      <div className="followup-container">
                        {msg.followUps.map((question, i) => (
                          <button
                            key={i}
                            className="followup-btn"
                            onClick={() => handleFollowUpClick(question)}
                            disabled={loading}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {loading && (
                <div className="message-wrapper bot">
                  <div className="message-bubble typing">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSend()
                  }
                  disabled={loading}
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                >
                  ➤
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ChatBot;
