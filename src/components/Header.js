import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("grindmapUser");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/dashboard">
            <h1>GrindMap</h1>
          </Link>
        </div>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/progress" className="nav-link" onClick={() => setMenuOpen(false)}>
            Progress
          </Link>
          <Link to="/platforms" className="nav-link" onClick={() => setMenuOpen(false)}>
            Platforms
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;

