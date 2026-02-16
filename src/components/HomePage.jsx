// import { Button } from "@mui/material";
// import { useNavigate } from "react-router";

// function HomePage() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <div>HomePage</div>
//       <Button variant="contained" onClick={() => navigate("/register")}>
//         Register
//       </Button>
//       <Button variant="contained" onClick={() => navigate("/login")}>
//         Login
//       </Button>
//     </div>
//   );
// }

// export default HomePage;

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">ChronoTask</div>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#solutions">Solutions</a>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
        </ul>
        <Button
          variant="contained"
          className="nav-cta"
          onClick={() => navigate("/demo")}
        >
          Get Demo
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        {/* Sticky Notes */}
        <div className="sticky-note note-1">
          Take notes
          <br />
          and organize
          <br />
          your tasks
        </div>
        <div className="sticky-note note-2">
          Plan your day
          <br />
          with ease
        </div>

        {/* Main Content */}
        <h1 className="hero-title">Think, plan, and track</h1>
        <h2 className="hero-subtitle">all in one place</h2>
        <p className="hero-description">
          Efficiently manage your tasks and boost productivity.
        </p>

        {/* Bottom Cards */}
        <div className="hero-bottom">
          <div className="task-card">
            <h3>Today's Tasks</h3>
            <div className="progress-bar"></div>
            <div className="task-status">
              <div className="status-dot"></div>3 tasks pending
            </div>
          </div>

          <Button
            variant="contained"
            size="large"
            className="hero-cta"
            onClick={() => navigate("/demo")}
          >
            Get Demo
          </Button>

          <div className="integrations-card">
            <div className="integration-number">150+</div>
            <div className="integration-text">
              <div>Integrations</div>
              <div>Seamless workflow</div>
            </div>
          </div>
        </div>

        {/* Integration logos */}
        <div className="integration-logos">
          <div className="logo-placeholder outlook"></div>
          <div className="logo-placeholder whatsapp"></div>
          <div className="logo-placeholder gmail">Gmail</div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
