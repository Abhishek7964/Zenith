import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router";
import { allTasksByUser } from "../service/api";
import Sidebar from "./SideBar";
import "../styles/Dashboard.css";
import { updateNotes } from "../redux/slice/noteSlice";

const IconBoard = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const IconPlus = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconLogout = () => (
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
);

const IconTotal = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="12" y2="17" />
  </svg>
);

const IconDone = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconPending = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconArrowRight = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconTrend = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconNotepad = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

function Dashboard() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noteFocused, setNoteFocused] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.currentUser);
  const userNotes = useSelector((state) => state.notes.userNotes);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNotesChange = (e) => {
    dispatch(updateNotes(e.target.value));
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await allTasksByUser(loggedInUser);
        setTotalTasks(tasks.length);
        setPendingTasks(tasks.filter((t) => t.taskStage !== 3).length);
        setCompletedTasks(tasks.filter((t) => t.taskStage === 3).length);
      } catch (err) {
        console.error("Something went wrong while fetching tasks", err);
      } finally {
        setLoading(false);
      }
    }
    if (loggedInUser) fetchTasks();
  }, [loggedInUser]);

  const completionPct =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const initials = loggedInUser ? loggedInUser.charAt(0).toUpperCase() : "U";

  return (
    <div className="dashboard-page">
      <div className="dashboard-bg" />

      {/* ── Topbar ── */}
      <nav className="dashboard-nav">
        <div className="dashboard-nav-inner">
          <div className="dashboard-logo">
            <div className="logo-dots">
              <span className="dot blue"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="logo-text">Zenith</span>
          </div>

          <div className="dashboard-breadcrumb">
            <span className="home-text" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="sep">›</span>
            <span className="active">Dashboard</span>
          </div>

          <div className="dashboard-nav-right">
            <div className="user-pill">
              <div className="user-avatar">{initials}</div>
              <span className="user-name">{loggedInUser}</span>
            </div>
            <button className="logout-btn" onClick={handleLogoutClick}>
              <IconLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main split layout ── */}
      <main className="dashboard-main">
        <Sidebar
          activePage="dashboard"
          username={loggedInUser}
          showProgress={true}
          completionPct={completionPct}
          loading={loading}
        />

        {/* ── RIGHT CONTENT ── */}
        <div className="dash-right">
          <div className="dash-header">
            <div>
              <div className="dash-page-label">Overview</div>
              <h1 className="dash-title">
                Good to see you, <span>{loggedInUser}</span>
              </h1>
              <p className="dash-subtitle">
                Here's what's happening with your tasks today.
              </p>
            </div>
          </div>

          {/* Stat cards */}
          <div className="stats-grid">
            <div className="stat-card" style={{ animationDelay: "60ms" }}>
              <div className="stat-top">
                <div className="stat-icon-wrap stat-icon-blue">
                  <IconTotal />
                </div>
                <div className="stat-trend">
                  <IconTrend />
                  <span>All</span>
                </div>
              </div>
              <div className="stat-value">{loading ? "—" : totalTasks}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-card" style={{ animationDelay: "120ms" }}>
              <div className="stat-top">
                <div className="stat-icon-wrap stat-icon-green">
                  <IconDone />
                </div>
                <div className="stat-trend stat-trend-green">
                  <IconTrend />
                  <span>Done</span>
                </div>
              </div>
              <div className="stat-value">{loading ? "—" : completedTasks}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card" style={{ animationDelay: "180ms" }}>
              <div className="stat-top">
                <div className="stat-icon-wrap stat-icon-orange">
                  <IconPending />
                </div>
                <div className="stat-trend stat-trend-orange">
                  <IconTrend />
                  <span>Open</span>
                </div>
              </div>
              <div className="stat-value">{loading ? "—" : pendingTasks}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          {/* Progress card */}
          <div className="progress-card" style={{ animationDelay: "240ms" }}>
            <div className="progress-card-header">
              <div>
                <div className="progress-card-label">Overall Progress</div>
                <div className="progress-card-caption">
                  {loading
                    ? "Loading…"
                    : `${completedTasks} of ${totalTasks} tasks completed`}
                </div>
              </div>
              <div className="progress-pct-badge">{completionPct}%</div>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill-bar"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          {/* ── Notepad ── */}
          <div
            className={`notepad-card${noteFocused ? " notepad-focused" : ""}`}
            style={{ animationDelay: "280ms" }}
          >
            <div className="notepad-top">
              <div className="stat-icon-wrap stat-icon-blue">
                <IconNotepad />
              </div>
              <div className="notepad-top-text">
                <div className="progress-card-label">Quick Notes</div>
                <div className="progress-card-caption">
                  Write down anything important
                </div>
              </div>
              {userNotes && userNotes.length > 0 && (
                <button
                  className="notepad-clear-btn"
                  onClick={() => dispatch(updateNotes(""))}
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              className="notepad-textarea"
              name="notepad"
              placeholder="Start typing your notes here…"
              value={userNotes}
              onChange={handleNotesChange}
              onFocus={() => setNoteFocused(true)}
              onBlur={() => setNoteFocused(false)}
              rows={4}
            />
          </div>

          {/* Action buttons */}
          <div className="action-row" style={{ animationDelay: "300ms" }}>
            <button
              className="action-btn action-btn-primary"
              onClick={() => navigate("/create-task")}
            >
              <IconPlus />
              <span>Create Task</span>
            </button>
            <button
              className="action-btn action-btn-secondary"
              onClick={() => navigate("/board")}
            >
              <IconBoard />
              <span>Go to Board</span>
              <IconArrowRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
