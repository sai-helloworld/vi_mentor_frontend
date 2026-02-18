// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// export default function QuizAttempt({ studentId }) {
//   const [pendingQuizzes, setPendingQuizzes] = useState([]);
//   const [loadingQuizzes, setLoadingQuizzes] = useState(true);

//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState([]); // array of { question_id, selected_option }
//   const [timer, setTimer] = useState(60);
//   const [isAttempting, setIsAttempting] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const intervalRef = useRef(null);
//   const mountedRef = useRef(true);

//   useEffect(() => {
//     mountedRef.current = true;
//     fetchPendingQuizzes();
//     return () => {
//       mountedRef.current = false;
//       clearInterval(intervalRef.current);
//     };
//   }, [studentId]);

//   async function fetchPendingQuizzes() {
//     setLoadingQuizzes(true);
//     setError(null);
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/student/${studentId}/unattempted-quizzes/`
//       );
//       if (!mountedRef.current) return;
//       setPendingQuizzes(res.data.unattempted_quizzes || []);
//     } catch (err) {
//       setError("Failed to load pending quizzes");
//     } finally {
//       setLoadingQuizzes(false);
//     }
//   }

//   async function startQuiz(quizId) {
//     setError(null);
//     setResult(null);
//     try {
//       const res = await axios.get(`http://localhost:8000/api/quiz/${quizId}/`);
//       const quizData = res.data;
//       setSelectedQuiz(quizData);
//       setQuestions(quizData.questions || []);
//       setCurrentIndex(0);
//       setAnswers([]);
//       setIsAttempting(true);
//       setTimer(60);
//       startTimer();
//       // small delay to allow CSS animation
//       setTimeout(() => {
//         const el = document.querySelector(".quiz-card");
//         if (el) el.classList.add("enter");
//       }, 10);
//     } catch (err) {
//       setError("Failed to load quiz details");
//     }
//   }

//   function startTimer() {
//     clearInterval(intervalRef.current);
//     setTimer(60);
//     intervalRef.current = setInterval(() => {
//       setTimer((t) => {
//         if (t <= 1) {
//           // time up for current question
//           clearInterval(intervalRef.current);
//           handleAutoSelect();
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);
//   }

//   function handleAutoSelect() {
//     // If no answer recorded for current index, auto-select A
//     const currentQuestion = questions[currentIndex];
//     const existing = answers[currentIndex];
//     if (!existing || !existing.selected_option) {
//       recordAnswer(currentQuestion.question_id, "A");
//     } else {
//       // move on if already answered
//       goNext();
//     }
//   }

//   function recordAnswer(question_id, option) {
//     const updated = [...answers];
//     updated[currentIndex] = { question_id, selected_option: option };
//     setAnswers(updated);

//     // small visual feedback
//     const btn = document.querySelector(".option-btn.selected");
//     if (btn) {
//       btn.classList.remove("selected");
//     }

//     // proceed to next question or submit
//     setTimeout(() => {
//       goNext();
//     }, 350); // short delay for animation
//   }

//   function goNext() {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex((i) => i + 1);
//       setTimer(60);
//       startTimer();
//       // trigger card animation
//       const el = document.querySelector(".quiz-card");
//       if (el) {
//         el.classList.remove("enter");
//         void el.offsetWidth;
//         el.classList.add("enter");
//       }
//     } else {
//       // finish and submit
//       clearInterval(intervalRef.current);
//       submitQuiz();
//     }
//   }

//   async function submitQuiz() {
//     setSubmitting(true);
//     setError(null);
//     // ensure every question has an answer; default to A if missing
//     const finalAnswers = questions.map((q, idx) => {
//       const ans = answers[idx];
//       return {
//         question_id: q.question_id,
//         selected_option: (ans && ans.selected_option) || "A",
//       };
//     });

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/quiz/submit/", {
//         quiz_id: selectedQuiz.quiz_id,
//         student_roll_number: studentId,
//         answers: finalAnswers,
//       });
//       setResult(res.data);
//       setIsAttempting(false);
//       setSelectedQuiz(null);
//       setQuestions([]);
//       setCurrentIndex(0);
//       setAnswers([]);
//       // refresh pending quizzes list
//       fetchPendingQuizzes();
//     } catch (err) {
//       setError("Failed to submit quiz");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   // progress percent for timer
//   const timerPercent = Math.max(0, (timer / 60) * 100);

//   return (
//     <div className="qa-root">
//       <header className="qa-header">
//         <h1 className="qa-title">Student Quiz Center</h1>
//         <p className="qa-sub">Pending quizzes and attempt interface</p>
//       </header>

//       <main className="qa-main">
//         <section className="pending-section">
//           <h2 className="section-title">Pending Quizzes</h2>

//           {loadingQuizzes ? (
//             <div className="loader">Loading quizzes…</div>
//           ) : pendingQuizzes.length === 0 ? (
//             <div className="empty">No pending quizzes 🎉</div>
//           ) : (
//             <ul className="quiz-list">
//               {pendingQuizzes.map((q) => (
//                 <li key={q.quiz_id} className="quiz-item">
//                   <div className="quiz-meta">
//                     <div className="quiz-title">{q.title}</div>
//                     <div className="quiz-submeta">
//                       <span className="chip">{q.subject}</span>
//                       <span className="chip">{q.teacher}</span>
//                     </div>
//                   </div>
//                   <button
//                     className="attempt-btn"
//                     onClick={() => startQuiz(q.quiz_id)}
//                   >
//                     Attempt
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>

//         {isAttempting && selectedQuiz && questions.length > 0 && (
//           <section className="attempt-section">
//             <div className="quiz-card">
//               <div className="quiz-header">
//                 <div>
//                   <h3 className="quiz-card-title">{selectedQuiz.title}</h3>
//                   <div className="quiz-meta-line">
//                     <span className="small">{selectedQuiz.subject}</span>
//                     <span className="small">•</span>
//                     <span className="small">{selectedQuiz.teacher}</span>
//                   </div>
//                 </div>
//                 <div className="timer-wrap">
//                   <div className="timer-circle">
//                     <svg className="progress-ring" viewBox="0 0 36 36">
//                       <path
//                         className="progress-bg"
//                         d="M18 2.0845
//                            a 15.9155 15.9155 0 0 1 0 31.831
//                            a 15.9155 15.9155 0 0 1 0 -31.831"
//                       />
//                       <path
//                         className="progress-bar"
//                         d="M18 2.0845
//                            a 15.9155 15.9155 0 0 1 0 31.831
//                            a 15.9155 15.9155 0 0 1 0 -31.831"
//                         style={{ strokeDasharray: `${timerPercent} 100` }}
//                       />
//                     </svg>
//                     <div className="timer-text">{timer}s</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="question-area">
//                 <div className="question-index">
//                   Question {currentIndex + 1} of {questions.length}
//                 </div>

//                 <div className="question-text">
//                   {questions[currentIndex].text}
//                 </div>

//                 <div className="options-grid">
//                   <button
//                     className="option-btn"
//                     onClick={() =>
//                       recordAnswer(
//                         questions[currentIndex].question_id,
//                         "A"
//                       )
//                     }
//                   >
//                     <strong>A</strong>
//                     <span>{questions[currentIndex].option_a}</span>
//                   </button>

//                   <button
//                     className="option-btn"
//                     onClick={() =>
//                       recordAnswer(
//                         questions[currentIndex].question_id,
//                         "B"
//                       )
//                     }
//                   >
//                     <strong>B</strong>
//                     <span>{questions[currentIndex].option_b}</span>
//                   </button>

//                   <button
//                     className="option-btn"
//                     onClick={() =>
//                       recordAnswer(
//                         questions[currentIndex].question_id,
//                         "C"
//                       )
//                     }
//                   >
//                     <strong>C</strong>
//                     <span>{questions[currentIndex].option_c}</span>
//                   </button>

//                   <button
//                     className="option-btn"
//                     onClick={() =>
//                       recordAnswer(
//                         questions[currentIndex].question_id,
//                         "D"
//                       )
//                     }
//                   >
//                     <strong>D</strong>
//                     <span>{questions[currentIndex].option_d}</span>
//                   </button>
//                 </div>

//                 <div className="progress-bar-wrap">
//                   <div
//                     className="progress-bar-fill"
//                     style={{ width: `${timerPercent}%` }}
//                   />
//                 </div>

//                 <div className="controls">
//                   <button
//                     className="skip-btn"
//                     onClick={() => {
//                       // record default A and move on
//                       recordAnswer(questions[currentIndex].question_id, "A");
//                     }}
//                   >
//                     Skip (auto A)
//                   </button>
//                   <div className="question-count">
//                     {currentIndex + 1}/{questions.length}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {submitting && (
//           <div className="submitting">Submitting answers…</div>
//         )}

//         {result && (
//           <section className="result-section">
//             <div className="result-card">
//               <h3 className="result-title">Result</h3>
//               <p className="result-msg">{result.message}</p>
//               <p className="result-score">Score: {result.score}</p>
//               <ul className="result-list">
//                 {result.answers.map((a, i) => (
//                   <li key={i} className="result-item">
//                     <div className="res-q">{a.question_text}</div>
//                     <div className={`res-status ${a.is_correct ? "ok" : "bad"}`}>
//                       Your: {a.selected_option} • Correct: {a.correct_option}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </section>
//         )}

//         {error && <div className="error-banner">{error}</div>}
//       </main>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/quiz-attempt-full.css"; // CSS file provided below

export default function QuizAttempt({ studentId }) {
  const [pendingQuizzes, setPendingQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [error, setError] = useState(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // answers: array indexed by question index -> { question_id, selected_option }
  const [answers, setAnswers] = useState([]);

  // selected option for current question (editable until Next or timer expiry)
  const [selectedOption, setSelectedOption] = useState(null);

  // timer state
  const [timer, setTimer] = useState(60);
  const timerRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // fetch pending quizzes
  useEffect(() => {
    fetchPendingQuizzes();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  async function fetchPendingQuizzes() {
    setLoadingQuizzes(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/student/${studentId}/unattempted-quizzes/`
      );
      setPendingQuizzes(res.data.unattempted_quizzes || []);
    } catch (err) {
      setError("Failed to load pending quizzes");
    } finally {
      setLoadingQuizzes(false);
    }
  }

  // open quiz in full-screen overlay
  async function openQuiz(quizId) {
    setError(null);
    setResult(null);
    try {
      const res = await axios.get(`http://localhost:8000/api/quiz/${quizId}/`);
      const quizData = res.data;
      setSelectedQuiz(quizData);
      setQuestions(quizData.questions || []);
      setCurrentIndex(0);
      setAnswers([]); // reset
      setSelectedOption(null);
      setIsOverlayOpen(true);
      startTimer(60);
    } catch (err) {
      setError("Failed to load quiz details");
    }
  }

  // start timer with given seconds
  function startTimer(seconds = 60) {
    clearInterval(timerRef.current);
    setTimer(seconds);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimerExpiry();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  // when timer expires: if no selection -> auto select A; then advance
  function handleTimerExpiry() {
    const q = questions[currentIndex];
    const existing = answers[currentIndex];
    if (!existing || !existing.selected_option) {
      // auto-select A and save
      saveAnswer(currentIndex, q.question_id, "A");
    }
    // move to next after a short delay so UI shows selection
    setTimeout(() => {
      moveNextOrSubmit();
    }, 400);
  }

  // save answer in answers array (does not advance)
  function saveAnswer(index, question_id, option) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = { question_id, selected_option: option };
      return copy;
    });
    setSelectedOption(option);
  }

  // user clicks an option: update selectedOption and save (editable until Next)
  function handleOptionClick(option) {
    const q = questions[currentIndex];
    setSelectedOption(option);
    saveAnswer(currentIndex, q.question_id, option);
    // do not advance automatically — user can change until Next or timer expiry
  }

  // move to next question or submit if last
  function moveNextOrSubmit() {
    // ensure current question has an answer; default to A if missing
    const q = questions[currentIndex];
    const existing = answers[currentIndex];
    if (!existing || !existing.selected_option) {
      saveAnswer(currentIndex, q.question_id, "A");
    }

    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      // set selectedOption to previously saved answer for next question (if any)
      const nextAns = answers[nextIndex];
      setSelectedOption(nextAns ? nextAns.selected_option : null);
      startTimer(60);
    } else {
      // last question -> submit
      submitQuiz();
    }
  }

  // user clicks Next (explicit)
  function handleNextClick() {
    clearInterval(timerRef.current);
    moveNextOrSubmit();
  }

  // submit quiz
  async function submitQuiz() {
    clearInterval(timerRef.current);
    setSubmitting(true);
    setError(null);

    // ensure all questions have answers
    const finalAnswers = questions.map((q, idx) => {
      const a = answers[idx];
      return {
        question_id: q.question_id,
        selected_option: (a && a.selected_option) || "A",
      };
    });

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/quiz/submit/", {
        quiz_id: selectedQuiz.quiz_id,
        student_roll_number: studentId,
        answers: finalAnswers,
      });
      setResult(res.data);
      setIsOverlayOpen(false);
      setSelectedQuiz(null);
      setQuestions([]);
      setAnswers([]);
      setSelectedOption(null);
      // refresh pending quizzes
      fetchPendingQuizzes();
    } catch (err) {
      setError("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  }

  // close overlay (confirm)
  function closeOverlay() {
    clearInterval(timerRef.current);
    setIsOverlayOpen(false);
    setSelectedQuiz(null);
    setQuestions([]);
    setAnswers([]);
    setSelectedOption(null);
  }

  // compute timer percent for progress bar
  const timerPercent = Math.max(0, (timer / 60) * 100);

  return (
    <div className="qa-root">
      <header className="qa-header">
        <h1 className="qa-title">Student Quiz Center</h1>
        <p className="qa-sub">Pending quizzes — click Attempt to open full-screen</p>
      </header>

      <main className="qa-main-compact">
        <section className="pending-section">
          <h2 className="section-title">Pending Quizzes</h2>

          {loadingQuizzes ? (
            <div className="loader">Loading quizzes…</div>
          ) : pendingQuizzes.length === 0 ? (
            <div className="empty">No pending quizzes 🎉</div>
          ) : (
            <ul className="quiz-list">
              {pendingQuizzes.map((q) => (
                <li key={q.quiz_id} className="quiz-item">
                  <div className="quiz-meta">
                    <div className="quiz-title">{q.title}</div>
                    <div className="quiz-submeta">
                      <span className="chip">{q.subject}</span>
                      <span className="chip">{q.teacher}</span>
                    </div>
                  </div>
                  <button
                    className="attempt-btn"
                    onClick={() => openQuiz(q.quiz_id)}
                  >
                    Attempt
                  </button>
                </li>
              ))}
            </ul>
          )}

          {error && <div className="error-banner">{error}</div>}
        </section>

        {result && (
          <section className="result-section">
            <div className="result-card">
              <h3 className="result-title">Last Attempt Result</h3>
              <p className="result-msg">{result.message}</p>
              <p className="result-score">Score: {result.score}</p>
            </div>
          </section>
        )}
      </main>

      {/* Full-screen overlay for attempting quiz */}
      {isOverlayOpen && selectedQuiz && (
        <div className="overlay">
          <div className="overlay-inner">
            <header className="overlay-header">
              <div>
                <h2 className="overlay-title">{selectedQuiz.title}</h2>
                <div className="overlay-meta">
                  <span>{selectedQuiz.subject}</span>
                  <span>•</span>
                  <span>{selectedQuiz.teacher}</span>
                </div>
              </div>

              <div className="overlay-controls">
                <div className="timer-compact">
                  <div className="timer-number">{timer}s</div>
                  <div className="timer-bar">
                    <div
                      className="timer-bar-fill"
                      style={{ width: `${timerPercent}%` }}
                    />
                  </div>
                </div>

                <button className="close-btn" onClick={closeOverlay}>
                  Close
                </button>
              </div>
            </header>

            <main className="overlay-body">
              <div className="question-panel">
                <div className="question-top">
                  <div className="q-index">
                    Question {currentIndex + 1} / {questions.length}
                  </div>
                  <div className="q-text">{questions[currentIndex]?.text}</div>
                </div>

                <div className="options-grid">
                  <button
                    className={`option-btn ${selectedOption === "A" ? "selected" : ""}`}
                    onClick={() => handleOptionClick("A")}
                  >
                    <strong>A</strong>
                    <span>{questions[currentIndex]?.option_a}</span>
                  </button>

                  <button
                    className={`option-btn ${selectedOption === "B" ? "selected" : ""}`}
                    onClick={() => handleOptionClick("B")}
                  >
                    <strong>B</strong>
                    <span>{questions[currentIndex]?.option_b}</span>
                  </button>

                  <button
                    className={`option-btn ${selectedOption === "C" ? "selected" : ""}`}
                    onClick={() => handleOptionClick("C")}
                  >
                    <strong>C</strong>
                    <span>{questions[currentIndex]?.option_c}</span>
                  </button>

                  <button
                    className={`option-btn ${selectedOption === "D" ? "selected" : ""}`}
                    onClick={() => handleOptionClick("D")}
                  >
                    <strong>D</strong>
                    <span>{questions[currentIndex]?.option_d}</span>
                  </button>
                </div>

                <div className="bottom-controls">
                  <div className="left-controls">
                    <button
                      className="skip-btn"
                      onClick={() => {
                        // explicit skip -> record A and move
                        clearInterval(timerRef.current);
                        saveAnswer(currentIndex, questions[currentIndex].question_id, "A");
                        moveNextOrSubmit();
                      }}
                    >
                      Skip (auto A)
                    </button>
                  </div>

                  <div className="right-controls">
                    {currentIndex < questions.length - 1 ? (
                      <button
                        className="next-btn"
                        onClick={() => {
                          clearInterval(timerRef.current);
                          handleNextClick();
                        }}
                        disabled={submitting}
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        className="submit-btn"
                        onClick={() => {
                          clearInterval(timerRef.current);
                          submitQuiz();
                        }}
                        disabled={submitting}
                      >
                        {submitting ? "Submitting…" : "Submit Quiz"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <aside className="sidebar-panel">
                <div className="summary-card">
                  <h4>Progress</h4>
                  <div className="progress-list">
                    {questions.map((q, idx) => {
                      const ans = answers[idx];
                      return (
                        <button
                          key={idx}
                          className={`progress-dot ${ans ? "answered" : "empty"} ${idx === currentIndex ? "active" : ""}`}
                          onClick={() => {
                            // jump to question (allow editing)
                            clearInterval(timerRef.current);
                            setCurrentIndex(idx);
                            setSelectedOption(ans ? ans.selected_option : null);
                            startTimer(60);
                          }}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="hint-card">
                  <h4>Tip</h4>
                  <p>You can change your selection any time before the timer ends or before you click Next.</p>
                </div>
              </aside>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}



// import React, { useEffect, useState, useMemo } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function QuizDashboard() {
//   const [attempts, setAttempts] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  
//   // UI State: Stores the unique frontend ID of the expanded row
//   const [expandedUid, setExpandedUid] = useState(null);
  
//   // Filters
//   const [chartSubjectFilter, setChartSubjectFilter] = useState("All"); 
//   const [tableSubjectFilter, setTableSubjectFilter] = useState("All"); 
//   const [sortConfig, setSortConfig] = useState({ key: "submitted_at", direction: "desc" });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const rollNumber = localStorage.getItem("student_roll_number");
//         if (!rollNumber) {
//           setError("No student roll number found. Please login again.");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(
//           `http://localhost:8000/api/student/${rollNumber}/quiz-attempts/`
//         );
//         const result = await response.json();

//         if (!response.ok) {
//           setError(result.error || "Failed to fetch quiz attempts.");
//           return;
//         }

//         const rawData = result.attempts || [];
        
//         // --- KEY FIX: Generate a unique ID for every single row ---
//         // We use this internal ID (_uid) for keys and expansion logic
//         const dataWithUniqueIds = rawData.map((item, index) => ({
//             ...item,
//             // Create a unique string: ID + Index + Timestamp
//             _uid: `row-${item.id}-${index}-${Date.now()}` 
//         }));

//         setAttempts(dataWithUniqueIds);
        
//         const uniqueSubjs = [...new Set(rawData.map((a) => a.subject))];
//         setSubjects(uniqueSubjs);

//       } catch {
//         setError("Server error. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // --- Charts Logic ---
//   const chartData = useMemo(() => {
//     if (!attempts.length) return { bar: null, line: null };

//     const subjectScores = {};
//     attempts.forEach((a) => {
//       if (!subjectScores[a.subject]) subjectScores[a.subject] = [];
//       subjectScores[a.subject].push(a.score);
//     });

//     const labels = Object.keys(subjectScores);
//     const avgScores = labels.map((s) => {
//       const arr = subjectScores[s];
//       return arr.reduce((x, y) => x + y, 0) / arr.length;
//     });

//     const bar = {
//       labels,
//       datasets: [{
//         label: "Average Score",
//         data: avgScores,
//         backgroundColor: "rgba(99, 102, 241, 0.6)",
//         borderColor: "rgba(99, 102, 241, 1)",
//         borderWidth: 1,
//       }],
//     };

//     let lineAttempts = [...attempts];
//     if (chartSubjectFilter !== "All") {
//       lineAttempts = lineAttempts.filter(a => a.subject === chartSubjectFilter);
//     }
//     lineAttempts.sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at));
    
//     const line = {
//       labels: lineAttempts.map(a => `${a.quiz_title} (${new Date(a.submitted_at).toLocaleDateString()})`),
//       datasets: [{
//         label: `Performance (${chartSubjectFilter === 'All' ? 'All Quizzes' : chartSubjectFilter})`,
//         data: lineAttempts.map(a => a.score),
//         borderColor: "#10b981",
//         backgroundColor: "rgba(16, 185, 129, 0.1)",
//         tension: 0.3,
//         fill: true,
//         pointRadius: 5,
//         pointHoverRadius: 8
//       }],
//     };

//     return { bar, line };
//   }, [attempts, chartSubjectFilter]);

//   // --- Table Logic ---
//   const processedTableData = useMemo(() => {
//     let data = [...attempts];
//     if (tableSubjectFilter !== "All") {
//       data = data.filter(a => a.subject === tableSubjectFilter);
//     }
//     data.sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === "asc" ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === "asc" ? 1 : -1;
//       }
//       return 0;
//     });
//     return data;
//   }, [attempts, tableSubjectFilter, sortConfig]);

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleToggleRow = (uid) => {
//       // If clicking the same row, close it (set to null), otherwise open new one
//       setExpandedUid(prevUid => prevUid === uid ? null : uid);
//   };

//   // --- Styles ---
//   const styles = {
//     container: {
//       width: "75%",
//       margin: "40px auto",
//       padding: "20px",
//       backgroundColor: "#1e1e1e",
//       color: "#e0e0e0",
//       fontFamily: "'Segoe UI', sans-serif",
//       minHeight: "100vh",
//     },
//     header: { textAlign: "center", marginBottom: "40px", color: "white" },
//     card: {
//       backgroundColor: "#2a2a2a",
//       padding: "25px",
//       borderRadius: "12px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//       marginBottom: "30px",
//     },
//     chartHeader: {
//       display: "flex", 
//       justifyContent: "space-between", 
//       alignItems: "center",
//       marginBottom: "15px"
//     },
//     chartWrapper: {
//         height: "400px",
//         position: "relative"
//     },
//     select: {
//       padding: "8px 12px",
//       borderRadius: "6px",
//       border: "1px solid #444",
//       backgroundColor: "#333",
//       color: "white",
//       fontSize: "0.9rem",
//       cursor: "pointer",
//     },
//     tableContainer: { overflowX: "auto", borderRadius: "8px", border: "1px solid #333" },
//     table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
//     th: {
//       backgroundColor: "#333",
//       padding: "12px 15px",
//       textAlign: "left",
//       color: "#fff",
//       cursor: "pointer",
//       userSelect: "none",
//     },
//     td: { padding: "12px 15px", borderBottom: "1px solid #333", color: "#ddd" },
//     btn: {
//       padding: "6px 12px",
//       borderRadius: "4px",
//       border: "none",
//       cursor: "pointer",
//       fontSize: "0.85rem",
//       backgroundColor: "#6366f1",
//       color: "white",
//     },
//     badge: (isCorrect) => ({
//       padding: "4px 8px",
//       borderRadius: "4px",
//       fontSize: "0.8rem",
//       backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
//       color: isCorrect ? "#34d399" : "#f87171",
//       border: `1px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
//     }),
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//         y: { grid: { color: "#444" }, ticks: { color: "#aaa" } },
//         x: { grid: { color: "#444" }, ticks: { color: "#aaa" } },
//     },
//     plugins: { legend: { labels: { color: "white" } } }
//   };

//   if (loading) return <div style={{textAlign: "center", color: "white", marginTop: "50px"}}>Loading...</div>;
//   if (error) return <div style={{textAlign: "center", color: "#ef4444", marginTop: "50px"}}>{error}</div>;

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>📊 Student Dashboard</h2>

//       <div style={styles.card}>
//         <h3 style={{margin: "0 0 15px 0", color: "#ddd"}}>Subject Averages</h3>
//         <div style={styles.chartWrapper}>
//           {chartData.bar ? (
//             <Bar data={chartData.bar} options={chartOptions} />
//           ) : (
//              <p style={{color: "#777"}}>Not enough data for averages.</p>
//           )}
//         </div>
//       </div>

//       <div style={styles.card}>
//         <div style={styles.chartHeader}>
//           <h3 style={{margin: 0, color: "#ddd"}}>Performance Timeline</h3>
//           <select 
//             style={styles.select}
//             value={chartSubjectFilter}
//             onChange={(e) => setChartSubjectFilter(e.target.value)}
//           >
//             <option value="All">All Subjects</option>
//             {subjects.map(s => <option key={s} value={s}>{s}</option>)}
//           </select>
//         </div>

//         <div style={styles.chartWrapper}>
//           {chartData.line ? (
//             <Line data={chartData.line} options={chartOptions} />
//           ) : (
//             <p style={{color: "#777"}}>No quiz data available.</p>
//           )}
//         </div>
//       </div>

//       <div style={styles.card}>
//         <div style={styles.chartHeader}>
//           <h3 style={{margin: 0, color: "#ddd"}}>Detailed History</h3>
//           <select 
//             style={styles.select}
//             value={tableSubjectFilter}
//             onChange={(e) => setTableSubjectFilter(e.target.value)}
//           >
//             <option value="All">All Subjects</option>
//             {subjects.map(s => <option key={s} value={s}>{s}</option>)}
//           </select>
//         </div>

//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th} onClick={() => requestSort("quiz_title")}>Quiz Name ⬍</th>
//                 <th style={styles.th} onClick={() => requestSort("subject")}>Subject ⬍</th>
//                 <th style={styles.th} onClick={() => requestSort("score")}>Score ⬍</th>
//                 <th style={styles.th} onClick={() => requestSort("submitted_at")}>Date ⬍</th>
//                 <th style={styles.th}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {processedTableData.length === 0 && (
//                 <tr><td colSpan="5" style={{...styles.td, textAlign:"center"}}>No records found.</td></tr>
//               )}
//               {processedTableData.map((attempt) => (
//                 <React.Fragment key={attempt._uid}>
//                   <tr style={{ backgroundColor: "#2a2a2a" }}>
//                     <td style={styles.td}>{attempt.quiz_title}</td>
//                     <td style={styles.td}>{attempt.subject}</td>
//                     <td style={{...styles.td, fontWeight: "bold", color: "#10b981"}}>{attempt.score}</td>
//                     <td style={styles.td}>{new Date(attempt.submitted_at).toLocaleDateString()}</td>
//                     <td style={styles.td}>
//                       <button 
//                         style={styles.btn}
//                         // Use the unique Frontend ID for toggle
//                         onClick={() => handleToggleRow(attempt._uid)}
//                       >
//                         {expandedUid === attempt._uid ? "Close" : "Review"}
//                       </button>
//                     </td>
//                   </tr>
                  
//                   {expandedUid === attempt._uid && (
//                     <tr>
//                       <td colSpan="5" style={{ padding: "0 15px 15px 15px", backgroundColor: "#252525" }}>
//                         <div style={{padding: "15px", backgroundColor: "#1a1a1a", borderRadius: "8px", marginTop: "10px"}}>
//                             <h4 style={{marginTop: 0, marginBottom: "10px", color: "#aaa"}}>Answer Key</h4>
//                             <table style={{width: "100%", borderCollapse: "collapse"}}>
//                                 <thead>
//                                     <tr style={{borderBottom: "1px solid #444"}}>
//                                         <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Question</th>
//                                         <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Your Ans</th>
//                                         <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Correct Ans</th>
//                                         <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {attempt.answers.map((ans, idx) => (
//                                         <tr key={idx} style={{borderBottom: "1px solid #333"}}>
//                                             <td style={{padding: "10px", color: "#ddd"}}>{ans.question_text}</td>
//                                             <td style={{padding: "10px", color: "#ddd"}}>{ans.selected_option}) {ans.selected_option_text}</td>
//                                             <td style={{padding: "10px", color: "#ddd"}}>{ans.correct_option}) {ans.correct_option_text}</td>
//                                             <td style={{padding: "10px"}}>
//                                                 <span style={styles.badge(ans.is_correct)}>
//                                                     {ans.is_correct ? "Correct" : "Wrong"}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }