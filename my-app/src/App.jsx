

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AnimatedNavbar from "./components/AnimatedNavbar";
// import Home from "./pages/Home";
// import ChatBot from "./pages/ChatBot";
// import Notes from "./pages/Notes";
// import Quizes from "./pages/Quizes";
// import Charts from "./pages/Charts";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");

//   return (
//     <Router>
//       <AnimatedNavbar isAuthenticated={isAuthenticated} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/chatbot" element={<ChatBot />} />
//         <Route path="/notes" element={<Notes />} />
//         <Route path="/quizes" element={<Quizes role={role} email={email} />} />
//         <Route path="/charts" element={<Charts />} />
//         <Route
//           path="/login"
//           element={
//             <Login
//               setIsAuthenticated={setIsAuthenticated}
//               setRole={setRole}
//               setEmail={setEmail}
//             />
//           }
//         />
//         <Route
//           path="/logout"
//           element={<Logout setIsAuthenticated={setIsAuthenticated} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import Notes from "./pages/Notes";
import SendNotes from "./pages/SendNotes"
import Quizes from "./pages/Quizes";
import AttemptQuiz from "./pages/AttemptQuiz";   // ✅ new page for students
import Student_Charts from "./pages/Student_charts";
import Charts from "./pages/Charts";
import About from "./pages/about"
import Login from "./pages/Login";
import Logout from "./pages/Logout";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Router>
      <AnimatedNavbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/notes" element={
          role == "student" ?(
          <Notes />
          ):(
            <SendNotes/>
          )} />

        {/* ✅ Conditional quiz route */}
        <Route
          path="/quizes"
          element={
            role === "student" ? (
              <AttemptQuiz email={email} studentId = '22A91A05G1' />
            ) : (
              <Quizes role={role} email={email} />
            )
          }
        />

        <Route path="/charts" element={
          role === "student"?(<Student_Charts/>):(<Charts/>)
        } />
        <Route path="/about" element={<About/>}/>
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setRole={setRole}
              setEmail={setEmail}
            />
          }
        />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
