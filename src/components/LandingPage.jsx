import React, { useState } from "react";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <span className="logo-text">ChronoTask</span>
            </div>
            <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
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
            <div className="nav-buttons">
              <button className="btn-sign-in">Sign in</button>
              <button className="btn-demo">Get demo</button>
            </div>
            <button
              className="mobile-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {/* Floating Cards - Left Side */}
            <div className="floating-card sticky-note">
              <div className="pin">📌</div>
              <p className="note-text">
                Take notes to keep track of crucial details, and accomplish more
                tasks with ease.
              </p>
            </div>

            <div className="floating-card checkmark-card">
              <div className="checkmark">✓</div>
            </div>

            {/* Center Content */}
            <div className="hero-center">
              <div className="floating-card app-icon-card">
                <div className="app-icon">
                  <span className="icon-dot blue"></span>
                  <span className="icon-dot black"></span>
                  <span className="icon-dot black"></span>
                  <span className="icon-dot black"></span>
                </div>
              </div>

              <h1 className="hero-title">
                Think, plan, and track
                <span className="title-light">all in one place</span>
              </h1>

              <p className="hero-subtitle">
                Efficiently manage your tasks and boost productivity.
              </p>

              <button className="btn-primary">Get free demo</button>
            </div>

            {/* Floating Cards - Right Side */}
            <div className="floating-card reminders-card">
              <div className="reminders-header">Reminders</div>
              <div className="reminder-item">
                <div className="reminder-icon">⏰</div>
                <div className="reminder-content">
                  <div className="reminder-title">Today's Meeting</div>
                  <div className="reminder-time">with design team</div>
                  <div className="reminder-time-badge">
                    <span className="clock-icon">🕐</span>
                    <span>15:00 - 16:45</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Cards */}
            <div className="floating-card tasks-card">
              <div className="tasks-header">Today's tasks</div>

              <div className="task-item">
                <div className="task-checkbox orange"></div>
                <div className="task-details">
                  <div className="task-name">New issue for promotion</div>
                  <div className="task-date">Sep 10</div>
                  <div className="task-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <span className="progress-text">60%</span>
                  </div>
                </div>
                <img
                  src="https://i.pravatar.cc/32?img=1"
                  alt="User"
                  className="task-avatar"
                />
              </div>

              <div className="task-item">
                <div className="task-checkbox green"></div>
                <div className="task-details">
                  <div className="task-name">Design PPT #4</div>
                  <div className="task-date">Sep 15</div>
                  <div className="task-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill green"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                    <span className="progress-text">12%</span>
                  </div>
                </div>
                <img
                  src="https://i.pravatar.cc/32?img=2"
                  alt="User"
                  className="task-avatar"
                />
              </div>
            </div>

            <div className="floating-card integrations-card">
              <div className="integrations-header">100+ Integrations</div>
              <div className="integration-icons">
                <div className="integration-icon gmail">
                  <span className="gmail-m">M</span>
                </div>
                <div className="integration-icon slack">
                  <span className="slack-hash">#</span>
                </div>
                <div className="integration-icon calendar">
                  <div className="cal-top"></div>
                  <div className="cal-date">31</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
