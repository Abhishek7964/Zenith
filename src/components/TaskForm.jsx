// // import {
// //   Button,
// //   FormControl,
// //   FormHelperText,
// //   InputLabel,
// //   MenuItem,
// //   Select,
// //   TextField,
// // } from "@mui/material";
// // import { useEffect, useState } from "react";
// // import { validateTaskForm } from "../utils/validateTaskForm";

// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// // import dayjs from "dayjs";
// // import { addNewTask } from "../service/api";
// // import { useSelector } from "react-redux";

// // function TaskForm() {
// //   const [taskFormData, setTaskFormData] = useState({
// //     taskName: "",
// //     taskPriority: "",
// //   });
// //   const [error, setError] = useState({});
// //   const [taskDeadline, setTaskDeadline] = useState(null);

// //   const loggedInUser = useSelector((state) => state.auth.currentUser);

// //   useEffect(() => {
// //     if (taskDeadline) {
// //       setTaskFormData((prev) => {
// //         return { ...prev, taskDeadline: taskDeadline.format("DD-MM-YYYY") };
// //       });
// //       setError((prev) => {
// //         const { taskDeadline: removed, ...rest } = prev;
// //         return rest;
// //       });
// //     }
// //   }, [taskDeadline]);

// //   const handleTaskFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setTaskFormData((prev) => {
// //       return { ...prev, [name]: value };
// //     });
// //     setError((prev) => {
// //       const { [name]: removed, ...rest } = prev;
// //       return rest;
// //     });
// //   };

// //   const handleTaskFormSubmit = (e) => {
// //     e.preventDefault();
// //     const validationErrors = validateTaskForm(taskFormData);

// //     if (Object.keys(validationErrors).length > 0) {
// //       setError(validationErrors);
// //       return;
// //     }

// //     setError({});
// //     try {
// //       addNewTask(taskFormData, loggedInUser);
// //       alert("Task successfully created!");
// //       setTaskFormData({ taskName: "", taskPriority: "" });
// //       setTaskDeadline(null);
// //     } catch (error) {
// //       console.error("Failed to create a task", error);
// //     }
// //   };

// //   return (
// //     <form noValidate onSubmit={handleTaskFormSubmit}>
// //       <TextField
// //         variant="outlined"
// //         label="Task Name"
// //         type="text"
// //         name="taskName"
// //         value={taskFormData.taskName}
// //         required
// //         onChange={handleTaskFormChange}
// //         error={error.taskName}
// //         helperText={error.taskName}
// //       />
// //       <FormControl fullWidth required error={Boolean(error.taskPriority)}>
// //         <InputLabel>Task Priority</InputLabel>
// //         <Select
// //           label="Task Priority"
// //           name="taskPriority"
// //           value={taskFormData.taskPriority}
// //           onChange={handleTaskFormChange}
// //         >
// //           <MenuItem value="low">🟢 Low</MenuItem>
// //           <MenuItem value="medium">🟡 Medium</MenuItem>
// //           <MenuItem value="high">🔴 High</MenuItem>
// //         </Select>
// //         {error.taskPriority && (
// //           <FormHelperText>{error.taskPriority}</FormHelperText>
// //         )}
// //       </FormControl>
// //       <LocalizationProvider dateAdapter={AdapterDayjs}>
// //         <DatePicker
// //           label="Task Deadline"
// //           name="taskDeadline"
// //           value={taskDeadline}
// //           onChange={(newValue) => setTaskDeadline(newValue)}
// //           slotProps={{
// //             textField: {
// //               required: true,
// //               error: Boolean(error.taskDeadline),
// //               helperText: error.taskDeadline,
// //             },
// //           }}
// //         />
// //       </LocalizationProvider>
// //       <Button variant="contained" type="submit">
// //         Create Task
// //       </Button>
// //     </form>
// //   );
// // }

// // export default TaskForm;

// import {
//   Button,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { validateTaskForm } from "../utils/validateTaskForm";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import { addNewTask } from "../service/api";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import "../styles/TaskForm.css";

// const IconArrowLeft = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="19" y1="12" x2="5" y2="12" />
//     <polyline points="12 19 5 12 12 5" />
//   </svg>
// );

// const IconTask = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="9" y1="13" x2="15" y2="13" />
//     <line x1="9" y1="17" x2="12" y2="17" />
//   </svg>
// );

// function TaskForm() {
//   const [taskFormData, setTaskFormData] = useState({
//     taskName: "",
//     taskPriority: "",
//   });
//   const [error, setError] = useState({});
//   const [taskDeadline, setTaskDeadline] = useState(null);

//   const loggedInUser = useSelector((state) => state.auth.currentUser);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (taskDeadline) {
//       setTaskFormData((prev) => ({
//         ...prev,
//         taskDeadline: taskDeadline.format("DD-MM-YYYY"),
//       }));
//       setError((prev) => {
//         const { taskDeadline: removed, ...rest } = prev;
//         return rest;
//       });
//     }
//   }, [taskDeadline]);

//   const handleTaskFormChange = (e) => {
//     const { name, value } = e.target;
//     setTaskFormData((prev) => ({ ...prev, [name]: value }));
//     setError((prev) => {
//       const { [name]: removed, ...rest } = prev;
//       return rest;
//     });
//   };

//   const handleTaskFormSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateTaskForm(taskFormData);
//     if (Object.keys(validationErrors).length > 0) {
//       setError(validationErrors);
//       return;
//     }
//     setError({});
//     try {
//       addNewTask(taskFormData, loggedInUser);
//       alert("Task successfully created!");
//       setTaskFormData({ taskName: "", taskPriority: "" });
//       setTaskDeadline(null);
//     } catch (error) {
//       console.error("Failed to create a task", error);
//     }
//   };

//   return (
//     <div className="taskform-page">
//       <div className="taskform-bg" />

//       {/* Navbar */}
//       <nav className="taskform-nav">
//         <div className="taskform-nav-inner">
//           <div className="taskform-logo">
//             <div className="logo-dots">
//               <span className="dot blue"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//             </div>
//             <span className="logo-text">Zenith</span>
//           </div>
//           <button className="back-btn" onClick={() => navigate(-1)}>
//             <IconArrowLeft />
//             <span>Back</span>
//           </button>
//         </div>
//       </nav>

//       {/* Card */}
//       <main className="taskform-main">
//         <div className="taskform-card">
//           {/* Card header */}
//           <div className="taskform-header">
//             <div className="taskform-icon-wrap">
//               <IconTask />
//             </div>
//             <div>
//               <h1 className="taskform-title">Create a Task</h1>
//               <p className="taskform-subtitle">
//                 Fill in the details to add a new task to your board.
//               </p>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="taskform-divider" />

//           {/* Form */}
//           <form
//             noValidate
//             onSubmit={handleTaskFormSubmit}
//             className="taskform-form"
//           >
//             {/* Task Name */}
//             <div className="taskform-field">
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Task Name"
//                 type="text"
//                 name="taskName"
//                 value={taskFormData.taskName}
//                 required
//                 onChange={handleTaskFormChange}
//                 error={!!error.taskName}
//                 helperText={error.taskName}
//                 className="taskform-input"
//                 placeholder="e.g. Design new landing page"
//               />
//             </div>

//             {/* Priority + Deadline side by side */}
//             <div className="taskform-row">
//               <div className="taskform-field">
//                 <FormControl
//                   fullWidth
//                   required
//                   error={Boolean(error.taskPriority)}
//                   className="taskform-input"
//                 >
//                   <InputLabel>Task Priority</InputLabel>
//                   <Select
//                     label="Task Priority"
//                     name="taskPriority"
//                     value={taskFormData.taskPriority}
//                     onChange={handleTaskFormChange}
//                   >
//                     <MenuItem value="low">🟢 Low</MenuItem>
//                     <MenuItem value="medium">🟡 Medium</MenuItem>
//                     <MenuItem value="high">🔴 High</MenuItem>
//                   </Select>
//                   {error.taskPriority && (
//                     <FormHelperText>{error.taskPriority}</FormHelperText>
//                   )}
//                 </FormControl>
//               </div>

//               <div className="taskform-field">
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label="Task Deadline"
//                     name="taskDeadline"
//                     value={taskDeadline}
//                     onChange={(newValue) => setTaskDeadline(newValue)}
//                     minDate={dayjs()}
//                     className="taskform-input"
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         error: Boolean(error.taskDeadline),
//                         helperText: error.taskDeadline,
//                       },
//                     }}
//                   />
//                 </LocalizationProvider>
//               </div>
//             </div>

//             {/* Priority badge preview */}
//             {taskFormData.taskPriority && (
//               <div
//                 className={`priority-preview priority-${taskFormData.taskPriority}`}
//               >
//                 <span className="priority-dot" />
//                 <span className="priority-label">
//                   {taskFormData.taskPriority.charAt(0).toUpperCase() +
//                     taskFormData.taskPriority.slice(1)}{" "}
//                   priority selected
//                 </span>
//               </div>
//             )}

//             {/* Actions */}
//             <div className="taskform-actions">
//               <button
//                 type="button"
//                 className="taskform-btn-cancel"
//                 onClick={() => navigate(-1)}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="taskform-btn-submit">
//                 Create Task
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default TaskForm;

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { validateTaskForm } from "../utils/validateTaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

function TaskForm() {
  const [taskFormData, setTaskFormData] = useState({
    taskName: "",
    taskPriority: "",
  });
  const [error, setError] = useState({});
  const [taskDeadline, setTaskDeadline] = useState(null);

  const loggedInUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (taskDeadline) {
      setTaskFormData((prev) => ({
        ...prev,
        taskDeadline: taskDeadline.format("DD-MM-YYYY"),
      }));
      setError((prev) => {
        const { taskDeadline: removed, ...rest } = prev;
        return rest;
      });
    }
  }, [taskDeadline]);

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });
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
      setTaskDeadline(null);
    } catch (error) {
      console.error("Failed to create a task", error);
    }
  };

  return (
    <div className="taskform-page">
      <div className="taskform-bg" />

      {/* ── Topbar ── */}
      <nav className="taskform-nav">
        <div className="taskform-nav-inner">
          {/* Logo */}
          <div className="taskform-logo">
            <div className="logo-dots">
              <span className="dot blue"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="logo-text">Zenith</span>
          </div>

          {/* Breadcrumb */}
          <div className="taskform-breadcrumb">
            <span>Board</span>
            <span className="sep">›</span>
            <span>My Tasks</span>
            <span className="sep">›</span>
            <span className="active">New Task</span>
          </div>

          {/* Back button */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            <IconArrowLeft />
            <span>Back</span>
          </button>
        </div>
      </nav>

      {/* ── Main split layout ── */}
      <main className="taskform-main">
        {/* ── LEFT ACCENT PANEL ── */}
        <div className="taskform-left">
          <div className="left-top">
            <div className="left-tag">
              <div className="left-tag-dot"></div>
              New Task
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

            {/* Step list */}
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

          {/* Bottom meta */}
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

        {/* ── RIGHT FORM PANEL ── */}
        <div className="taskform-right">
          {/* Form header */}
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

          {/* Form */}
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
                className="taskform-input"
                placeholder="e.g. Design new landing page"
              />
            </div>

            {/* Priority + Deadline */}
            <div>
              <div className="section-label">Priority &amp; Timeline</div>
              <div className="taskform-row">
                <div className="taskform-field">
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(error.taskPriority)}
                    className="taskform-input"
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

                <div className="taskform-field">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Task Deadline"
                      name="taskDeadline"
                      value={taskDeadline}
                      onChange={(newValue) => setTaskDeadline(newValue)}
                      minDate={dayjs()}
                      className="taskform-input"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: Boolean(error.taskDeadline),
                          helperText: error.taskDeadline,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              {/* Priority badge */}
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

            {/* Footer actions */}
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
                  Create Task
                  <IconArrowRight />
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
