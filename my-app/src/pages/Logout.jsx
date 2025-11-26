// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Logout({ setIsAuthenticated }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     setIsAuthenticated(false);
//     navigate("/login");
//   }, [setIsAuthenticated, navigate]);

//   return <div>Logging out...</div>;
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();
  // State for the notification
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    // 1. Show the "See you soon" notification immediately
    setToast({ 
      show: true, 
      message: "Logged out successfully. See you soon!", 
      type: "success" 
    });

    // 2. Clear sensitive data from Local Storage
    localStorage.removeItem("student_roll_number");
    localStorage.removeItem("teacher_id");
    // Clear any other keys you might be using (e.g. tokens)

    // 3. Wait 2 seconds before actually logging out and redirecting
    // This gives the user time to read the message
    const timer = setTimeout(() => {
      setIsAuthenticated(false);
      navigate("/login");
    }, 100);

    // Cleanup timer if component unmounts (prevents memory leaks)
    return () => clearTimeout(timer);
  }, [setIsAuthenticated, navigate]);

  return (
    <div className="logout-wrapper">
      {/* Reuse your existing Toast CSS */}
      <div className={`toast-notification ${toast.type} ${toast.show ? "show" : ""}`}>
        <div className="toast-content">
          <i className="fas fa-sign-out-alt"></i>
          <span>{toast.message}</span>
        </div>
      </div>

      {/* Optional: A simple loading text in the center */}
      <div className="logout-text">
        <h2>Signing out...</h2>
      </div>
    </div>
  );
}