// import React, { useEffect, useState, useRef } from "react";
// import ReactMarkdown from "react-markdown"; // 🔹 Added for markdown parsing
// import "../styles/ChatBot.css";

// const TeacherChatBot =()=>{
//     <>hello world</>
// };

// export default TeacherChatBot;




import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/ChatBot.css";

const TeacherChatBot = () => {
  const teacherId = localStorage.getItem("teacher_id"); // 🔹 Uses teacher_id instead of roll_number
  const messagesEndRef = useRef(null);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  
  // 🔹 Strict Boolean Parsing for LocalStorage (Teacher specific key)
  const [isDebateMode, setIsDebateMode] = useState(() => {
    const saved = localStorage.getItem("teacherIsDebateMode");
    return saved === "true"; 
  });

  useEffect(() => {
    localStorage.setItem("teacherIsDebateMode", isDebateMode);
  }, [isDebateMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // 0️⃣ Fetch Available Models (Centralized API)
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/chat/models/");
        const data = await res.json();
        if (res.ok) {
          setAvailableModels(data.models);
          setSelectedModel(data.default_model);
        }
      } catch (err) {
        console.error("Failed to load models");
      }
    };
    fetchModels();
  }, []);

  // 1️⃣ Fetch Subjects assigned to Teacher (Optional, depending on your subject API)
  useEffect(() => {
    if (!teacherId) return;
    const fetchSubjects = async () => {
      try {
        // Assuming you have an API to get a teacher's subjects. If not, this gracefully handles empty state.
        const res = await fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}/subjects/`);
        const data = await res.json();
        if (res.ok) setSubjects(data.subjects || []);
      } catch (err) {
        console.error("Failed to load subjects");
      }
    };
    fetchSubjects();
  }, [teacherId]);

  // 2️⃣ Fetch Chat Sessions for Teacher
  const fetchSessions = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/teacher-chat/list/${teacherId}/`);
      const data = await res.json();
      if (res.ok) setSessions(data.sessions);
    } catch (err) {
      console.error("Failed to load sessions");
    }
  };

  useEffect(() => {
    if (teacherId) fetchSessions();
  }, [teacherId]);

  // 3️⃣ Create New Chat (Subject is optional for teachers)
  const createNewChat = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/teacher-chat/new/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          teacher_id: teacherId, 
          subject_id: selectedSubject || null 
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
      const res = await fetch(`http://127.0.0.1:8000/teacher-chat/history/${sessionId}/`);
      const data = await res.json();
      if (res.ok) {
        setMessages(
          data.messages.map((msg) => ({
            sender: msg.sender === "USER" ? "user" : "bot",
            text: msg.message,
            mode: "standard", 
            followUps: [],
            showTranscript: false
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load chat history");
    }
  };

  // 5️⃣ Handle Send Message
  const handleSend = async (overrideQuestion = null) => {
    const questionToSend = overrideQuestion || input;
    if (!questionToSend.trim() || !currentSession) return;

    const userMessage = { sender: "user", text: questionToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const endpoint = isDebateMode 
        ? "http://127.0.0.1:8000/teacher-chat/debate/" 
        : "http://127.0.0.1:8000/teacher-chat/ask/";
        
      const debaterModels = availableModels.filter(m => m !== selectedModel);
      
      const payload = isDebateMode 
        ? {
            session_id: currentSession,
            question: questionToSend,
            judge_model: selectedModel,
            debater_models: debaterModels.length > 0 ? debaterModels : availableModels,
            max_rounds: 1
          }
        : {
            session_id: currentSession,
            question: questionToSend,
            model: selectedModel
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "Error occurred",
        verdict: data.verdict,               
        transcript: data.transcript || [],   
        mode: data.mode || "standard",
        followUps: data.follow_up_questions || [],
        showTranscript: false                
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

  const toggleTranscript = (index) => {
    setMessages((prevMessages) => 
      prevMessages.map((msg, i) => 
        i === index ? { ...msg, showTranscript: !msg.showTranscript } : msg
      )
    );
  };

  return (
    <div className="chat-layout">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>👨‍🏫 AI Teaching Assistant</h3>
        </div>
        <div className="new-chat-section">
          <select 
            className="subject-select" 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">General Chat (No Subject)</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
          <button className="new-chat-btn" onClick={createNewChat}>
            <span>+</span> New Chat
          </button>
        </div>
        <div className="session-list-container">
          <h4>Recent Conversations</h4>
          <div className="session-list">
            {sessions.length === 0 && <p className="no-sessions">No history yet.</p>}
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className={`session-item ${currentSession === session.session_id ? "active" : ""}`}
                onClick={() => loadChatHistory(session.session_id)}
              >
                <span className="session-icon">💬</span>
                <span className="session-title">{session.title || "Untitled Chat"}</span>
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
            <h2>Welcome to your AI Teaching Assistant</h2>
            <p>Start a new chat to brainstorm lesson plans, generate quizzes, or explore educational topics.</p>
          </div>
        ) : (
          <>
            <div className="chat-header">
              <h2>Current Discussion</h2>
            </div>

            <div className="chat-window">
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.sender}`}>
                  <div className="message-bubble">
                    
                    {msg.mode === "debate" && msg.verdict ? (
                      <div>
                        <div className="verdict-text">
                          <strong>👨‍⚖️ Final Verdict:</strong>
                          <ReactMarkdown>{msg.verdict}</ReactMarkdown>
                        </div>
                        
                        {msg.transcript.length > 0 && (
                          <div style={{ marginTop: "10px", borderTop: "1px solid #e5e7eb", paddingTop: "10px" }}>
                            <button 
                              onClick={() => toggleTranscript(index)}
                              style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "0.9rem" }}
                            >
                              {msg.showTranscript ? "▲ Hide Debate Details" : "▼ View Full Debate"}
                            </button>
                            
                            {msg.showTranscript && (
                              <div className="debate-transcript" style={{ marginTop: "10px", fontSize: "0.9rem", color: "#4b5563", backgroundColor: "#f9fafb", padding: "10px", borderRadius: "8px" }}>
                                {msg.transcript.map((turn, idx) => (
                                  <div key={idx} style={{ marginBottom: "8px" }}>
                                    <ReactMarkdown>{turn}</ReactMarkdown>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {msg.sender === "bot" && msg.followUps && msg.followUps.length > 0 && (
                    <div className="followup-container">
                      {msg.followUps.map((question, i) => (
                        <button key={i} className="followup-btn" onClick={() => handleSend(question)} disabled={loading}>
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
                    <span>•</span><span>•</span><span>•</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={loading}
                />
                <button onClick={() => handleSend()} disabled={!input.trim() || loading}>➤</button>
              </div>

              {/* 🔹 Bottom Controls (No Syllabus Switch here) */}
              <div className="bottom-controls" style={{ display: "flex", alignItems: "center", gap: "20px", padding: "0 10px", fontSize: "0.9rem", color: "#6b7280", flexWrap: "wrap" }}>
                
                {/* ⚖️ Debate Mode Switch */}
                <label className="switch-container" style={{ margin: 0 }}>
                  <div className="switch">
                    <input 
                      type="checkbox" 
                      checked={isDebateMode} 
                      onChange={(e) => setIsDebateMode(e.target.checked)} 
                      disabled={loading}
                    />
                    <span className="slider"></span>
                  </div>
                  <span style={{ color: isDebateMode ? "#3b82f6" : "#6b7280", transition: "color 0.2s", fontWeight: isDebateMode ? "600" : "normal" }}>
                    ⚖️ Debate Mode
                  </span>
                </label>

                {/* 🤖 Model Dropdown */}
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "auto" }}>
                  <span style={{ fontWeight: "500" }}>{isDebateMode ? "Judge Model:" : "Model:"}</span>
                  <select 
                    value={selectedModel} 
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={loading}
                    style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #bababa", backgroundColor: "transparent",color:'white', cursor: "pointer", fontSize: "0.85rem", maxWidth: "200px" }}
                  >
                    {availableModels.map((model, index) => (
                      <option key={index} value={model} style={{backgroundColor:'#1e1e1e', cursor:"pointer"}}>
                        {model.split('/').pop()}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default TeacherChatBot;