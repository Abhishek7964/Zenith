import React from "react";
import { useNavigate } from "react-router";
import "../styles/SideBar.css";

const IconDashboard = () => (
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
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

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

/* FIX: dedicated Focus icon */
const IconFocus = () => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M3 12h1m16 0h1M12 3v1m0 16v1" />
    <path d="M5.6 5.6l.7.7m11.4 11.4 .7.7M18.4 5.6l-.7.7M6.3 17.7l-.7.7" />
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

/**
 * activePage: "dashboard" | "board" | "focus"
 *
 * Dashboard footer props:
 *   showProgress: true
 *   completionPct: number
 *   loading: bool
 *
 * Board footer props:
 *   showProgress: false
 *   totalTasks: number
 *   groupedTasks: { backlog, todo, inprogress, done }
 */
function Sidebar({
  activePage,
  username,
  // Dashboard footer
  showProgress = false,
  completionPct = 0,
  loading = false,
  // Board footer
  totalTasks = 0,
  groupedTasks = null,
}) {
  const navigate = useNavigate();

  const columns = [
    { id: "backlog", label: "Backlog", dot: "#6b7280" },
    { id: "todo", label: "To Do", dot: "#3b82f6" },
    { id: "inprogress", label: "In Progress", dot: "#f97316" },
    { id: "done", label: "Done", dot: "#10b981" },
  ];

  const initials = username ? username.charAt(0).toUpperCase() : "U";
  const userLabel =
    activePage === "dashboard"
      ? "Welcome back"
      : activePage === "focus"
        ? "Focus session"
        : "Logged in as";

  return (
    <aside className="sidebar">
      {/* ── Top ── */}
      <div className="sidebar-top">
        <div className="sidebar-user-block">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-label">{userLabel}</div>
            <div className="sidebar-user-name">{username}</div>
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section-label">Navigation</div>

        <nav className="sidebar-nav">
          {/* Dashboard */}
          <button
            className={`sidebar-nav-item${activePage === "dashboard" ? " active" : ""}`}
            onClick={
              activePage !== "dashboard"
                ? () => navigate("/dashboard")
                : undefined
            }
          >
            <div className="sidebar-nav-icon">
              <IconDashboard />
            </div>
            <div className="sidebar-nav-text">
              <span className="sidebar-nav-title">Dashboard</span>
              <span className="sidebar-nav-sub">Overview &amp; stats</span>
            </div>
          </button>

          {/* Board */}
          <button
            className={`sidebar-nav-item${activePage === "board" ? " active" : ""}`}
            onClick={
              activePage !== "board" ? () => navigate("/board") : undefined
            }
          >
            <div className="sidebar-nav-icon">
              <IconBoard />
            </div>
            <div className="sidebar-nav-text">
              <span className="sidebar-nav-title">My Board</span>
              <span className="sidebar-nav-sub">View all columns</span>
            </div>
          </button>

          {/* FIX: Focus Mode — now uses "focus" for active check + unique icon */}
          <button
            className={`sidebar-nav-item${activePage === "focus" ? " active" : ""}`}
            onClick={
              activePage !== "focus" ? () => navigate("/focus-mode") : undefined
            }
          >
            <div className="sidebar-nav-icon">
              <IconFocus />
            </div>
            <div className="sidebar-nav-text">
              <span className="sidebar-nav-title">Focus Mode</span>
              <span className="sidebar-nav-sub">Deep work session</span>
            </div>
          </button>

          {/* New Task */}
          <button
            className="sidebar-nav-item"
            onClick={() => navigate("/create-task")}
          >
            <div className="sidebar-nav-icon blue">
              <IconPlus />
            </div>
            <div className="sidebar-nav-text">
              <span className="sidebar-nav-title">New Task</span>
              <span className="sidebar-nav-sub">Add to board</span>
            </div>
          </button>
        </nav>

        {/* Board-only: column stats */}
        {activePage === "board" && groupedTasks && (
          <>
            <div className="sidebar-divider" style={{ marginTop: "20px" }} />
            <div className="sidebar-section-label" style={{ marginTop: "4px" }}>
              Columns
            </div>
            <div className="sidebar-col-stats">
              {columns.map((col) => (
                <div key={col.id} className="sidebar-col-stat">
                  <div
                    className="sidebar-col-dot"
                    style={{ backgroundColor: col.dot }}
                  />
                  <span className="sidebar-col-name">{col.label}</span>
                  <span className="sidebar-col-count">
                    {groupedTasks[col.id]?.length ?? 0}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        {showProgress ? (
          <div>
            <div className="sidebar-progress-label">
              <span>Completion</span>
              <span className="sidebar-progress-pct">
                {loading ? "—" : `${completionPct}%`}
              </span>
            </div>
            <div className="sidebar-progress-track">
              <div
                className="sidebar-progress-fill"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        ) : activePage === "focus" ? (
          /* Focus Mode footer */
          <div>
            <div className="sidebar-total-label">Deep Work</div>
            <div
              className="sidebar-total-count"
              style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
            >
              Stay focused
            </div>
            <div className="sidebar-total-sub">minimise distractions</div>
          </div>
        ) : (
          /* Board footer */
          <div>
            <div className="sidebar-total-label">Total Tasks</div>
            <div className="sidebar-total-count">{totalTasks}</div>
            <div className="sidebar-total-sub">across all status</div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
