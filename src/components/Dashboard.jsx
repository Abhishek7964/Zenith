import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router";
import { allTasksByUser } from "../service/api";
import "../styles/Dashboard.css";

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

function Dashboard() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.currentUser);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleBoardClick = () => navigate("/board");
  const handleCreateTaskClick = () => navigate("/create-task");

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
            <span>Home</span>
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
        {/* ── LEFT PANEL ── */}
        <div className="dash-left">
          <div className="left-top">
            {/* User greeting block */}
            <div className="dash-user-block">
              <div className="dash-avatar-lg">{initials}</div>
              <div className="dash-user-info">
                <div className="dash-user-label">Welcome back</div>
                <div className="dash-user-name">{loggedInUser}</div>
              </div>
            </div>

            <div className="dash-divider" />

            {/* Quick nav */}
            <div className="dash-nav-label">Quick Actions</div>
            <div className="dash-quick-nav">
              <button
                className="dash-nav-item dash-nav-active"
                onClick={handleBoardClick}
              >
                <div className="dash-nav-icon">
                  <IconBoard />
                </div>
                <div className="dash-nav-text">
                  <span className="dash-nav-title">My Board</span>
                  <span className="dash-nav-sub">View all columns</span>
                </div>
              </button>
              <button className="dash-nav-item" onClick={handleCreateTaskClick}>
                <div className="dash-nav-icon nav-icon-blue">
                  <IconPlus />
                </div>
                <div className="dash-nav-text">
                  <span className="dash-nav-title">New Task</span>
                  <span className="dash-nav-sub">Add to board</span>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom meta */}
          <div className="dash-left-footer">
            <div className="dash-progress-mini">
              <div className="dpm-label">
                <span>Completion</span>
                <span className="dpm-pct">
                  {loading ? "—" : `${completionPct}%`}
                </span>
              </div>
              <div className="dpm-track">
                <div
                  className="dpm-fill"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="dash-right">
          {/* Greeting header */}
          <div className="dash-header">
            <div>
              <div className="dash-page-label">Overview</div>
              <h1 className="dash-title">
                Good to see you, <span>{loggedInUser}</span> 👋
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

          {/* Action buttons */}
          <div className="action-row" style={{ animationDelay: "300ms" }}>
            <button
              className="action-btn action-btn-primary"
              onClick={handleCreateTaskClick}
            >
              <IconPlus />
              <span>Create Task</span>
            </button>
            <button
              className="action-btn action-btn-secondary"
              onClick={handleBoardClick}
            >
              <IconBoard />
              <span>Go to Board</span>
              <IconArrowRight />
            </button>
          </div>
        </div>
        {/* end dash-right */}
      </main>
    </div>
  );
}

export default Dashboard;
