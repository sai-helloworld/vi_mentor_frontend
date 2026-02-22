// // Charts.jsx
// import React, { useEffect, useState } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Charts = () => {
//   const [performanceData, setPerformanceData] = useState([]);

//   useEffect(() => {
//     const teacherId = localStorage.getItem("teacher_id"); // 🔑 get teacher_id
//     if (!teacherId) return;

//     fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}/performance/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setPerformanceData(data);
//       })
//       .catch((err) => console.error("Error fetching performance data:", err));
//   }, []);

//   // 📌 Prepare chart data
//   const labels = performanceData.map((attempt) => attempt.student_name);
//   const scores = performanceData.map((attempt) => attempt.score);

//   const barData = {
//     labels,
//     datasets: [
//       {
//         label: "Quiz Scores",
//         data: scores,
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//       },
//     ],
//   };

//   const lineData = {
//     labels,
//     datasets: [
//       {
//         label: "Quiz Scores Trend",
//         data: scores,
//         borderColor: "rgba(255, 99, 132, 0.8)",
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <div style={{ width: "80%", margin: "auto" }}>
//       <h2 className="text-xl font-bold mb-4">📊 Student Performance</h2>

//       <div style={{ marginBottom: "40px" }}>
//         <Bar data={barData} options={{ responsive: true }} />
//       </div>

//       <div>
//         <Line data={lineData} options={{ responsive: true }} />
//       </div>
//     </div>
//   );
// };

// export default Charts;





import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // 📌 Required for Line charts
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

const Charts = () => {
  const [performanceData, setPerformanceData] = useState([]);
  
  // 📌 State for dropdown selections
  const [selectedQuiz1, setSelectedQuiz1] = useState("");
  const [selectedStudent2, setSelectedStudent2] = useState("");
  const [selectedQuiz3, setSelectedQuiz3] = useState("");

  useEffect(() => {
    const teacherId = localStorage.getItem("teacher_id"); // 🔑 get teacher_id
    if (!teacherId) return;

    fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}/performance/`)
      .then((res) => res.json())
      .then((data) => {
        setPerformanceData(data);

        // 📌 Set initial default selections once data is fetched
        const quizzes = [...new Set(data.map((d) => d.quiz_title))];
        const uniqueStudents = [...new Set(data.map((d) => d.student_roll))];
        
        if (quizzes.length > 0) {
          setSelectedQuiz1(quizzes[0]);
          setSelectedQuiz3(quizzes[0]);
        }
        if (uniqueStudents.length > 0) {
          setSelectedStudent2(uniqueStudents[0]);
        }
      })
      .catch((err) => console.error("Error fetching performance data:", err));
  }, []);

  // 📌 Derived Lists for Dropdowns
  const uniqueQuizzes = [...new Set(performanceData.map((d) => d.quiz_title))];
  
  // Create an array of unique [roll, name] to populate the student dropdown
  const uniqueStudents = Array.from(
    new Map(performanceData.map((d) => [d.student_roll, d.student_name])).entries()
  );

  // ==========================================================
  // 📊 CHART 1: Quiz-wise all students score (Histogram/Bar)
  // ==========================================================
  const chart1Data = performanceData.filter((d) => d.quiz_title === selectedQuiz1);
  const barData1 = {
    labels: chart1Data.map((d) => d.student_name),
    datasets: [
      {
        label: `Scores for ${selectedQuiz1}`,
        data: chart1Data.map((d) => d.score),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // ==========================================================
  // 📈 CHART 2: Individual student score trend (Line)
  // ==========================================================
  const chart2Data = performanceData
    .filter((d) => d.student_roll === selectedStudent2)
    // Sort by submission date to show an accurate chronological trend
    .sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at)); 

  const lineData2 = {
    labels: chart2Data.map((d) => d.quiz_title), // X-axis: Quizzes they took
    datasets: [
      {
        label: `Score Trend`,
        data: chart2Data.map((d) => d.score),
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.3, // Adds a slight curve to the line
      },
    ],
  };

  // ==========================================================
  // 📊 CHART 3: Total attempts per quiz (Bar)
  // ==========================================================
  const chart3Data = performanceData.filter((d) => d.quiz_title === selectedQuiz3);
  const totalAttempts = chart3Data.length;

  const barData3 = {
    labels: [selectedQuiz3],
    datasets: [
      {
        label: "Total Students Attempted",
        data: [totalAttempts],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        maxBarThickness: 150, // Prevents the single bar from becoming too wide
      },
    ],
  };

  return (
    <div style={{ width: "70%", margin: "auto", paddingBottom: "50px" }}>
      <h1 className="text-5xl font-bold mb-8 text-center">Dashboard Analytics</h1>

      {/* --- CHART 1 SECTION --- */}
      <div style={{ marginBottom: "60px" }}>
        <h3 className="text-xl font-semibold mb-2">1. Student Scores by Quiz</h3>
        <select
          className="mb-4 p-2 border border-gray-300 rounded"
          value={selectedQuiz1}
          onChange={(e) => setSelectedQuiz1(e.target.value)}
        >
          {uniqueQuizzes.map((quiz) => (
            <option key={`c1-${quiz}`} value={quiz} className="bg-black text-white">
              {quiz}
            </option>
          ))}
        </select>
        <Bar data={barData1} options={{ responsive: true }} />
      </div>

      <hr style={{ marginBottom: "40px" }} />

      {/* --- CHART 2 SECTION --- */}
      <div style={{ marginBottom: "60px" }}>
        <h3 className="text-xl font-semibold mb-2">2. Individual Student Trend</h3>
        <select
          className="mb-4 p-2 border border-gray-300 rounded"
          value={selectedStudent2}
          onChange={(e) => setSelectedStudent2(e.target.value)}
        >
          {uniqueStudents.map(([roll, name]) => (
            <option key={`c2-${roll}`} value={roll} className='bg-black text-white'>
              {name} ({roll})
            </option>
          ))}
        </select>
        <Line 
          data={lineData2} 
          options={{ 
            responsive: true,
            scales: { y: { beginAtZero: true } } 
          }} 
        />
      </div>

      <hr style={{ marginBottom: "40px" }} />

      {/* --- CHART 3 SECTION --- */}
      <div style={{ marginBottom: "60px" }}>
        <h3 className="text-xl font-semibold mb-2">3. Total Quiz Attempts</h3>
        <select
          className="mb-4 p-2 border border-gray-300 rounded"
          value={selectedQuiz3}
          onChange={(e) => setSelectedQuiz3(e.target.value)}
        >
          {uniqueQuizzes.map((quiz) => (
            <option key={`c3-${quiz}`} value={quiz} className='bg-black text-white'>
              {quiz}
            </option>
          ))}
        </select>
        <Bar 
          data={barData3} 
          options={{ 
            responsive: true,
            scales: { 
              y: { 
                beginAtZero: true, 
                ticks: { stepSize: 1 } // Ensures counts are whole numbers
              } 
            } 
          }} 
        />
      </div>

    </div>
  );
};

export default Charts;