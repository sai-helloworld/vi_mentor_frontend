// import React, { useEffect, useState } from "react";
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
//   const [barData, setBarData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("All subjects");
//   const [attempts, setAttempts] = useState([]);
//   const [expandedAttempt, setExpandedAttempt] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

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

//         const attemptsData = result.attempts || [];
//         setAttempts(attemptsData);

//         /* ---------- BAR CHART (Average per subject) ---------- */
//         const subjectScores = {};
//         attemptsData.forEach((a) => {
//           if (!subjectScores[a.subject]) subjectScores[a.subject] = [];
//           subjectScores[a.subject].push(a.score);
//         });

//         const labels = Object.keys(subjectScores);
//         const avgScores = labels.map((s) => {
//           const arr = subjectScores[s];
//           return arr.reduce((x, y) => x + y, 0) / arr.length;
//         });

//         setBarData({
//           labels,
//           datasets: [
//             {
//               label: "Average Score per Subject",
//               data: avgScores,
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//             },
//           ],
//         });

//         setSubjects(["All subjects", ...labels]);

//         /* ---------- LINE CHART (All attempts default) ---------- */
//         setLineData({
//           labels: attemptsData.map((a) =>
//             new Date(a.submitted_at).toLocaleDateString()
//           ),
//           datasets: [
//             {
//               label: "Scores for All Quizzes",
//               data: attemptsData.map((a) => a.score),
//               borderColor: "rgba(54, 162, 235, 1)",
//               backgroundColor: "rgba(54, 162, 235, 0.2)",
//               fill: true,
//             },
//           ],
//         });
//       } catch {
//         setError("Server error. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubjectChange = (e) => {
//     const subj = e.target.value;
//     setSelectedSubject(subj);

//     const filtered =
//       subj === "All subjects"
//         ? attempts
//         : attempts.filter((a) => a.subject === subj);

//     setLineData({
//       labels: filtered.map((a) =>
//         new Date(a.submitted_at).toLocaleDateString()
//       ),
//       datasets: [
//         {
//           label:
//             subj === "All subjects"
//               ? "Scores for All Quizzes"
//               : `Scores for ${subj}`,
//           data: filtered.map((a) => a.score),
//           borderColor:
//             subj === "All subjects"
//               ? "rgba(54, 162, 235, 1)"
//               : "rgba(255, 99, 132, 1)",
//           backgroundColor:
//             subj === "All subjects"
//               ? "rgba(54, 162, 235, 0.2)"
//               : "rgba(255, 99, 132, 0.2)",
//           fill: true,
//         },
//       ],
//     });
//   };

//   if (loading) return <p>Loading quiz attempts...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div style={{ width: "90%", margin: "auto" }}>
//       <h2>📊 Quiz Dashboard</h2>

//       {/* ---------- BAR CHART ---------- */}
//       {barData && (
//         <div style={{ marginBottom: "30px" }}>
//           <Bar data={barData} options={{ responsive: true }} />
//         </div>
//       )}

//       {/* ---------- LINE CHART ---------- */}
//       {subjects.length > 0 && (
//         <div style={{ marginBottom: "30px" }}>
//           <h3>Track Progress</h3>
//           <select value={selectedSubject} onChange={handleSubjectChange}>
//             {subjects.map((s, i) => (
//               <option key={i} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>

//           {lineData && (
//             <div style={{ marginTop: "20px" }}>
//               <Line data={lineData} options={{ responsive: true }} />
//             </div>
//           )}
//         </div>
//       )}

//       {/* ---------- TABLE WITH EXPAND ---------- */}
//       <h3>Detailed Quiz Attempts</h3>
//       <table border="1" cellPadding="8" width="100%">
//         <thead>
//           <tr>
//             <th>Quiz</th>
//             <th>Subject</th>
//             <th>Score</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attempts.map((a, idx) => (
//             <React.Fragment key={idx}>
//               <tr>
//                 <td>{a.quiz_title}</td>
//                 <td>{a.subject}</td>
//                 <td>{a.score}</td>
//                 <td>{new Date(a.submitted_at).toLocaleString()}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       setExpandedAttempt(
//                         expandedAttempt === idx ? null : idx
//                       )
//                     }
//                   >
//                     {expandedAttempt === idx ? "Hide" : "View"}
//                   </button>
//                 </td>
//               </tr>

//               {expandedAttempt === idx && a.answers && (
//                 <tr>
//                   <td colSpan="5">
//                     <table border="1" width="100%">
//                       <thead>
//   <tr>
//     <th>Question</th>
//     <th>Your Answer</th>
//     <th>Correct Answer</th>
//     <th>All Options</th>
//     <th>Result</th>
//   </tr>
// </thead>

//                       <tbody>
//   {a.answers.map((ans, i) => (
//     <tr key={i}>
//       <td>{ans.question_text}</td>

//       <td>
//         <strong>
//           {ans.selected_option} — {ans.selected_option_text}
//         </strong>
//       </td>

//       <td>
//         <strong>
//           {ans.correct_option} — {ans.correct_option_text}
//         </strong>
//       </td>

//       <td>
//         <ul style={{ margin: 0, paddingLeft: "15px" }}>
//           {Object.entries(ans.options).map(([key, value]) => (
//             <li key={key}>
//               {key} — {value}
//             </li>
//           ))}
//         </ul>
//       </td>

//       <td>{ans.is_correct ? "✅ Correct" : "❌ Wrong"}</td>
//     </tr>
//   ))}
// </tbody>

//                     </table>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function QuizDashboard() {
  const [attempts, setAttempts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // UI State
  const [expandedAttempt, setExpandedAttempt] = useState(null);
  
  // Filters
  const [chartSubjectFilter, setChartSubjectFilter] = useState("All"); // For Line Chart
  const [tableSubjectFilter, setTableSubjectFilter] = useState("All"); // For Table
  const [sortConfig, setSortConfig] = useState({ key: "submitted_at", direction: "desc" });

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rollNumber = localStorage.getItem("student_roll_number");
        if (!rollNumber) {
          setError("No student roll number found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8000/api/student/${rollNumber}/quiz-attempts/`
        );
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to fetch quiz attempts.");
          return;
        }

        const data = result.attempts || [];
        setAttempts(data);
        
        // Extract unique subjects
        const uniqueSubjs = [...new Set(data.map((a) => a.subject))];
        setSubjects(uniqueSubjs);

      } catch {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Prepare Chart Data
  const chartData = useMemo(() => {
    if (!attempts.length) return { bar: null, line: null };

    // --- Bar Chart (Always shows averages for all subjects) ---
    const subjectScores = {};
    attempts.forEach((a) => {
      if (!subjectScores[a.subject]) subjectScores[a.subject] = [];
      subjectScores[a.subject].push(a.score);
    });

    const labels = Object.keys(subjectScores);
    const avgScores = labels.map((s) => {
      const arr = subjectScores[s];
      return arr.reduce((x, y) => x + y, 0) / arr.length;
    });

    const bar = {
      labels,
      datasets: [{
        label: "Average Score",
        data: avgScores,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      }],
    };

    // --- Line Chart (Filtered by Subject) ---
    let lineAttempts = [...attempts];
    
    // Filter logic for Line Chart
    if (chartSubjectFilter !== "All") {
      lineAttempts = lineAttempts.filter(a => a.subject === chartSubjectFilter);
    }
    
    // Sort chronologically for the line graph
    lineAttempts.sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at));
    
    const line = {
      labels: lineAttempts.map(a => 
        // Show Quiz Title + Date to make points distinct
        `${a.quiz_title} (${new Date(a.submitted_at).toLocaleDateString()})`
      ),
      datasets: [{
        label: `Performance (${chartSubjectFilter === 'All' ? 'All Quizzes' : chartSubjectFilter})`,
        data: lineAttempts.map(a => a.score),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8
      }],
    };

    return { bar, line };
  }, [attempts, chartSubjectFilter]);

  // 3. Table Data Processing
  const processedTableData = useMemo(() => {
    let data = [...attempts];

    // Filter
    if (tableSubjectFilter !== "All") {
      data = data.filter(a => a.subject === tableSubjectFilter);
    }

    // Sort
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return data;
  }, [attempts, tableSubjectFilter, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // --- Styles ---
  const styles = {
    container: {
      width: "75%", // Requested Width
      margin: "40px auto", // Centered
      padding: "20px",
      backgroundColor: "#1e1e1e",
      color: "#e0e0e0",
      fontFamily: "'Segoe UI', sans-serif",
      minHeight: "100vh",
    },
    header: { textAlign: "center", marginBottom: "40px", color: "white" },
    card: {
      backgroundColor: "#2a2a2a",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      marginBottom: "30px", // Spacing between vertical stacked items
    },
    chartHeader: {
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      marginBottom: "15px"
    },
    chartWrapper: {
        height: "400px", // Taller since they are stacked
        position: "relative"
    },
    select: {
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid #444",
      backgroundColor: "#333",
      color: "white",
      fontSize: "0.9rem",
      cursor: "pointer",
    },
    // Table Styles
    tableContainer: { overflowX: "auto", borderRadius: "8px", border: "1px solid #333" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
    th: {
      backgroundColor: "#333",
      padding: "12px 15px",
      textAlign: "left",
      color: "#fff",
      cursor: "pointer",
      userSelect: "none",
    },
    td: { padding: "12px 15px", borderBottom: "1px solid #333", color: "#ddd" },
    btn: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: "0.85rem",
      backgroundColor: "#6366f1",
      color: "white",
    },
    badge: (isCorrect) => ({
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "0.8rem",
      backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
      color: isCorrect ? "#34d399" : "#f87171",
      border: `1px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
    }),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: { grid: { color: "#444" }, ticks: { color: "#aaa" } },
        x: { grid: { color: "#444" }, ticks: { color: "#aaa" } },
    },
    plugins: { legend: { labels: { color: "white" } } }
  };

  if (loading) return <div style={{textAlign: "center", color: "white", marginTop: "50px"}}>Loading...</div>;
  if (error) return <div style={{textAlign: "center", color: "#ef4444", marginTop: "50px"}}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📊 Student Dashboard</h2>

      {/* 1. Bar Chart (Average Scores) - Stacked Top */}
      <div style={styles.card}>
        <h3 style={{margin: "0 0 15px 0", color: "#ddd"}}>Subject Averages</h3>
        <div style={styles.chartWrapper}>
          {chartData.bar ? (
            <Bar data={chartData.bar} options={chartOptions} />
          ) : (
             <p style={{color: "#777"}}>Not enough data for averages.</p>
          )}
        </div>
      </div>

      {/* 2. Line Chart (Timeline) - Stacked Middle */}
      <div style={styles.card}>
        <div style={styles.chartHeader}>
          <h3 style={{margin: 0, color: "#ddd"}}>Performance Timeline</h3>
          
          {/* Dropdown for Line Chart */}
          <select 
            style={styles.select}
            value={chartSubjectFilter}
            onChange={(e) => setChartSubjectFilter(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={styles.chartWrapper}>
          {chartData.line ? (
            <Line data={chartData.line} options={chartOptions} />
          ) : (
            <p style={{color: "#777"}}>No quiz data available.</p>
          )}
        </div>
      </div>

      {/* 3. Detailed Table - Stacked Bottom */}
      <div style={styles.card}>
        <div style={styles.chartHeader}>
          <h3 style={{margin: 0, color: "#ddd"}}>Detailed History</h3>
          
          {/* Dropdown for Table Filtering */}
          <select 
            style={styles.select}
            value={tableSubjectFilter}
            onChange={(e) => setTableSubjectFilter(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th} onClick={() => requestSort("quiz_title")}>Quiz Name ⬍</th>
                <th style={styles.th} onClick={() => requestSort("subject")}>Subject ⬍</th>
                <th style={styles.th} onClick={() => requestSort("score")}>Score ⬍</th>
                <th style={styles.th} onClick={() => requestSort("submitted_at")}>Date ⬍</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {processedTableData.length === 0 && (
                <tr><td colSpan="5" style={{...styles.td, textAlign:"center"}}>No records found.</td></tr>
              )}
              {processedTableData.map((attempt) => (
                <React.Fragment key={attempt.id}>
                  <tr style={{ backgroundColor: "#2a2a2a" }}>
                    <td style={styles.td}>{attempt.quiz_title}</td>
                    <td style={styles.td}>{attempt.subject}</td>
                    <td style={{...styles.td, fontWeight: "bold", color: "#10b981"}}>{attempt.score}</td>
                    <td style={styles.td}>{new Date(attempt.submitted_at).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      <button 
                        style={styles.btn}
                        onClick={() => setExpandedAttempt(expandedAttempt === attempt.id ? null : attempt.id)}
                      >
                        {expandedAttempt === attempt.id ? "Close" : "Review"}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Table (Nested) */}
                  {expandedAttempt === attempt.id && (
                    <tr>
                      <td colSpan="5" style={{ padding: "0 15px 15px 15px", backgroundColor: "#252525" }}>
                        <div style={{padding: "15px", backgroundColor: "#1a1a1a", borderRadius: "8px", marginTop: "10px"}}>
                            <h4 style={{marginTop: 0, marginBottom: "10px", color: "#aaa"}}>Answer Key</h4>
                            <table style={{width: "100%", borderCollapse: "collapse"}}>
                                <thead>
                                    <tr style={{borderBottom: "1px solid #444"}}>
                                        <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Question</th>
                                        <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Your Ans</th>
                                        <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Correct Ans</th>
                                        <th style={{padding: "8px", textAlign: "left", color: "#888"}}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attempt.answers.map((ans, idx) => (
                                        <tr key={idx} style={{borderBottom: "1px solid #333"}}>
                                            <td style={{padding: "10px", color: "#ddd"}}>{ans.question_text}</td>
                                            <td style={{padding: "10px", color: "#ddd"}}>{ans.selected_option}) {ans.selected_option_text}</td>
                                            <td style={{padding: "10px", color: "#ddd"}}>{ans.correct_option}) {ans.correct_option_text}</td>
                                            <td style={{padding: "10px"}}>
                                                <span style={styles.badge(ans.is_correct)}>
                                                    {ans.is_correct ? "Correct" : "Wrong"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}