import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: "fas fa-tachometer-alt", label: "Home", path: "/" },
  { icon: "far fa-address-book", label: "Chat Bot", path: "/chatbot" },
  { icon: "far fa-clone", label: "Notes", path: "/notes" },
  { icon: "far fa-calendar-alt", label: "Quizes", path: "/quizes" },
  { icon: "far fa-chart-bar", label: "Charts", path: "/charts" },
  { icon: "fas fa-info-circle", label: "About", path: "/about" },
];

export default function AnimatedNavbar({ isAuthenticated }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- NEW: Notification State ---
  const [toast, setToast] = useState({ show: false, message: "" });
  
  const selectorRef = useRef(null);
  const itemRefs = useRef([]);
  const location = useLocation();

  // 1. Sync Active Index with URL
  useEffect(() => {
    const currentPath = location.pathname;
    const index = navItems.findIndex((item) => item.path === currentPath);
    if (index !== -1) setActiveIndex(index);
  }, [location]);

  // 2. Handle Selector Animation (Resize & State Change)
  useEffect(() => {
    const updateSelectorPosition = () => {
      const activeItem = itemRefs.current[activeIndex];
      if (activeItem && selectorRef.current) {
        const { offsetLeft, offsetWidth, offsetHeight } = activeItem;
        selectorRef.current.style.left = `${offsetLeft}px`;
        selectorRef.current.style.width = `${offsetWidth}px`;
        selectorRef.current.style.height = `${offsetHeight}px`;
      }
    };
    updateSelectorPosition();
    window.addEventListener("resize", updateSelectorPosition);
    const timeoutId = setTimeout(updateSelectorPosition, 100);
    return () => {
      window.removeEventListener("resize", updateSelectorPosition);
      clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  // --- NEW: Logic to Trigger Warning ---
  const handleNavClick = (e, path) => {
    // List of paths that are always public
    const publicPaths = ["/", "/about"];

    // If path is protected AND user is NOT logged in
    if (!publicPaths.includes(path) && !isAuthenticated) {
      e.preventDefault(); // STOP navigation
      showToast("⚠️ Please Login to access this feature!");
    } else {
      // Allow navigation and close mobile menu
      setIsMobileMenuOpen(false);
    }
  };

  // --- FIXED: Helper to show and auto-hide toast ---
const showToast = (message) => {
  // 1. Set the message and show it
  setToast({ show: true, message });

  // 2. Auto hide after 3 seconds
  // CRITICAL FIX: We do NOT clear the 'message' here, only 'show: false'
  setTimeout(() => {
    setToast((prev) => ({ ...prev, show: false })); 
  }, 3000);
};
  return (
    <div id="navbar-animmenu">
      {/* --- NEW: Toast Notification Element --- */}
      <div className={`toast-notification ${toast.show ? "show" : ""}`}>
        <div className="toast-content">
          <i className="fas fa-exclamation-circle"></i>
          <span>{toast.message}</span>
        </div>
        <button className="toast-close" onClick={() => setToast({ ...toast, show: false })}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <span className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <i className="fas fa-bars"></i>
      </span>

      <div className="hori-selector" ref={selectorRef}>
        <div className="left"></div>
        <div className="right"></div>
      </div>

      <ul className={`main-navbar ${isMobileMenuOpen ? "show" : ""}`}>
        <h1 id="main_heading">Eternal</h1>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? "active" : ""}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <Link 
              to={item.path} 
              onClick={(e) => handleNavClick(e, item.path)} // Use our new handler
            >
              <i className={item.icon}></i> {item.label}
            </Link>
          </li>
        ))}

        <div className="login-logout">
          {isAuthenticated ? (
            <Link to="/logout" className="logout-link">Logout</Link>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </ul>
    </div>
  );
}