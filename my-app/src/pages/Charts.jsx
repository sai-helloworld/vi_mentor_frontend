// export default function Charts() {
//   return <h1>Charts</h1>;
// }
// Charts.jsx
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const teacherId = localStorage.getItem("teacher_id"); // 🔑 get teacher_id
    if (!teacherId) return;

    fetch(`http://127.0.0.1:8000/api/teacher/${teacherId}/performance/`)
      .then((res) => res.json())
      .then((data) => {
        setPerformanceData(data);
      })
      .catch((err) => console.error("Error fetching performance data:", err));
  }, []);

  // 📌 Prepare chart data
  const labels = performanceData.map((attempt) => attempt.student_name);
  const scores = performanceData.map((attempt) => attempt.score);

  const barData = {
    labels,
    datasets: [
      {
        label: "Quiz Scores",
        data: scores,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Quiz Scores Trend",
        data: scores,
        borderColor: "rgba(255, 99, 132, 0.8)",
        fill: false,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2 className="text-xl font-bold mb-4">📊 Student Performance</h2>

      <div style={{ marginBottom: "40px" }}>
        <Bar data={barData} options={{ responsive: true }} />
      </div>

      <div>
        <Line data={lineData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Charts;
