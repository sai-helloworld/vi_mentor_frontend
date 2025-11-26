// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login({ setIsAuthenticated, setRole, setEmail }) {
//   const [localRole, setLocalRole] = useState(""); // 'student' or 'faculty'
//   const [emailInput, setEmailInput] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const navigate = useNavigate();

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError("");

//     if (!validateEmail(emailInput)) {
//       setEmailError("Please enter a valid email address");
//       return;
//     }

//     const endpoint =
//       localRole === "student"
//         ? "http://localhost:8000/api/student/login/"
//         : "http://localhost:8000/api/teacher/login/";

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: emailInput, password }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setIsAuthenticated(true);
//         setRole(localRole);
//         setEmail(emailInput);

//         // ✅ Store roll_number for student, teacher_id for faculty
//         if (localRole === "student" && result.roll_number) {
//           localStorage.setItem("student_roll_number", result.roll_number);
//         } else if (localRole === "faculty" && result.teacher_id) {
//           localStorage.setItem("teacher_id", result.teacher_id);
//         }

//         navigate("/");
//       } else {
//         setLoginError(result.error || "Login failed");
//       }
//     } catch {
//       setLoginError("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-form">
//         <button className="close-btn" onClick={() => navigate("/")} type="button">
//           &times;
//         </button>

//         {!localRole ? (
//           <>
//             <h2>Select Login Type</h2>
//             <div className="role-buttons">
//               <button onClick={() => setLocalRole("student")}>Student Login</button>
//               <button onClick={() => setLocalRole("faculty")}>Faculty Login</button>
//             </div>
//           </>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <h2>{localRole === "student" ? "Student Login" : "Faculty Login"}</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               value={emailInput}
//               onChange={(e) => {
//                 setEmailInput(e.target.value);
//                 setEmailError("");
//               }}
//               required
//             />
//             {emailError && <p className="error">{emailError}</p>}
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {loginError && <p className="error">{loginError}</p>}
//             <button type="submit">Login</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated, setRole, setEmail }) {
  const [localRole, setLocalRole] = useState(""); // 'student' or 'faculty'
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // --- Notification State ---
  const [toast, setToast] = useState({ show: false, message: "", type: "error" }); // Added 'type' for color

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // --- Helper: Show Toast ---
  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    // Auto hide after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateEmail(emailInput)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const endpoint =
      localRole === "student"
        ? "http://localhost:8000/api/student/login/"
        : "http://localhost:8000/api/teacher/login/";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // 1. Show Success Notification
        showToast("Login Successful! Redirecting...", "success");

        // 2. DELAY navigation so user sees the notification
        setTimeout(() => {
          setIsAuthenticated(true);
          setRole(localRole);
          setEmail(emailInput);

          if (localRole === "student" && result.roll_number) {
            localStorage.setItem("student_roll_number", result.roll_number);
          } else if (localRole === "faculty" && result.teacher_id) {
            localStorage.setItem("teacher_id", result.teacher_id);
          }

          navigate("/");
        }, 1500); // 1.5 second delay

      } else {
        // Show Error Notification immediately
        setLoginError(result.error || "Login failed");
        showToast(result.error || "Login Failed", "error");
      }
    } catch {
      const errorMsg = "Server error. Please try again later.";
      setLoginError(errorMsg);
      showToast(errorMsg, "error");
    }
  };

  return (
    <div className="login-wrapper">
      
      {/* --- Notification Component --- */}
      <div className={`toast-notification ${toast.type} ${toast.show ? "show" : ""}`}>
        <div className="toast-content">
          <i className={toast.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-triangle"}></i>
          <span>{toast.message}</span>
        </div>
        <button 
          className="toast-close" 
          onClick={() => setToast((prev) => ({ ...prev, show: false }))}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="login-form">
        <button className="close-btn" onClick={() => navigate("/")} type="button">
          &times;
        </button>

        {!localRole ? (
          <>
            <h2>Select Login Type</h2>
            <div className="role-buttons">
              <button onClick={() => setLocalRole("student")}>Student Login</button>
              <button onClick={() => setLocalRole("faculty")}>Faculty Login</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>{localRole === "student" ? "Student Login" : "Faculty Login"}</h2>
            <input
              type="email"
              placeholder="Email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setEmailError("");
              }}
              required
            />
            {emailError && <p className="error">{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}