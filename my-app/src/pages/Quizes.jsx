import React, { useState, useEffect } from "react";

export default function Quizes({ role, email }) {
  const [teacherId, setTeacherId] = useState(null);
  const [quizId, setQuizId] = useState(null);

  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    subject_id: "",
    section_id: "",
  });

  const [questionForm, setQuestionForm] = useState({
    text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "",
  });

  const [quizMessage, setQuizMessage] = useState("");
  const [questionMessage, setQuestionMessage] = useState("");

  // 🔍 Fetch teacher ID if role is faculty
  useEffect(() => {
    const fetchTeacherId = async () => {
      if (role === "faculty" && email) {
        try {
          const res = await fetch(`http://localhost:8000/api/teacher/id/?email=${email}`);
          const result = await res.json();
          if (res.ok) {
            setTeacherId(result.teacher_id);
          } else {
            setQuizMessage(`❌ ${result.error || "Teacher not found."}`);
          }
        } catch (err) {
          setQuizMessage("❌ Server error while fetching teacher ID.");
        }
      }
    };
    fetchTeacherId();
  }, [role, email]);

  // Handle quiz form input
  const handleQuizChange = (e) => {
    setQuizForm({ ...quizForm, [e.target.id]: e.target.value });
  };

  // Handle question form input
  const handleQuestionChange = (e) => {
    setQuestionForm({ ...questionForm, [e.target.id]: e.target.value });
  };

  // Submit quiz
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setQuizMessage("");

    const payload = {
      ...quizForm,
      teacher_id: teacherId,
      subject_id: parseInt(quizForm.subject_id),
      section_id: parseInt(quizForm.section_id),
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
        setQuizMessage(`✅ Quiz created! ID: ${result.quiz_id}`);
      } else {
        setQuizMessage(`❌ ${result.error || "Quiz creation failed."}`);
      }
    } catch (err) {
      setQuizMessage("❌ Server error.");
    }
  };

  // Submit question
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setQuestionMessage("");

    const payload = {
      quiz_id: quizId,
      ...questionForm,
      correct_option: questionForm.correct_option.toUpperCase(),
    };

    try {
      const res = await fetch("http://localhost:8000/api/quiz/add-question/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        setQuestionMessage(`✅ Question added! ID: ${result.question_id}`);
        setQuestionForm({
          text: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_option: "",
        });
      } else {
        setQuestionMessage(`❌ ${result.error || "Failed to add question."}`);
      }
    } catch (err) {
      setQuestionMessage("❌ Server error.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", backgroundColor: "black", color: "white", maxWidth: "700px", margin: "auto" }}>
      <h2>Create a Quiz</h2>

      {role === "faculty" && teacherId && (
        <p><strong>Teacher ID:</strong> {teacherId}</p>
      )}

      <form onSubmit={handleQuizSubmit}>
        <input type="text" id="title" placeholder="Title" value={quizForm.title} onChange={handleQuizChange} required />
        <textarea id="description" placeholder="Description" value={quizForm.description} onChange={handleQuizChange} required />
        <input type="number" id="subject_id" placeholder="Subject ID" value={quizForm.subject_id} onChange={handleQuizChange} required />
        <input type="number" id="section_id" placeholder="Section ID" value={quizForm.section_id} onChange={handleQuizChange} required />
        <button type="submit" disabled={!teacherId}>Create Quiz</button>
      </form>

      {quizMessage && <p>{quizMessage}</p>}

      {quizId && (
        <div style={{ marginTop: "30px" }}>
          <h3>Add Questions to Quiz #{quizId}</h3>
          <form onSubmit={handleQuestionSubmit}>
            <textarea id="text" placeholder="Question Text" value={questionForm.text} onChange={handleQuestionChange} required />
            <input type="text" id="option_a" placeholder="Option A" value={questionForm.option_a} onChange={handleQuestionChange} required />
            <input type="text" id="option_b" placeholder="Option B" value={questionForm.option_b} onChange={handleQuestionChange} required />
            <input type="text" id="option_c" placeholder="Option C" value={questionForm.option_c} onChange={handleQuestionChange} required />
            <input type="text" id="option_d" placeholder="Option D" value={questionForm.option_d} onChange={handleQuestionChange} required />
            <input type="text" id="correct_option" placeholder="Correct Option (A/B/C/D)" value={questionForm.correct_option} onChange={handleQuestionChange} required />
            <button type="submit">Add Question</button>
          </form>
          {questionMessage && <p>{questionMessage}</p>}
        </div>
      )}
    </div>
  );
}
