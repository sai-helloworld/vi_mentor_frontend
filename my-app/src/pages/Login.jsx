import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth-styles.css";

export default function Login({ setIsAuthenticated, setRole, setEmail }) {
  const [localRole, setLocalRole] = useState(""); // 'student' or 'faculty'
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  const navigate = useNavigate();

  useEffect(() => {
    let t;
    if (toast.show) {
      t = setTimeout(() => setToast((s) => ({ ...s, show: false })), 3000);
    }
    return () => clearTimeout(t);
  }, [toast.show]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setEmailError("");

    if (!localRole) {
      showToast("Please choose Student or Faculty", "error");
      return;
    }

    if (!validateEmail(emailInput)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    const endpoint =
      localRole === "student"
        ? "http://localhost:8000/api/student/login/"
        : "http://localhost:8000/api/teacher/login/";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim(), password }),
      });

      const result = await response.json();

      if (response.ok) {
        showToast("Login successful — redirecting", "success");

        if (localRole === "student" && result.roll_number) {
          localStorage.setItem("student_roll_number", result.roll_number);
        } else if (localRole === "faculty" && result.teacher_id) {
          localStorage.setItem("teacher_id", result.teacher_id);
        }

        setTimeout(() => {
          setIsAuthenticated(true);
          setRole(localRole);
          setEmail(emailInput.trim());
          navigate("/");
        }, 900);
      } else {
        const msg = result.error || "Login failed";
        setLoginError(msg);
        showToast(msg, "error");
      }
    } catch (err) {
      const msg = "Server error. Try again later.";
      setLoginError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetRole = () => {
    setLocalRole("");
    setEmailInput("");
    setPassword("");
    setEmailError("");
    setLoginError("");
  };

  // Close button handler
  const handleClose = () => {
    navigate("/"); // or navigate(-1) to go back
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        

        <div className="auth-root">
          <div className="auth-card">
            {/* Close button */}
        <button className="modal-close-btn" onClick={handleClose}>
          ×
        </button>
            <div className="auth-left">
              <div className="brand">
                <div className="logo" />
                <h1>Vi Mentor</h1>
                <p className="tag">Smart quizzes · Deep analytics</p>
              </div>

              {!localRole ? (
                <div className="role-select">
                  <h2>Sign in</h2>
                  <p className="muted">Choose your role to continue</p>
                  <div className="role-buttons">
                    <button className="role-btn" onClick={() => setLocalRole("student")}>
                      Student
                    </button>
                    <button className="role-btn" onClick={() => setLocalRole("faculty")}>
                      Faculty
                    </button>
                  </div>
                </div>
              ) : (
                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h2>{localRole === "student" ? "Student Login" : "Faculty Login"}</h2>
                    <button type="button" className="link-btn" onClick={resetRole}>
                      Change role
                    </button>
                  </div>

                  <label className="input-label">Email</label>
                  <input
                    className={`input ${emailError ? "input-error" : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError("");
                    }}
                    required
                    autoComplete="username"
                  />
                  {emailError && <div className="field-error">{emailError}</div>}

                  <label className="input-label">Password</label>
                  <div className="password-row">
                    <input
                      className="input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="show-pass"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {loginError && <div className="field-error">{loginError}</div>}

                  <button className="submit-btn" type="submit" disabled={loading}>
                    {loading ? "Signing in…" : "Login"}
                  </button>
                </form>
              )}
            </div>

            <div className="auth-right">
              <div className="right-content">
                <h3>Welcome back</h3>
                <p className="muted">Sign in to continue your learning journey.</p>

                <div className="info-cards">
                  <div className="info">
                    <strong>Fast</strong>
                    <span>Quick login and instant access to quizzes</span>
                  </div>
                  <div className="info">
                    <strong>Secure</strong>
                    <span>Minimal data stored locally</span>
                  </div>
                </div>

                <div className="small-note">Need help? Contact your admin.</div>
              </div>
            </div>
          </div>

          {/* Toast */}
          <div className={`toast ${toast.type} ${toast.show ? "show" : ""}`}>
            <div className="toast-body">
              <span className="toast-icon">{toast.type === "success" ? "✓" : "!"}</span>
              <span>{toast.message}</span>
            </div>
            <button className="toast-close" onClick={() => setToast((s) => ({ ...s, show: false }))}>
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
