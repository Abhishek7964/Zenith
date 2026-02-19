import React, { useState } from "react";
import "../styles/LandingPage.css";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.currentUser);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-dots">
                <span className="dot blue"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <span className="logo-text">Zenith</span>
            </div>
            <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
              <li>
                <a
                  href="#home"
                  className="nav-link-home"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </a>
              </li>
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

            {/* ── Auth Section ── */}
            {loggedInUser ? (
              /* Logged-in: user pill + logout — mirrors Dashboard nav */
              <div className="nav-profile">
                <div className="user-pill">
                  <div className="user-avatar">
                    {loggedInUser ? loggedInUser.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="user-name">{loggedInUser}</span>
                </div>
                <button className="btn-logout" onClick={handleLogout}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* Not logged in: login + register */
              <div className="nav-buttons">
                <button className="btn-sign-in" onClick={handleLoginClick}>
                  Log in
                </button>
                <button className="btn-demo" onClick={handleRegisterClick}>
                  Register
                </button>
              </div>
            )}

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
        <div className="hero-inner">
          {/* Sticky Note — top-left */}
          <div className="floating-card sticky-note">
            <div className="pin">📌</div>
            <p className="note-text">
              Take notes to keep track of crucial details, and accomplish more
              tasks with ease.
            </p>
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

            <button className="btn-primary">GET FREE DEMO</button>
          </div>

          {/* Reminders — top-right */}
          <div className="floating-card reminders-card">
            <div className="reminders-header">Reminders</div>
            <div className="reminder-item">
              <div className="reminder-icon">⏱️</div>
              <div className="reminder-content">
                <div className="reminder-title">Today's Meeting</div>
                <div className="reminder-subtitle">with marketing team</div>
                <div className="reminder-time-badge">
                  <span className="clock-icon">🕐</span>
                  <span>13:00 – 13:45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks — bottom-left */}
          <div className="floating-card tasks-card">
            <div className="tasks-header">Today's tasks</div>

            <div className="task-item">
              <div className="task-checkbox orange"></div>
              <div className="task-details">
                <div className="task-name">New ideas for campaign</div>
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
                <div className="task-date">Sep 18</div>
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

          {/* Integrations — bottom-right */}
          <div className="floating-card integrations-card">
            <div className="integrations-header">100+ Integrations</div>
            <div className="integration-icons">
              <div className="integration-icon gmail">
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 3L16 13L30 3"
                    stroke="#EA4335"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M2 3V21H7V11L16 17L25 11V21H30V3L16 13L2 3Z"
                    fill="#EA4335"
                  />
                  <path d="M2 3L7 7V21H2V3Z" fill="#C5221F" />
                  <path d="M30 3L25 7V21H30V3Z" fill="#C5221F" />
                  <path d="M2 3L16 13L30 3H2Z" fill="#EA4335" />
                </svg>
              </div>

              <div className="integration-icon slack">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18.5C7 19.9 5.9 21 4.5 21C3.1 21 2 19.9 2 18.5C2 17.1 3.1 16 4.5 16H7V18.5Z"
                    fill="#E01E5A"
                  />
                  <path
                    d="M8.5 18.5C8.5 17.1 9.6 16 11 16C12.4 16 13.5 17.1 13.5 18.5V25.5C13.5 26.9 12.4 28 11 28C9.6 28 8.5 26.9 8.5 25.5V18.5Z"
                    fill="#E01E5A"
                  />
                  <path
                    d="M11 7C9.6 7 8.5 5.9 8.5 4.5C8.5 3.1 9.6 2 11 2C12.4 2 13.5 3.1 13.5 4.5V7H11Z"
                    fill="#36C5F0"
                  />
                  <path
                    d="M11 8.5C12.4 8.5 13.5 9.6 13.5 11C13.5 12.4 12.4 13.5 11 13.5H4C2.6 13.5 1.5 12.4 1.5 11C1.5 9.6 2.6 8.5 4 8.5H11Z"
                    fill="#36C5F0"
                  />
                  <path
                    d="M22 11C22 9.6 23.1 8.5 24.5 8.5C25.9 8.5 27 9.6 27 11C27 12.4 25.9 13.5 24.5 13.5H22V11Z"
                    fill="#2EB67D"
                  />
                  <path
                    d="M20.5 11C20.5 12.4 19.4 13.5 18 13.5C16.6 13.5 15.5 12.4 15.5 11V4C15.5 2.6 16.6 1.5 18 1.5C19.4 1.5 20.5 2.6 20.5 4V11Z"
                    fill="#2EB67D"
                  />
                  <path
                    d="M18 22C19.4 22 20.5 23.1 20.5 24.5C20.5 25.9 19.4 27 18 27C16.6 27 15.5 25.9 15.5 24.5V22H18Z"
                    fill="#ECB22E"
                  />
                  <path
                    d="M18 20.5C16.6 20.5 15.5 19.4 15.5 18C15.5 16.6 16.6 15.5 18 15.5H25C26.4 15.5 27.5 16.6 27.5 18C27.5 19.4 26.4 20.5 25 20.5H18Z"
                    fill="#ECB22E"
                  />
                </svg>
              </div>

              <div className="integration-icon calendar">
                <div className="cal-top">
                  <span className="cal-top-text">OCT</span>
                </div>
                <div className="cal-body">
                  <span className="cal-date">31</span>
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
