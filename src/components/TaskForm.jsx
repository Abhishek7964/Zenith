import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { validateTaskForm } from "../utils/validateTaskForm";
import dayjs from "dayjs";
import { addNewTask } from "../service/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../styles/TaskForm.css";

const IconArrowLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
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
const IconTask = () => (
  <svg
    width="22"
    height="22"
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
const IconInfo = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// Shared MUI sx — applied to TextField and FormControl/Select
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fafafa",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#f5f6f8",
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3b82f6",
        borderWidth: "1.5px",
      },
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#ef4444" },
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e9eaec" },
  "& .MuiInputBase-input": {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "#1a1a1a",
    letterSpacing: "-0.01em",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "#b0b7c3",
    "&.Mui-focused": { color: "#3b82f6" },
    "&.Mui-error": { color: "#ef4444" },
  },
  "& .MuiSelect-select": {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "#1a1a1a",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "'Inter', sans-serif",
    fontSize: "11.5px",
    marginTop: "4px",
  },
};

function TaskForm() {
  const [taskFormData, setTaskFormData] = useState({
    taskName: "",
    taskPriority: "",
  });
  const [error, setError] = useState({});
  const [taskDeadline, setTaskDeadline] = useState("");
  const [dateFocused, setDateFocused] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleDeadlineChange = (e) => {
    const value = e.target.value;
    setTaskDeadline(value);
    if (value) {
      const formatted = dayjs(value).format("DD-MM-YYYY");
      setTaskFormData((prev) => ({ ...prev, taskDeadline: formatted }));
      setError((prev) => {
        const { taskDeadline: _, ...rest } = prev;
        return rest;
      });
    } else {
      setTaskFormData((prev) => {
        const { taskDeadline: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleTaskFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(taskFormData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setError({});
    try {
      addNewTask(taskFormData, loggedInUser);
      alert("Task successfully created!");
      setTaskFormData({ taskName: "", taskPriority: "" });
      setTaskDeadline("");
    } catch (err) {
      console.error("Failed to create a task", err);
    }
  };

  const todayStr = dayjs().format("YYYY-MM-DD");

  // Classes for the date wrapper to drive CSS-only label float
  const dateWrapperClass = [
    "date-field-wrapper",
    taskDeadline ? "has-value" : "",
    dateFocused ? "is-focused" : "",
    error.taskDeadline ? "date-field-error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="taskform-page">
      <div className="taskform-bg" />

      <nav className="taskform-nav">
        <div className="taskform-nav-inner">
          <div className="taskform-logo">
            <div className="logo-dots">
              <span className="dot blue"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="logo-text">Zenith</span>
          </div>
          <div className="taskform-breadcrumb">
            <span>Board</span>
            <span className="sep">›</span>
            <span>My Tasks</span>
            <span className="sep">›</span>
            <span className="active">New Task</span>
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <IconArrowLeft />
            <span>Back</span>
          </button>
        </div>
      </nav>

      <main className="taskform-main">
        {/* LEFT */}
        <div className="taskform-left">
          <div className="left-top">
            <div className="left-tag">
              <div className="left-tag-dot"></div>New Task
            </div>
            <h2 className="left-heading">
              Add a task to
              <br />
              <span>your board</span>
            </h2>
            <p className="left-desc">
              Keep your work organised. Each task tracks priority, deadline, and
              progress all in one place.
            </p>
            <div className="left-steps">
              <div className="left-step active">
                <div className="step-num">1</div>
                <div className="step-info">
                  <div className="step-label">Task Details</div>
                  <div className="step-sub">Name, priority &amp; deadline</div>
                </div>
              </div>
              <div className="left-step">
                <div className="step-num">2</div>
                <div className="step-info">
                  <div className="step-label">Assign &amp; Tag</div>
                  <div className="step-sub">Team member &amp; labels</div>
                </div>
              </div>
              <div className="left-step">
                <div className="step-num">3</div>
                <div className="step-info">
                  <div className="step-label">Review</div>
                  <div className="step-sub">Confirm and add to board</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left-meta">
            <div className="left-meta-icon">
              <IconInfo />
            </div>
            <div className="left-meta-text">
              Tasks are <strong>auto-saved</strong> to your active board when
              created.
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="taskform-right">
          <div className="form-header">
            <div className="form-header-left">
              <div className="form-step-indicator">Step 1 of 3</div>
              <h1 className="form-title">Task Details</h1>
              <p className="form-subtitle">
                Give your task a clear name, set its urgency, and pick a
                deadline.
              </p>
            </div>
            <div className="form-header-icon">
              <IconTask />
            </div>
          </div>

          <form
            noValidate
            onSubmit={handleTaskFormSubmit}
            className="taskform-form"
          >
            {/* Task Name */}
            <div className="taskform-field">
              <div className="section-label">Task Name</div>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter task name"
                type="text"
                name="taskName"
                value={taskFormData.taskName}
                required
                onChange={handleTaskFormChange}
                error={!!error.taskName}
                helperText={error.taskName}
                placeholder="e.g. Design new landing page"
                sx={fieldSx}
              />
            </div>

            {/* Priority + Deadline */}
            <div>
              <div className="section-label">Priority &amp; Timeline</div>
              <div className="taskform-row">
                {/* Priority */}
                <div className="taskform-field">
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(error.taskPriority)}
                    sx={fieldSx}
                  >
                    <InputLabel>Task Priority</InputLabel>
                    <Select
                      label="Task Priority"
                      name="taskPriority"
                      value={taskFormData.taskPriority}
                      onChange={handleTaskFormChange}
                    >
                      <MenuItem value="low">🟢 Low</MenuItem>
                      <MenuItem value="medium">🟡 Medium</MenuItem>
                      <MenuItem value="high">🔴 High</MenuItem>
                    </Select>
                    {error.taskPriority && (
                      <FormHelperText>{error.taskPriority}</FormHelperText>
                    )}
                  </FormControl>
                </div>

                {/* Deadline — native input with floating label */}
                <div className="taskform-field">
                  <div className={dateWrapperClass}>
                    <input
                      type="date"
                      className="date-field-input"
                      value={taskDeadline}
                      onChange={handleDeadlineChange}
                      onFocus={() => setDateFocused(true)}
                      onBlur={() => setDateFocused(false)}
                      min={todayStr}
                      required
                    />
                    <label className="date-field-label">
                      Task Deadline <span className="date-required">*</span>
                    </label>
                    {error.taskDeadline && (
                      <span className="date-field-helper">
                        {error.taskDeadline}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {taskFormData.taskPriority && (
                <div
                  className={`priority-preview priority-${taskFormData.taskPriority}`}
                >
                  <span className="priority-dot" />
                  <span className="priority-label">
                    {taskFormData.taskPriority.charAt(0).toUpperCase() +
                      taskFormData.taskPriority.slice(1)}{" "}
                    priority selected
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="taskform-footer">
              <span className="footer-hint">
                All fields marked * are required
              </span>
              <div className="taskform-actions">
                <button
                  type="button"
                  className="taskform-btn-cancel"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button type="submit" className="taskform-btn-submit">
                  Create Task <IconArrowRight />
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default TaskForm;
