

// import React, { useEffect, useRef, useState } from "react";
// // import "./AnimatedNavbar.css";
// import { Link, useLocation } from "react-router-dom";

// const navItems = [
//   { icon: "fas fa-tachometer-alt", label: "Home", path: "/" },
//   { icon: "far fa-address-book", label: "Chat Bot", path: "/chatbot" },
//   { icon: "far fa-clone", label: "Notes", path: "/notes" },
//   { icon: "far fa-calendar-alt", label: "Quizes", path: "/quizes" },
//   { icon: "far fa-chart-bar", label: "Charts", path: "/charts" },
//   { icon: "far fa-info-circle", label: "about", path: "/about" },
// ];

// export default function AnimatedNavbar({ isAuthenticated }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const selectorRef = useRef(null);
//   const itemRefs = useRef([]);
//   const location = useLocation(); // 1. Hook to track URL changes

//   // 2. SYNC ACTIVE STATE WITH URL
//   // This ensures that if the page redirects (login) or user types URL,
//   // the navbar updates automatically without needing a click.
//   useEffect(() => {
//     const currentPath = location.pathname;
//     const index = navItems.findIndex((item) => item.path === currentPath);
//     // If path is found, set index. If not found (e.g. 404), default to 0 or keep current.
//     if (index !== -1) {
//       setActiveIndex(index);
//     }
//   }, [location]);

//   // 3. ANIMATION AND RESIZE HANDLER
//   useEffect(() => {
//     const updateSelectorPosition = () => {
//       const activeItem = itemRefs.current[activeIndex];
//       if (activeItem && selectorRef.current) {
//         const { offsetLeft, offsetWidth, offsetHeight } = activeItem;
        
//         // Apply styles to move the selector
//         selectorRef.current.style.left = `${offsetLeft}px`;
//         selectorRef.current.style.width = `${offsetWidth}px`;
//         selectorRef.current.style.height = `${offsetHeight}px`;
//       }
//     };

//     // Run initially
//     updateSelectorPosition();

//     // Add resize listener so the selector moves when screen shrinks
//     window.addEventListener("resize", updateSelectorPosition);

//     // Short timeout to handle layout shifts (like fonts loading or scrollbars appearing)
//     const timeoutId = setTimeout(updateSelectorPosition, 100);

//     return () => {
//       window.removeEventListener("resize", updateSelectorPosition);
//       clearTimeout(timeoutId);
//     };
//   }, [activeIndex]); // Re-run whenever the active tab changes

//   // State for mobile menu toggle
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div id="navbar-animmenu">
//       <span 
//         className="menu-toggle" 
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//       >
//         <i className="fas fa-bars"></i>
//       </span>

//       <div className="hori-selector" ref={selectorRef}>
//         <div className="left"></div>
//         <div className="right"></div>
//       </div>

//       <ul className={`main-navbar ${isMobileMenuOpen ? "show" : ""}`}>
//         <h1 id="main_heading">Eternal</h1>
//         {navItems.map((item, index) => (
//           <li
//             key={index}
//             className={activeIndex === index ? "active" : ""}
//             ref={(el) => (itemRefs.current[index] = el)}
//             // We removed onClick={setActiveIndex} because the useEffect above 
//             // handles it automatically based on the URL change.
//           >
//             <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
//               <i className={item.icon}></i> {item.label}
//             </Link>
//           </li>
//         ))}
        
//         <div className="login-logout">
//           {isAuthenticated ? (
//             <Link to="/logout" className="logout-link">
//               Logout
//             </Link>
//           ) : (
//             <Link to="/login" className="login-link">
//               Login
//             </Link>
//           )}
//         </div>
//       </ul>
//     </div>
//   );
// }

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