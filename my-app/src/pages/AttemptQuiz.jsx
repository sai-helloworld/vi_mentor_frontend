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

//         if (response.ok) {
//           setAttempts(result.attempts || []);

//           // Group scores by subject
//           const subjectScores = {};
//           result.attempts.forEach((attempt) => {
//             const subject = attempt.subject;
//             if (!subjectScores[subject]) {
//               subjectScores[subject] = [];
//             }
//             subjectScores[subject].push({
//               score: attempt.score,
//               submitted_at: attempt.submitted_at,
//             });
//           });

//           // Average score per subject for bar chart
//           const labels = Object.keys(subjectScores);
//           const scores = labels.map((subj) => {
//             const arr = subjectScores[subj].map((a) => a.score);
//             return arr.reduce((a, b) => a + b, 0) / arr.length;
//           });

//           setBarData({
//             labels,
//             datasets: [
//               {
//                 label: "Average Score per Subject",
//                 data: scores,
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//               },
//             ],
//           });

//           setSubjects(["All subjects", ...labels]);

//           // ✅ Default line chart: all attempts
//           setLineData({
//             labels: result.attempts.map((a) =>
//               new Date(a.submitted_at).toLocaleDateString()
//             ),
//             datasets: [
//               {
//                 label: "Scores for All Quizzes",
//                 data: result.attempts.map((a) => a.score),
//                 borderColor: "rgba(54, 162, 235, 1)",
//                 backgroundColor: "rgba(54, 162, 235, 0.2)",
//                 fill: true,
//               },
//             ],
//           });
//         } else {
//           setError(result.error || "Failed to fetch quiz attempts.");
//         }
//       } catch (err) {
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

//     let filteredAttempts = attempts;
//     if (subj !== "All subjects") {
//       filteredAttempts = attempts.filter((a) => a.subject === subj);
//     }

//     setLineData({
//       labels: filteredAttempts.map((a) =>
//         new Date(a.submitted_at).toLocaleDateString()
//       ),
//       datasets: [
//         {
//           label:
//             subj === "All subjects"
//               ? "Scores for All Quizzes"
//               : `Scores for ${subj}`,
//           data: filteredAttempts.map((a) => a.score),
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

//       {/* Bar chart */}
//       {barData && (
//         <div style={{ marginBottom: "30px" }}>
//           <Bar data={barData} options={{ responsive: true }} />
//         </div>
//       )}

//       {/* Dropdown + line chart */}
//       {subjects.length > 0 && (
//         <div style={{ marginBottom: "30px" }}>
//           <h3>Track Progress</h3>
//           <select value={selectedSubject} onChange={handleSubjectChange}>
//             {subjects.map((subj, idx) => (
//               <option key={idx} value={subj}>
//                 {subj}
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

//       {/* Table view */}
//       <h3>Detailed Quiz Attempts</h3>
//       {attempts.length === 0 ? (
//         <p>No quiz attempts found.</p>
//       ) : (
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ width: "100%", marginTop: "10px" }}
//         >
//           <thead>
//             <tr>
//               <th>Quiz Title</th>
//               <th>Description</th>
//               <th>Subject</th>
//               <th>Score</th>
//               <th>Submitted At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attempts.map((attempt, index) => (
//               <tr key={index}>
//                 <td>{attempt.quiz_title}</td>
//                 <td>{attempt.quiz_description}</td>
//                 <td>{attempt.subject}</td>
//                 <td>{attempt.score}</td>
//                 <td>{new Date(attempt.submitted_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* List view */}
//       <div style={{ marginTop: "20px" }}>
//         <h3>List of Quizzes Attempted</h3>
//         <ul>
//           {attempts.map((attempt, index) => (
//             <li key={index}>
//               <strong>{attempt.quiz_title}</strong> ({attempt.subject}) — Score:{" "}
//               {attempt.score}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



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
//   const [expandedAttempt, setExpandedAttempt] = useState(null); // 🔑 track expanded quiz
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

//         if (response.ok) {
//           setAttempts(result.attempts || []);
//           // ... same chart logic as before ...
//         } else {
//           setError(result.error || "Failed to fetch quiz attempts.");
//         }
//       } catch (err) {
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

//     let filteredAttempts = attempts;
//     if (subj !== "All subjects") {
//       filteredAttempts = attempts.filter((a) => a.subject === subj);
//     }

//     setLineData({
//       labels: filteredAttempts.map((a) =>
//         new Date(a.submitted_at).toLocaleDateString()
//       ),
//       datasets: [
//         {
//           label:
//             subj === "All subjects"
//               ? "Scores for All Quizzes"
//               : `Scores for ${subj}`,
//           data: filteredAttempts.map((a) => a.score),
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

//       {/* Bar chart */}
//       {barData && (
//         <div style={{ marginBottom: "30px" }}>
//           <Bar data={barData} options={{ responsive: true }} />
//         </div>
//       )}

//       {/* Dropdown + line chart */}
//       {subjects.length > 0 && (
//         <div style={{ marginBottom: "30px" }}>
//           <h3>Track Progress</h3>
//           <select value={selectedSubject} onChange={handleSubjectChange}>
//             {subjects.map((subj, idx) => (
//               <option key={idx} value={subj}>
//                 {subj}
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

//       {/* Table view */}
//       <h3>Detailed Quiz Attempts</h3>
//       {attempts.length === 0 ? (
//         <p>No quiz attempts found.</p>
//       ) : (
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ width: "100%", marginTop: "10px" }}
//         >
//           <thead>
//             <tr>
//               <th>Quiz Title</th>
//               <th>Description</th>
//               <th>Subject</th>
//               <th>Score</th>
//               <th>Submitted At</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attempts.map((attempt, index) => (
//               <React.Fragment key={index}>
//                 <tr>
//                   <td>{attempt.quiz_title}</td>
//                   <td>{attempt.quiz_description}</td>
//                   <td>{attempt.subject}</td>
//                   <td>{attempt.score}</td>
//                   <td>{new Date(attempt.submitted_at).toLocaleString()}</td>
//                   <td>
//                     <button
//                       onClick={() =>
//                         setExpandedAttempt(
//                           expandedAttempt === index ? null : index
//                         )
//                       }
//                     >
//                       {expandedAttempt === index ? "Hide Details" : "View Details"}
//                     </button>
//                   </td>
//                 </tr>

//                 {/* Expanded row with answers */}
//                 {expandedAttempt === index && attempt.answers && (
//                   <tr>
//                     <td colSpan="6">
//                       <h4>Answers</h4>
//                       <table border="1" cellPadding="6" style={{ width: "100%" }}>
//                         <thead>
//                           <tr>
//                             <th>Question</th>
//                             <th>Chosen Option</th>
//                             <th>Correct Option</th>
//                             <th>Result</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {attempt.answers.map((ans, i) => (
//                             <tr key={i}>
//                               <td>{ans.question_text}</td>
//                               <td>{ans.selected_option}</td>
//                               <td>{ans.correct_option}</td>
//                               <td>
//                                 {ans.is_correct ? "✅ Correct" : "❌ Wrong"}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
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
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All subjects");
  const [attempts, setAttempts] = useState([]);
  const [expandedAttempt, setExpandedAttempt] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

        const attemptsData = result.attempts || [];
        setAttempts(attemptsData);

        /* ---------- BAR CHART (Average per subject) ---------- */
        const subjectScores = {};
        attemptsData.forEach((a) => {
          if (!subjectScores[a.subject]) subjectScores[a.subject] = [];
          subjectScores[a.subject].push(a.score);
        });

        const labels = Object.keys(subjectScores);
        const avgScores = labels.map((s) => {
          const arr = subjectScores[s];
          return arr.reduce((x, y) => x + y, 0) / arr.length;
        });

        setBarData({
          labels,
          datasets: [
            {
              label: "Average Score per Subject",
              data: avgScores,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });

        setSubjects(["All subjects", ...labels]);

        /* ---------- LINE CHART (All attempts default) ---------- */
        setLineData({
          labels: attemptsData.map((a) =>
            new Date(a.submitted_at).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Scores for All Quizzes",
              data: attemptsData.map((a) => a.score),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        });
      } catch {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubjectChange = (e) => {
    const subj = e.target.value;
    setSelectedSubject(subj);

    const filtered =
      subj === "All subjects"
        ? attempts
        : attempts.filter((a) => a.subject === subj);

    setLineData({
      labels: filtered.map((a) =>
        new Date(a.submitted_at).toLocaleDateString()
      ),
      datasets: [
        {
          label:
            subj === "All subjects"
              ? "Scores for All Quizzes"
              : `Scores for ${subj}`,
          data: filtered.map((a) => a.score),
          borderColor:
            subj === "All subjects"
              ? "rgba(54, 162, 235, 1)"
              : "rgba(255, 99, 132, 1)",
          backgroundColor:
            subj === "All subjects"
              ? "rgba(54, 162, 235, 0.2)"
              : "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    });
  };

  if (loading) return <p>Loading quiz attempts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <h2>📊 Quiz Dashboard</h2>

      {/* ---------- BAR CHART ---------- */}
      {barData && (
        <div style={{ marginBottom: "30px" }}>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
      )}

      {/* ---------- LINE CHART ---------- */}
      {subjects.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h3>Track Progress</h3>
          <select value={selectedSubject} onChange={handleSubjectChange}>
            {subjects.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          {lineData && (
            <div style={{ marginTop: "20px" }}>
              <Line data={lineData} options={{ responsive: true }} />
            </div>
          )}
        </div>
      )}

      {/* ---------- TABLE WITH EXPAND ---------- */}
      <h3>Detailed Quiz Attempts</h3>
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Subject</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <td>{a.quiz_title}</td>
                <td>{a.subject}</td>
                <td>{a.score}</td>
                <td>{new Date(a.submitted_at).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() =>
                      setExpandedAttempt(
                        expandedAttempt === idx ? null : idx
                      )
                    }
                  >
                    {expandedAttempt === idx ? "Hide" : "View"}
                  </button>
                </td>
              </tr>

              {expandedAttempt === idx && a.answers && (
                <tr>
                  <td colSpan="5">
                    <table border="1" width="100%">
                      <thead>
  <tr>
    <th>Question</th>
    <th>Your Answer</th>
    <th>Correct Answer</th>
    <th>All Options</th>
    <th>Result</th>
  </tr>
</thead>

                      <tbody>
  {a.answers.map((ans, i) => (
    <tr key={i}>
      <td>{ans.question_text}</td>

      <td>
        <strong>
          {ans.selected_option} — {ans.selected_option_text}
        </strong>
      </td>

      <td>
        <strong>
          {ans.correct_option} — {ans.correct_option_text}
        </strong>
      </td>

      <td>
        <ul style={{ margin: 0, paddingLeft: "15px" }}>
          {Object.entries(ans.options).map(([key, value]) => (
            <li key={key}>
              {key} — {value}
            </li>
          ))}
        </ul>
      </td>

      <td>{ans.is_correct ? "✅ Correct" : "❌ Wrong"}</td>
    </tr>
  ))}
</tbody>

                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
