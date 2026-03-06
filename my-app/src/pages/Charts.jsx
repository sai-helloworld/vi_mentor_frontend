// import React, { useEffect, useState } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement, // 📌 Required for Line charts
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

// const Charts = () => {
//   const [performanceData, setPerformanceData] = useState([]);
  
//   // 📌 State for dropdown selections
//   const [selectedQuiz1, setSelectedQuiz1] = useState("");
//   const [selectedStudent2, setSelectedStudent2] = useState("");
//   const [selectedQuiz3, setSelectedQuiz3] = useState("");

//   useEffect(() => {
//     const teacherId = localStorage.getItem("teacher_id"); // 🔑 get teacher_id
//     if (!teacherId) return;

//     fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}/performance/`)
//       .then((res) => res.json())
//       .then((data) => {
//         setPerformanceData(data);

//         // 📌 Set initial default selections once data is fetched
//         const quizzes = [...new Set(data.map((d) => d.quiz_title))];
//         const uniqueStudents = [...new Set(data.map((d) => d.student_roll))];
        
//         if (quizzes.length > 0) {
//           setSelectedQuiz1(quizzes[0]);
//           setSelectedQuiz3(quizzes[0]);
//         }
//         if (uniqueStudents.length > 0) {
//           setSelectedStudent2(uniqueStudents[0]);
//         }
//       })
//       .catch((err) => console.error("Error fetching performance data:", err));
//   }, []);

//   // 📌 Derived Lists for Dropdowns
//   const uniqueQuizzes = [...new Set(performanceData.map((d) => d.quiz_title))];
  
//   // Create an array of unique [roll, name] to populate the student dropdown
//   const uniqueStudents = Array.from(
//     new Map(performanceData.map((d) => [d.student_roll, d.student_name])).entries()
//   );

//   // ==========================================================
//   // 📊 CHART 1: Quiz-wise all students score (Histogram/Bar)
//   // ==========================================================
//   const chart1Data = performanceData.filter((d) => d.quiz_title === selectedQuiz1);
//   const barData1 = {
//     labels: chart1Data.map((d) => d.student_name),
//     datasets: [
//       {
//         label: `Scores for ${selectedQuiz1}`,
//         data: chart1Data.map((d) => d.score),
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//       },
//     ],
//   };

//   // ==========================================================
//   // 📈 CHART 2: Individual student score trend (Line)
//   // ==========================================================
//   const chart2Data = performanceData
//     .filter((d) => d.student_roll === selectedStudent2)
//     // Sort by submission date to show an accurate chronological trend
//     .sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at)); 

//   const lineData2 = {
//     labels: chart2Data.map((d) => d.quiz_title), // X-axis: Quizzes they took
//     datasets: [
//       {
//         label: `Score Trend`,
//         data: chart2Data.map((d) => d.score),
//         borderColor: "rgba(255, 99, 132, 0.8)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         fill: true,
//         tension: 0.3, // Adds a slight curve to the line
//       },
//     ],
//   };

//   // ==========================================================
//   // 📊 CHART 3: Total attempts per quiz (Bar)
//   // ==========================================================
//   const chart3Data = performanceData.filter((d) => d.quiz_title === selectedQuiz3);
//   const totalAttempts = chart3Data.length;

//   const barData3 = {
//     labels: [selectedQuiz3],
//     datasets: [
//       {
//         label: "Total Students Attempted",
//         data: [totalAttempts],
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         maxBarThickness: 150, // Prevents the single bar from becoming too wide
//       },
//     ],
//   };

//   return (
//     <div style={{ width: "70%", margin: "auto", paddingBottom: "50px" }}>
//       <h1 className="text-5xl font-bold mb-8 text-center">Dashboard Analytics</h1>

//       {/* --- CHART 1 SECTION --- */}
//       <div style={{ marginBottom: "60px" }}>
//         <h3 className="text-xl font-semibold mb-2">1. Student Scores by Quiz</h3>
//         <select
//           className="mb-4 p-2 border border-gray-300 rounded"
//           value={selectedQuiz1}
//           onChange={(e) => setSelectedQuiz1(e.target.value)}
//         >
//           {uniqueQuizzes.map((quiz) => (
//             <option key={`c1-${quiz}`} value={quiz} className="bg-black text-white">
//               {quiz}
//             </option>
//           ))}
//         </select>
//         <Bar data={barData1} options={{ responsive: true }} />
//       </div>

//       <hr style={{ marginBottom: "40px" }} />

//       {/* --- CHART 2 SECTION --- */}
//       <div style={{ marginBottom: "60px" }}>
//         <h3 className="text-xl font-semibold mb-2">2. Individual Student Trend</h3>
//         <select
//           className="mb-4 p-2 border border-gray-300 rounded"
//           value={selectedStudent2}
//           onChange={(e) => setSelectedStudent2(e.target.value)}
//         >
//           {uniqueStudents.map(([roll, name]) => (
//             <option key={`c2-${roll}`} value={roll} className='bg-black text-white'>
//               {name} ({roll})
//             </option>
//           ))}
//         </select>
//         <Line 
//           data={lineData2} 
//           options={{ 
//             responsive: true,
//             scales: { y: { beginAtZero: true } } 
//           }} 
//         />
//       </div>

//       <hr style={{ marginBottom: "40px" }} />

//       {/* --- CHART 3 SECTION --- */}
//       <div style={{ marginBottom: "60px" }}>
//         <h3 className="text-xl font-semibold mb-2">3. Total Quiz Attempts</h3>
//         <select
//           className="mb-4 p-2 border border-gray-300 rounded"
//           value={selectedQuiz3}
//           onChange={(e) => setSelectedQuiz3(e.target.value)}
//         >
//           {uniqueQuizzes.map((quiz) => (
//             <option key={`c3-${quiz}`} value={quiz} className='bg-black text-white'>
//               {quiz}
//             </option>
//           ))}
//         </select>
//         <Bar 
//           data={barData3} 
//           options={{ 
//             responsive: true,
//             scales: { 
//               y: { 
//                 beginAtZero: true, 
//                 ticks: { stepSize: 1 } // Ensures counts are whole numbers
//               } 
//             } 
//           }} 
//         />
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

const Charts = () => {
  const [performanceData, setPerformanceData] = useState([]);
  
  // 📌 State for Chart dropdown selections
  const [selectedQuiz1, setSelectedQuiz1] = useState("");
  const [selectedStudent2, setSelectedStudent2] = useState("");
  const [selectedQuiz3, setSelectedQuiz3] = useState("");

  // 🤖 State for Chatbot Questions
  const [chatQuestions, setChatQuestions] = useState([]);
  const [chatStudentFilter, setChatStudentFilter] = useState("All");
  const [chatSortOrder, setChatSortOrder] = useState("desc"); // 'desc' = Newest, 'asc' = Oldest

  useEffect(() => {
    const teacherId = localStorage.getItem("teacher_id"); // 🔑 get teacher_id
    if (!teacherId) return;

    // 1️⃣ Fetch Performance Data (Existing)
    fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}/performance/`)
      .then((res) => res.json())
      .then((data) => {
        setPerformanceData(data);
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

    // 2️⃣ Fetch Chatbot Questions Data (New)
    fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}/chatbot-questions/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) {
          setChatQuestions(data.questions);
        }
      })
      .catch((err) => console.error("Error fetching chat questions:", err));
  }, []);

  // 📌 Derived Lists for Chart Dropdowns
  const uniqueQuizzes = [...new Set(performanceData.map((d) => d.quiz_title))];
  const uniqueStudents = Array.from(
    new Map(performanceData.map((d) => [d.student_roll, d.student_name])).entries()
  );

  // ==========================================================
  // 📊 CHART 1: Quiz-wise all students score
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
  // 📈 CHART 2: Individual student score trend
  // ==========================================================
  const chart2Data = performanceData
    .filter((d) => d.student_roll === selectedStudent2)
    .sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at)); 

  const lineData2 = {
    labels: chart2Data.map((d) => d.quiz_title), 
    datasets: [
      {
        label: `Score Trend`,
        data: chart2Data.map((d) => d.score),
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.3, 
      },
    ],
  };

  // ==========================================================
  // 📊 CHART 3: Total attempts per quiz
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
        maxBarThickness: 150, 
      },
    ],
  };

  // ==========================================================
  // 🤖 CHATBOT QUESTIONS LOGIC (Filtering & Sorting)
  // ==========================================================
  // Get unique student names for the filter dropdown
  const uniqueChatStudents = ["All", ...new Set(chatQuestions.map((q) => q.student_name))];

  // Apply Filter and Sort
  const displayedChatQuestions = chatQuestions
    .filter((q) => chatStudentFilter === "All" || q.student_name === chatStudentFilter)
    .sort((a, b) => {
      const dateA = new Date(a.asked_at);
      const dateB = new Date(b.asked_at);
      return chatSortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div style={{ width: "80%", margin: "auto", paddingBottom: "50px", paddingTop: "20px" }}>
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
                ticks: { stepSize: 1 } 
              } 
            } 
          }} 
        />
      </div>

      <hr style={{ marginBottom: "40px" }} />

      {/* --- 🤖 CHATBOT QUESTIONS SECTION --- */}
      <div style={{ marginBottom: "60px" }}>
        <h3 className="text-2xl font-bold mb-4">💬 Student Chatbot Inquiries</h3>
        
        {/* Filter & Sort Controls */}
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Student:</label>
            <select
              className="p-2 border border-gray-300 rounded min-w-[200px]"
              value={chatStudentFilter}
              onChange={(e) => setChatStudentFilter(e.target.value)}
            >
              {uniqueChatStudents.map((name, idx) => (
                <option key={`chat-student-${idx}`} value={name} className="bg-black text-white">
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sort by Date:</label>
            <select
              className="p-2 border border-gray-300 rounded min-w-[150px]"
              value={chatSortOrder}
              onChange={(e) => setChatSortOrder(e.target.value)}
            >
              <option value="desc" className="bg-black text-white">Newest First</option>
              <option value="asc" className="bg-black text-white">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
          <table className="min-w-full bg-black text-left text-sm font-light">
            <thead className="border-b bg-grey-50 font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">Student</th>
                <th scope="col" className="px-6 py-4">Subject (Section)</th>
                <th scope="col" className="px-6 py-4">Question Asked</th>
                <th scope="col" className="px-6 py-4">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {displayedChatQuestions.length > 0 ? (
                displayedChatQuestions.map((q) => (
                  <tr key={q.message_id} className="border-b">
                    <td className="px-6 py-4 font-semibold">
                      {q.student_name} <br/>
                      <span className="text-xs text-white-500 font-normal">{q.student_roll}</span>
                    </td>
                    <td className="px-6 py-4">
                      {q.subject} <br/>
                      <span className="text-xs text-white-500 font-normal">Sec: {q.section}</span>
                    </td>
                    <td className="px-6 py-4 max-w-md break-words text-white-800">
                      "{q.question}"
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white-600">
                      {new Date(q.asked_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No questions found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Charts;