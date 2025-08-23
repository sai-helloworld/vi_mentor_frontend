import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import Notes from "./pages/Notes";
import Quizes from "./pages/Quizes";
import Charts from "./pages/Charts";

function App() {
  return (
    <Router>
      <AnimatedNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </Router>
  );
}

export default App;
