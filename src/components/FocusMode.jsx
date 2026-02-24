import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../redux/slice/authSlice";
import { allTasksByUser } from "../service/api";
import Sidebar from "./SideBar";
import "../styles/FocusMode.css";

const PRESET_TIMERS = [
  { label: "5m", seconds: 5 * 60 },
  { label: "10m", seconds: 10 * 60 },
  { label: "30m", seconds: 30 * 60 },
  { label: "45m", seconds: 45 * 60 },
  { label: "1hr", seconds: 60 * 60 },
];

const STAGE_LABELS = {
  0: { label: "Backlog", color: "#6b7280", bg: "#f3f4f6" },
  1: { label: "To Do", color: "#3b82f6", bg: "#eff6ff" },
  2: { label: "In Progress", color: "#f97316", bg: "#fff7ed" },
  3: { label: "Done", color: "#10b981", bg: "#f0fdf4" },
};

/* ── Helpers ─────────────────────────── */
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getDeadlineValue(task) {
  return task.deadline || task.dueDate || task.due_date || task.dueAt || null;
}

function getUrgency(deadlineStr) {
  if (!deadlineStr)
    return {
      color: "#9ca3af",
      label: "No deadline",
      bg: "rgba(156,163,175,0.1)",
      border: "#e5e7eb",
    };
  const diff = new Date(deadlineStr) - new Date();
  const hours = diff / (1000 * 60 * 60);
  if (diff < 0)
    return {
      color: "#ef4444",
      label: "Overdue",
      bg: "#fef2f2",
      border: "#fca5a5",
    };
  if (hours < 6)
    return {
      color: "#f97316",
      label: "Critical",
      bg: "#fff7ed",
      border: "#fdba74",
    };
  if (hours < 24)
    return {
      color: "#eab308",
      label: "Due today",
      bg: "#fefce8",
      border: "#fde68a",
    };
  if (hours < 72)
    return {
      color: "#3b82f6",
      label: "Due soon",
      bg: "#eff6ff",
      border: "#bfdbfe",
    };
  return {
    color: "#10b981",
    label: "On track",
    bg: "#f0fdf4",
    border: "#86efac",
  };
}

function timeUntilDeadline(deadlineStr) {
  if (!deadlineStr) return null;
  const diff = new Date(deadlineStr) - new Date();
  if (diff < 0) return "Overdue";
  const totalMin = Math.floor(diff / (1000 * 60));
  const h = Math.floor(totalMin / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ${h % 24}h left`;
  if (h > 0) return `${h}h ${totalMin % 60}m left`;
  return `${totalMin}m left`;
}

function formatCreatedAt(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isCompleted(task) {
  return (
    task.taskStage === 3 || task.status === "done" || task.completed === true
  );
}

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

const IconCalendar = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconClock = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconTag = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

/* ── FIX: Robust alarm that fully stops ──
   We keep a ref to the AudioContext itself.
   stopAlarm() suspends + closes the context,
   so ALL scheduled oscillators are killed instantly. */
function startAlarm(audioCtxRef, intervalRef) {
  // Close any existing context first
  if (audioCtxRef.current) {
    try {
      audioCtxRef.current.close();
    } catch (_) {}
  }

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  audioCtxRef.current = ctx;

  function playBeep() {
    // Guard: if context was closed, do nothing
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch (_) {}
  }

  playBeep();
  intervalRef.current = setInterval(playBeep, 1200);
}

/* ── Component ───────────────────────── */
export default function FocusMode() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(null);

  // Timer
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remaining, setRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customMin, setCustomMin] = useState("");
  const [customSec, setCustomSec] = useState("");
  const [completed, setCompleted] = useState(false);

  const tickRef = useRef(null); // setInterval for countdown
  const alarmIntRef = useRef(null); // setInterval for beeping
  const audioCtxRef = useRef(null); // AudioContext — closing it kills all sound

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.currentUser);
  const initials = loggedInUser ? loggedInUser.charAt(0).toUpperCase() : "U";

  /* ── Fetch tasks — exclude completed ── */
  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await allTasksByUser(loggedInUser);
        console.log("Raw tasks:", data);

        const incomplete = data.filter((t) => !isCompleted(t));
        const sorted = [...incomplete].sort((a, b) => {
          const da = getDeadlineValue(a);
          const db = getDeadlineValue(b);
          if (da && db) return new Date(da) - new Date(db);
          if (da) return -1;
          if (db) return 1;
          return 0;
        });

        setTasks(sorted.slice(0, 3));
        setActiveTask(null);
      } catch (e) {
        console.error("Failed to fetch tasks:", e);
      } finally {
        setLoading(false);
      }
    }
    if (loggedInUser) fetchTasks();
  }, [loggedInUser]);

  /* ── FIX: stopAlarm — closes AudioContext entirely ── */
  const stopAlarm = useCallback(() => {
    // 1. Kill the beep interval
    if (alarmIntRef.current) {
      clearInterval(alarmIntRef.current);
      alarmIntRef.current = null;
    }
    // 2. Close AudioContext — this immediately silences any playing oscillators
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (_) {}
      audioCtxRef.current = null;
    }
  }, []);

  /* ── Timer countdown ── */
  useEffect(() => {
    if (isRunning) {
      tickRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(tickRef.current);
            setIsRunning(false);
            setCompleted(true);
            startAlarm(audioCtxRef, alarmIntRef);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(tickRef.current);
    }
    return () => clearInterval(tickRef.current);
  }, [isRunning]);

  /* ── Cleanup on unmount ── */
  useEffect(
    () => () => {
      clearInterval(tickRef.current);
      stopAlarm();
    },
    [stopAlarm],
  );

  function applyTimer(seconds) {
    stopAlarm();
    setIsRunning(false);
    setCompleted(false);
    setTotalSeconds(seconds);
    setRemaining(seconds);
  }

  function applyCustom() {
    const m = parseInt(customMin) || 0;
    const s = parseInt(customSec) || 0;
    const total = m * 60 + s;
    if (total > 0) {
      applyTimer(total);
      setCustomMin("");
      setCustomSec("");
    }
  }

  function toggleTimer() {
    if (completed) {
      stopAlarm();
      setCompleted(false);
      setRemaining(totalSeconds);
    } else {
      setIsRunning((v) => !v);
    }
  }

  function resetTimer() {
    stopAlarm();
    setIsRunning(false);
    setCompleted(false);
    setRemaining(totalSeconds);
  }

  const progress = totalSeconds > 0 ? remaining / totalSeconds : 1;
  const circumference = 2 * Math.PI * 88;
  const strokeDash = circumference * progress;
  const strokeColor = completed ? "#ef4444" : isRunning ? "#3b82f6" : "#93c5fd";

  return (
    <div className="focus-page">
      <div className="focus-bg" />

      {/* ── Topbar ── */}
      <nav className="focus-nav">
        <div className="focus-nav-inner">
          <div className="focus-logo">
            <div className="logo-dots">
              <span className="dot blue" />
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <span className="logo-text">Zenith</span>
          </div>

          <div className="focus-breadcrumb">
            <span className="focus-bc-link" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="focus-bc-sep">›</span>
            <span
              className="focus-bc-link"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </span>
            <span className="focus-bc-sep">›</span>
            <span className="focus-bc-active">Focus Mode</span>
          </div>

          <div className="focus-nav-right">
            <div className="focus-user-pill">
              <div className="focus-user-avatar">{initials}</div>
              <span className="focus-user-name">{loggedInUser}</span>
            </div>
            <button
              className="logout-btn"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              <IconLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="focus-main">
        <Sidebar activePage="focus" username={loggedInUser} />

        <div className="focus-right">
          <div className="focus-header">
            <div className="focus-page-label">Focus Mode</div>
            <h1 className="focus-title">
              Stay in the <span>zone</span>
            </h1>
            <p className="focus-subtitle">
              Your top incomplete deadlines and a distraction-free timer — all
              in one place.
            </p>
          </div>

          <div className="focus-grid">
            {/* ── Col 1: Task List ── */}
            <div className="focus-card">
              <p className="focus-card-label">Upcoming Deadlines</p>

              {loading ? (
                <div className="skeleton-list">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton-item" />
                  ))}
                </div>
              ) : tasks.length === 0 ? (
                <div className="empty-state">
                  <span style={{ fontSize: "2rem" }}>🎉</span>
                  <span>All caught up! No pending deadlines.</span>
                </div>
              ) : (
                <div className="task-list">
                  {tasks.map((task, idx) => {
                    const deadline = getDeadlineValue(task);
                    const urgency = getUrgency(deadline);
                    const timeLeft = timeUntilDeadline(deadline);
                    const isActive = activeTask?.id === task.id;
                    const stage =
                      STAGE_LABELS[task.taskStage] ?? STAGE_LABELS[0];
                    const createdAt = formatCreatedAt(task.createdAt);
                    const priority = task.priority || task.Priority || null;

                    return (
                      <div
                        key={task.id}
                        className={`task-item-card${isActive ? " active" : ""}`}
                        onClick={() =>
                          setActiveTask((prev) =>
                            prev?.id === task.id ? null : task,
                          )
                        }
                      >
                        {/* Rank */}
                        <div className="task-rank-badge">{idx + 1}</div>

                        <div className="task-item-body">
                          {/* Row 1: Name + urgency */}
                          <div className="task-item-top">
                            <span className="task-item-name">
                              {task.taskName ||
                                task.title ||
                                task.name ||
                                "Untitled Task"}
                            </span>
                            <span
                              className="urgency-badge"
                              style={{
                                color: urgency.color,
                                background: urgency.bg,
                                borderColor: urgency.border,
                              }}
                            >
                              {urgency.label}
                            </span>
                          </div>

                          {/* Row 2: Description */}
                          {task.description && (
                            <p className="task-item-desc">{task.description}</p>
                          )}

                          {/* Row 3: Meta chips */}
                          <div className="task-meta-chips">
                            {/* Stage */}
                            <span
                              className="meta-chip"
                              style={{
                                color: stage.color,
                                background: stage.bg,
                              }}
                            >
                              <span
                                className="meta-chip-dot"
                                style={{ background: stage.color }}
                              />
                              {stage.label}
                            </span>

                            {/* Priority */}
                            {priority && (
                              <span className="meta-chip meta-chip-priority">
                                <IconTag />
                                {priority}
                              </span>
                            )}

                            {/* Created at */}
                            {createdAt && (
                              <span className="meta-chip meta-chip-muted">
                                <IconClock />
                                Created {createdAt}
                              </span>
                            )}
                          </div>

                          {/* Row 4: Deadline bar */}
                          {deadline && (
                            <div className="task-deadline-row">
                              <span
                                className="task-time-left"
                                style={{ color: urgency.color }}
                              >
                                <IconCalendar />
                                {new Date(deadline).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                              {timeLeft && (
                                <span
                                  className="task-countdown"
                                  style={{
                                    color: urgency.color,
                                    background: urgency.bg,
                                    borderColor: urgency.border,
                                  }}
                                >
                                  {timeLeft}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTask && (
                <div className="focusing-on-bar">
                  <span className="focusing-dot" />
                  <div className="focusing-text">
                    <span className="focusing-label">
                      Currently focusing on
                    </span>
                    <span className="focusing-name">
                      {activeTask.taskName ||
                        activeTask.title ||
                        activeTask.name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Col 2: Timer ── */}
            <div
              className={`focus-card timer-panel${completed ? " alarm-active" : ""}`}
            >
              <p className="focus-card-label">Pomodoro Timer</p>

              <div className="timer-circle-wrap">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="88"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="10"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="88"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${strokeDash} ${circumference}`}
                    transform="rotate(-90 100 100)"
                    style={{
                      transition:
                        "stroke-dasharray 0.8s ease, stroke 0.4s ease",
                    }}
                  />
                </svg>
                <div className="timer-display">
                  <span
                    className={`timer-time-text${completed ? " alarm" : ""}`}
                  >
                    {completed ? "Time's Up!" : formatTime(remaining)}
                  </span>
                  {!completed && (
                    <span className="timer-status-text">
                      {isRunning
                        ? "Focus…"
                        : remaining === totalSeconds
                          ? "Ready"
                          : "Paused"}
                    </span>
                  )}
                  {completed && (
                    <span className="timer-alarm-sub">alarm ringing…</span>
                  )}
                </div>
              </div>

              <div className="timer-controls">
                <button
                  className="btn-timer-reset"
                  onClick={resetTimer}
                  title="Reset"
                >
                  ↺
                </button>
                <button
                  onClick={toggleTimer}
                  className={`btn-timer-main${isRunning ? " running" : ""}${completed ? " alarm-btn" : ""}`}
                  style={
                    !isRunning && !completed ? { background: "#3b82f6" } : {}
                  }
                >
                  {completed ? "Stop Alarm" : isRunning ? "Pause" : "Start"}
                </button>
              </div>

              <p className="timer-presets-label">Quick presets</p>
              <div className="timer-presets">
                {PRESET_TIMERS.map((p) => (
                  <button
                    key={p.label}
                    className={`btn-preset${totalSeconds === p.seconds ? " active-preset" : ""}`}
                    onClick={() => applyTimer(p.seconds)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="custom-timer-wrap">
                <span className="custom-timer-label">Custom timer</span>
                <div className="custom-timer-row">
                  <input
                    type="number"
                    min="0"
                    max="180"
                    placeholder="mm"
                    value={customMin}
                    onChange={(e) => setCustomMin(e.target.value)}
                    className="custom-input"
                  />
                  <span className="custom-colon">:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="ss"
                    value={customSec}
                    onChange={(e) => setCustomSec(e.target.value)}
                    className="custom-input"
                  />
                  <button className="btn-set-timer" onClick={applyCustom}>
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
