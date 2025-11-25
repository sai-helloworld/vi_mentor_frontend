// import React, { useEffect, useState } from "react";

// export default function AttemptQuiz() {
//   const [attempts, setAttempts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAttempts = async () => {
//       try {
//         const rollNumber = localStorage.getItem("student_roll_number"); // ✅ get stored roll number
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
//         } else {
//           setError(result.error || "Failed to fetch quiz attempts.");
//         }
//       } catch (err) {
//         setError("Server error. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttempts();
//   }, []);

//   if (loading) return <p>Loading quiz attempts...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="quiz-attempts">
//       <h2>My Quiz Attempts</h2>
//       {attempts.length === 0 ? (
//         <p>No quiz attempts found.</p>
//       ) : (
//         <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
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
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function SubjectWiseScores() {
//   const [chartData, setChartData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const rollNumber = localStorage.getItem("student_roll_number");
//         const response = await fetch(
//           `http://localhost:8000/api/student/${rollNumber}/quiz-attempts/`
//         );
//         const result = await response.json();

//         if (response.ok) {
//           // Group scores by subject
//           const subjectScores = {};
//           result.attempts.forEach((attempt) => {
//             const subject = attempt.subject;
//             if (!subjectScores[subject]) {
//               subjectScores[subject] = [];
//             }
//             subjectScores[subject].push(attempt.score);
//           });

//           // Average score per subject
//           const labels = Object.keys(subjectScores);
//           const scores = labels.map((subj) => {
//             const arr = subjectScores[subj];
//             return arr.reduce((a, b) => a + b, 0) / arr.length;
//           });

//           setChartData({
//             labels,
//             datasets: [
//               {
//                 label: "Average Score per Subject",
//                 data: scores,
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//               },
//             ],
//           });
//         } else {
//           setError(result.error || "Failed to fetch data");
//         }
//       } catch (err) {
//         setError("Server error");
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) return <p className="error">{error}</p>;
//   if (!chartData) return <p>Loading...</p>;

//   return (
//     <div style={{ width: "600px", margin: "auto" }}>
//       <h2>Subject-wise Quiz Scores</h2>
//       <Bar data={chartData} options={{ responsive: true }} />
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
//   TimeScale,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale
// );

// export default function SubjectWiseScores() {
//   const [barData, setBarData] = useState(null);
//   const [lineData, setLineData] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const rollNumber = localStorage.getItem("student_roll_number");
//         const response = await fetch(
//           `http://localhost:8000/api/student/${rollNumber}/quiz-attempts/`
//         );
//         const result = await response.json();

//         if (response.ok) {
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

//           setSubjects(labels);
//           if (labels.length > 0) {
//             setSelectedSubject(labels[0]); // default selection
//           }

//           // Prepare line chart for default subject
//           if (labels.length > 0) {
//             const subj = labels[0];
//             const attempts = subjectScores[subj];
//             setLineData({
//               labels: attempts.map((a) =>
//                 new Date(a.submitted_at).toLocaleDateString()
//               ),
//               datasets: [
//                 {
//                   label: `Scores for ${subj}`,
//                   data: attempts.map((a) => a.score),
//                   borderColor: "rgba(75, 192, 192, 1)",
//                   backgroundColor: "rgba(75, 192, 192, 0.2)",
//                   fill: true,
//                 },
//               ],
//             });
//           }
//         } else {
//           setError(result.error || "Failed to fetch data");
//         }
//       } catch (err) {
//         setError("Server error");
//       }
//     };

//     fetchData();
//   }, []);

//   // Update line chart when subject changes
//   const handleSubjectChange = (e) => {
//     const subj = e.target.value;
//     setSelectedSubject(subj);

//     const rollNumber = localStorage.getItem("student_roll_number");
//     fetch(`http://localhost:8000/api/student/${rollNumber}/quiz-attempts/`)
//       .then((res) => res.json())
//       .then((result) => {
//         const attempts = result.attempts.filter(
//           (a) => a.subject === subj
//         );
//         setLineData({
//           labels: attempts.map((a) =>
//             new Date(a.submitted_at).toLocaleDateString()
//           ),
//           datasets: [
//             {
//               label: `Scores for ${subj}`,
//               data: attempts.map((a) => a.score),
//               borderColor: "rgba(153, 102, 255, 1)",
//               backgroundColor: "rgba(153, 102, 255, 0.2)",
//               fill: true,
//             },
//           ],
//         });
//       });
//   };

//   if (error) return <p className="error">{error}</p>;
//   if (!barData) return <p>Loading...</p>;

//   return (
//     <div style={{ width: "800px", margin: "auto" }}>
//       <h2>Subject-wise Quiz Scores</h2>
//       <Bar data={barData} options={{ responsive: true }} />

//       <div style={{ marginTop: "20px" }}>
//         <h3>Track Progress by Subject</h3>
//         <select value={selectedSubject} onChange={handleSubjectChange}>
//           {subjects.map((subj, idx) => (
//             <option key={idx} value={subj}>
//               {subj}
//             </option>
//           ))}
//         </select>
//       </div>

//       {lineData && (
//         <div style={{ marginTop: "20px" }}>
//           <Line data={lineData} options={{ responsive: true }} />
//         </div>
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

        if (response.ok) {
          setAttempts(result.attempts || []);

          // Group scores by subject
          const subjectScores = {};
          result.attempts.forEach((attempt) => {
            const subject = attempt.subject;
            if (!subjectScores[subject]) {
              subjectScores[subject] = [];
            }
            subjectScores[subject].push({
              score: attempt.score,
              submitted_at: attempt.submitted_at,
            });
          });

          // Average score per subject for bar chart
          const labels = Object.keys(subjectScores);
          const scores = labels.map((subj) => {
            const arr = subjectScores[subj].map((a) => a.score);
            return arr.reduce((a, b) => a + b, 0) / arr.length;
          });

          setBarData({
            labels,
            datasets: [
              {
                label: "Average Score per Subject",
                data: scores,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });

          setSubjects(["All subjects", ...labels]);

          // ✅ Default line chart: all attempts
          setLineData({
            labels: result.attempts.map((a) =>
              new Date(a.submitted_at).toLocaleDateString()
            ),
            datasets: [
              {
                label: "Scores for All Quizzes",
                data: result.attempts.map((a) => a.score),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
              },
            ],
          });
        } else {
          setError(result.error || "Failed to fetch quiz attempts.");
        }
      } catch (err) {
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

    let filteredAttempts = attempts;
    if (subj !== "All subjects") {
      filteredAttempts = attempts.filter((a) => a.subject === subj);
    }

    setLineData({
      labels: filteredAttempts.map((a) =>
        new Date(a.submitted_at).toLocaleDateString()
      ),
      datasets: [
        {
          label:
            subj === "All subjects"
              ? "Scores for All Quizzes"
              : `Scores for ${subj}`,
          data: filteredAttempts.map((a) => a.score),
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

      {/* Bar chart */}
      {barData && (
        <div style={{ marginBottom: "30px" }}>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
      )}

      {/* Dropdown + line chart */}
      {subjects.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h3>Track Progress</h3>
          <select value={selectedSubject} onChange={handleSubjectChange}>
            {subjects.map((subj, idx) => (
              <option key={idx} value={subj}>
                {subj}
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

      {/* Table view */}
      <h3>Detailed Quiz Attempts</h3>
      {attempts.length === 0 ? (
        <p>No quiz attempts found.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ width: "100%", marginTop: "10px" }}
        >
          <thead>
            <tr>
              <th>Quiz Title</th>
              <th>Description</th>
              <th>Subject</th>
              <th>Score</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt, index) => (
              <tr key={index}>
                <td>{attempt.quiz_title}</td>
                <td>{attempt.quiz_description}</td>
                <td>{attempt.subject}</td>
                <td>{attempt.score}</td>
                <td>{new Date(attempt.submitted_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* List view */}
      <div style={{ marginTop: "20px" }}>
        <h3>List of Quizzes Attempted</h3>
        <ul>
          {attempts.map((attempt, index) => (
            <li key={index}>
              <strong>{attempt.quiz_title}</strong> ({attempt.subject}) — Score:{" "}
              {attempt.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
