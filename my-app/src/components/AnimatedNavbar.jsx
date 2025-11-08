import React, { useEffect, useRef, useState } from "react";
// import "./AnimatedNavbar.css";
import { Link } from "react-router-dom";

const navItems = [
  { icon: "fas fa-tachometer-alt", label: "Home", path: "/" },
  { icon: "far fa-address-book", label: "Chat Bot", path: "/chatbot" },
  { icon: "far fa-clone", label: "Notes", path: "/notes" },
  { icon: "far fa-calendar-alt", label: "Quizes", path: "/quizes" },
  { icon: "far fa-chart-bar", label: "Charts", path: "/charts" },
];
export default function AnimatedNavbar({ isAuthenticated }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectorRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem && selectorRef.current) {
      const { offsetLeft, offsetWidth, offsetHeight } = activeItem;
      selectorRef.current.style.left = `${offsetLeft}px`;
      selectorRef.current.style.width = `${offsetWidth}px`;
      selectorRef.current.style.height = `${offsetHeight}px`;
    }
  }, [activeIndex]);

  return (
    <div id="navbar-animmenu">
      <span className="menu-toggle">
        <i className="fas fa-bars"></i>
      </span>

      <div className="hori-selector" ref={selectorRef}>
        <div className="left"></div>
        <div className="right"></div>
      </div>

      <ul className="main-navbar">
        <h1 id="main_heading">Eternal</h1>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <Link to={item.path}>
              <i className={item.icon}></i> {item.label}
            </Link>
          </li>
        ))}
        <div className="login-logout">
          {isAuthenticated ? (
            <Link to="/logout" class="logout-link">
              Logout
            </Link>
          ) : (
            <Link to="/login" class="login-link">
              Login
            </Link>
          )}
        </div>
      </ul>
    </div>
  );
}
