// import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import {
//   getAllTasksByUser,
//   updateTasks,
//   deleteTasks,
// } from "../redux/slice/taskSlice";
// import { logout } from "../redux/slice/authSlice";
// import "../styles/Board.css";

// const stageMap = {
//   backlog: 0,
//   todo: 1,
//   inprogress: 2,
//   done: 3,
// };

// const columns = [
//   { id: "backlog", label: "Backlog", dot: "#6b7280" },
//   { id: "todo", label: "To Do", dot: "#3b82f6" },
//   { id: "inprogress", label: "In Progress", dot: "#f97316" },
//   { id: "done", label: "Done", dot: "#10b981" },
// ];

// const priorityColors = {
//   low: { bg: "#f0fdf4", color: "#16a34a" },
//   medium: { bg: "#fff7ed", color: "#ea580c" },
//   med: { bg: "#fff7ed", color: "#ea580c" },
//   high: { bg: "#fff1f2", color: "#dc2626" },
// };

// const IconBoard = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="3" width="7" height="7" />
//     <rect x="14" y="3" width="7" height="7" />
//     <rect x="14" y="14" width="7" height="7" />
//     <rect x="3" y="14" width="7" height="7" />
//   </svg>
// );
// const IconPlus = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );
// const IconLogout = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//     <polyline points="16 17 21 12 16 7" />
//     <line x1="21" y1="12" x2="9" y2="12" />
//   </svg>
// );
// const IconDashboard = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="3" width="7" height="9" />
//     <rect x="14" y="3" width="7" height="5" />
//     <rect x="14" y="12" width="7" height="9" />
//     <rect x="3" y="16" width="7" height="5" />
//   </svg>
// );
// const IconClose = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// function Board() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { tasks } = useSelector((state) => state.tasks);
//   const { currentUser } = useSelector((state) => state.auth);

//   const [editingTask, setEditingTask] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     if (currentUser) dispatch(getAllTasksByUser(currentUser));
//   }, [currentUser]);

//   const groupedTasks = {
//     backlog: tasks.filter((t) => t.taskStage === 0),
//     todo: tasks.filter((t) => t.taskStage === 1),
//     inprogress: tasks.filter((t) => t.taskStage === 2),
//     done: tasks.filter((t) => t.taskStage === 3),
//   };

//   const handleDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;
//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     )
//       return;
//     const movedTask = groupedTasks[source.droppableId][source.index];
//     if (!movedTask) return;
//     const newStage = stageMap[destination.droppableId];
//     dispatch(
//       updateTasks({ taskId: movedTask.id, update: { taskStage: newStage } }),
//     );
//   };

//   const handleEditClick = (task) => {
//     setEditingTask(task);
//     setEditForm({
//       taskName: task.taskName,
//       taskPriority: task.taskPriority,
//       taskDeadline: task.taskDeadline,
//     });
//   };

//   const handleEditSave = () => {
//     dispatch(updateTasks({ taskId: editingTask.id, update: editForm }));
//     setEditingTask(null);
//   };

//   const handleDelete = (taskId) => dispatch(deleteTasks(taskId));
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const initials = currentUser ? currentUser.charAt(0).toUpperCase() : "U";
//   const totalTasks = tasks.length;

//   return (
//     <div className="board-page">
//       <div className="board-bg" />

//       {/* ── Topbar ── */}
//       <nav className="board-nav">
//         <div className="board-nav-inner">
//           <div className="board-logo">
//             <div className="logo-dots">
//               <span className="dot blue"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//             </div>
//             <span className="logo-text">Zenith</span>
//           </div>

//           {/* Breadcrumb: Home › Dashboard › Board */}
//           <div className="board-breadcrumb">
//             <span className="home-text" onClick={() => navigate("/")}>
//               Home
//             </span>
//             <span className="sep">›</span>
//             <span className="home-text" onClick={() => navigate("/dashboard")}>
//               Dashboard
//             </span>
//             <span className="sep">›</span>
//             <span className="active">Board</span>
//           </div>

//           <div className="board-nav-right">
//             <div className="user-pill">
//               <div className="user-avatar">{initials}</div>
//               <span className="user-name">{currentUser}</span>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               <IconLogout />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="board-main">
//         {/* ── LEFT SIDEBAR — same width & padding as Dashboard ── */}
//         <div className="board-left">
//           <div className="board-left-top">
//             <div className="board-user-block">
//               <div className="board-avatar-lg">{initials}</div>
//               <div>
//                 <div className="board-user-label">Logged in as</div>
//                 <div className="board-user-name">{currentUser}</div>
//               </div>
//             </div>

//             <div className="board-divider" />

//             <div className="board-nav-label">Navigation</div>
//             <div className="board-nav-items">
//               {/* Dashboard — not active on this page */}
//               <button
//                 className="board-nav-item"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 <div className="board-nav-icon">
//                   <IconDashboard />
//                 </div>
//                 <div className="board-nav-text">
//                   <span className="board-nav-item-label">Dashboard</span>
//                   <span className="board-nav-item-sub">Overview & stats</span>
//                 </div>
//               </button>
//               {/* Board — active */}
//               <button className="board-nav-item active">
//                 <div className="board-nav-icon">
//                   <IconBoard />
//                 </div>
//                 <div className="board-nav-text">
//                   <span className="board-nav-item-label">My Board</span>
//                   <span className="board-nav-item-sub">View all columns</span>
//                 </div>
//               </button>
//               {/* New Task */}
//               <button
//                 className="board-nav-item"
//                 onClick={() => navigate("/create-task")}
//               >
//                 <div className="board-nav-icon board-nav-icon-blue">
//                   <IconPlus />
//                 </div>
//                 <div className="board-nav-text">
//                   <span className="board-nav-item-label">New Task</span>
//                   <span className="board-nav-item-sub">Add to board</span>
//                 </div>
//               </button>
//             </div>

//             <div className="board-divider" style={{ marginTop: "20px" }} />

//             <div className="board-nav-label" style={{ marginTop: "4px" }}>
//               Columns
//             </div>
//             <div className="board-col-stats">
//               {columns.map((col) => (
//                 <div key={col.id} className="board-col-stat">
//                   <div
//                     className="board-col-stat-dot"
//                     style={{ backgroundColor: col.dot }}
//                   />
//                   <span className="board-col-stat-name">{col.label}</span>
//                   <span className="board-col-stat-count">
//                     {groupedTasks[col.id].length}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="board-left-footer">
//             <div className="board-total-label">Total Tasks</div>
//             <div className="board-total-count">{totalTasks}</div>
//             <div className="board-total-sub">across all status</div>
//           </div>
//         </div>

//         {/* ── RIGHT BOARD CONTENT ── */}
//         <div className="board-right">
//           <div className="board-header">
//             <div className="board-title-block">
//               <div className="board-page-label">Kanban Board</div>
//               <h1>My Tasks</h1>
//             </div>
//             <div className="board-header-actions">
//               <button
//                 className="board-add-btn"
//                 onClick={() => navigate("/create-task")}
//               >
//                 <IconPlus />
//                 <span>Add Task</span>
//               </button>
//             </div>
//           </div>

//           <DragDropContext onDragEnd={handleDragEnd}>
//             <div className="board-columns-wrapper">
//               {columns.map((column) => (
//                 <Droppable key={column.id} droppableId={column.id}>
//                   {(provided, snapshot) => (
//                     <div
//                       className={`board-column ${snapshot.isDraggingOver ? "drag-over" : ""}`}
//                     >
//                       <div className="board-column-header">
//                         <div className="board-column-title-row">
//                           <div
//                             className="board-column-dot"
//                             style={{ backgroundColor: column.dot }}
//                           />
//                           <span className="board-column-title">
//                             {column.label}
//                           </span>
//                         </div>
//                         <span className="board-column-count">
//                           {groupedTasks[column.id].length}
//                         </span>
//                       </div>

//                       <div
//                         className="board-column-body"
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                       >
//                         {groupedTasks[column.id].length === 0 &&
//                           !snapshot.isDraggingOver && (
//                             <div className="board-column-empty">
//                               <div className="board-column-empty-icon">○</div>
//                               <span>No tasks yet</span>
//                             </div>
//                           )}

//                         {groupedTasks[column.id].map((task, index) => (
//                           <Draggable
//                             key={task.id}
//                             draggableId={String(task.id)}
//                             index={index}
//                           >
//                             {(provided, snapshot) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className="task-card"
//                                 style={{
//                                   ...provided.draggableProps.style,
//                                   boxShadow: snapshot.isDragging
//                                     ? "0 12px 32px rgba(0,0,0,0.15)"
//                                     : undefined,
//                                   border: snapshot.isDragging
//                                     ? "1px solid #3b82f6"
//                                     : undefined,
//                                 }}
//                               >
//                                 <div className="task-card-name">
//                                   {task.taskName}
//                                 </div>
//                                 <div className="task-card-meta">
//                                   <span
//                                     className="task-priority-badge"
//                                     style={{
//                                       backgroundColor: (
//                                         priorityColors[task.taskPriority] || {
//                                           bg: "#f3f4f6",
//                                         }
//                                       ).bg,
//                                       color: (
//                                         priorityColors[task.taskPriority] || {
//                                           color: "#6b7280",
//                                         }
//                                       ).color,
//                                     }}
//                                   >
//                                     {task.taskPriority}
//                                   </span>
//                                   <span className="task-deadline">
//                                     📅 {task.taskDeadline}
//                                   </span>
//                                 </div>
//                                 <div className="task-card-actions">
//                                   <button
//                                     className="task-btn task-btn-edit"
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                     onClick={() => handleEditClick(task)}
//                                   >
//                                     Edit
//                                   </button>
//                                   <button
//                                     className="task-btn task-btn-delete"
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                     onClick={() => handleDelete(task.id)}
//                                   >
//                                     Delete
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     </div>
//                   )}
//                 </Droppable>
//               ))}
//             </div>
//           </DragDropContext>
//         </div>
//       </main>

//       {/* ── EDIT MODAL ── */}
//       {editingTask && (
//         <div className="modal-overlay" onClick={() => setEditingTask(null)}>
//           <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <div>
//                 <div className="modal-label">Edit Task</div>
//                 <div className="modal-title">{editingTask.taskName}</div>
//               </div>
//               <button
//                 className="modal-close-btn"
//                 onClick={() => setEditingTask(null)}
//               >
//                 <IconClose />
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="modal-field">
//                 <label className="modal-field-label">Task Name</label>
//                 <input
//                   className="modal-input"
//                   value={editForm.taskName}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, taskName: e.target.value })
//                   }
//                   placeholder="Task name"
//                 />
//               </div>
//               <div className="modal-field">
//                 <label className="modal-field-label">Priority</label>
//                 <select
//                   className="modal-input"
//                   value={editForm.taskPriority}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, taskPriority: e.target.value })
//                   }
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//               <div className="modal-field">
//                 <label className="modal-field-label">Deadline</label>
//                 <input
//                   className="modal-input"
//                   type="date"
//                   value={editForm.taskDeadline}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, taskDeadline: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="modal-btn-cancel"
//                 onClick={() => setEditingTask(null)}
//               >
//                 Cancel
//               </button>
//               <button className="modal-btn-save" onClick={handleEditSave}>
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Board;

// import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import {
//   getAllTasksByUser,
//   updateTasks,
//   deleteTasks,
// } from "../redux/slice/taskSlice";
// import { logout } from "../redux/slice/authSlice";
// import "../styles/Board.css";

// const stageMap = {
//   backlog: 0,
//   todo: 1,
//   inprogress: 2,
//   done: 3,
// };

// const columns = [
//   { id: "backlog", label: "Backlog", dot: "#6b7280" },
//   { id: "todo", label: "To Do", dot: "#3b82f6" },
//   { id: "inprogress", label: "In Progress", dot: "#f97316" },
//   { id: "done", label: "Done", dot: "#10b981" },
// ];

// const priorityColors = {
//   low: { bg: "#f0fdf4", color: "#16a34a" },
//   medium: { bg: "#fff7ed", color: "#ea580c" },
//   med: { bg: "#fff7ed", color: "#ea580c" },
//   high: { bg: "#fff1f2", color: "#dc2626" },
// };

// const IconBoard = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="3" width="7" height="7" />
//     <rect x="14" y="3" width="7" height="7" />
//     <rect x="14" y="14" width="7" height="7" />
//     <rect x="3" y="14" width="7" height="7" />
//   </svg>
// );
// const IconPlus = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );
// const IconLogout = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//     <polyline points="16 17 21 12 16 7" />
//     <line x1="21" y1="12" x2="9" y2="12" />
//   </svg>
// );
// const IconDashboard = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="3" width="7" height="9" />
//     <rect x="14" y="3" width="7" height="5" />
//     <rect x="14" y="12" width="7" height="9" />
//     <rect x="3" y="16" width="7" height="5" />
//   </svg>
// );
// const IconClose = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//   >
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// function Board() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { tasks } = useSelector((state) => state.tasks);
//   const { currentUser } = useSelector((state) => state.auth);

//   const [editingTask, setEditingTask] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     if (currentUser) dispatch(getAllTasksByUser(currentUser));
//   }, [currentUser]);

//   const groupedTasks = {
//     backlog: tasks.filter((t) => t.taskStage === 0),
//     todo: tasks.filter((t) => t.taskStage === 1),
//     inprogress: tasks.filter((t) => t.taskStage === 2),
//     done: tasks.filter((t) => t.taskStage === 3),
//   };

//   const handleDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;
//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     )
//       return;
//     const movedTask = groupedTasks[source.droppableId][source.index];
//     if (!movedTask) return;
//     const newStage = stageMap[destination.droppableId];
//     dispatch(
//       updateTasks({ taskId: movedTask.id, update: { taskStage: newStage } }),
//     );
//   };

//   const handleEditClick = (task) => {
//     setEditingTask(task);
//     setEditForm({
//       taskName: task.taskName,
//       taskPriority: task.taskPriority,
//       taskDeadline: task.taskDeadline,
//     });
//   };

//   const handleEditSave = () => {
//     dispatch(updateTasks({ taskId: editingTask.id, update: editForm }));
//     setEditingTask(null);
//   };

//   const handleDelete = (taskId) => dispatch(deleteTasks(taskId));
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const initials = currentUser ? currentUser.charAt(0).toUpperCase() : "U";
//   const totalTasks = tasks.length;

//   return (
//     <div className="board-page">
//       <div className="board-bg" />

//       {/* ── Topbar ── */}
//       <nav className="board-nav">
//         <div className="board-nav-inner">
//           <div className="board-logo">
//             <div className="logo-dots">
//               <span className="dot blue"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//             </div>
//             <span className="logo-text">Zenith</span>
//           </div>

//           <div className="board-breadcrumb">
//             <span className="home-text" onClick={() => navigate("/")}>
//               Home
//             </span>
//             <span className="sep">›</span>
//             <span className="home-text" onClick={() => navigate("/dashboard")}>
//               Dashboard
//             </span>
//             <span className="sep">›</span>
//             <span className="active">Board</span>
//           </div>

//           <div className="board-nav-right">
//             <div className="user-pill">
//               <div className="user-avatar">{initials}</div>
//               <span className="user-name">{currentUser}</span>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               <IconLogout />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="board-main">
//         {/* ── LEFT SIDEBAR ── */}
//         <div className="board-left">
//           <div className="board-left-top">
//             {/* User block — same structure as Dashboard */}
//             <div className="board-user-block">
//               <div className="board-avatar-lg">{initials}</div>
//               <div>
//                 <div className="board-user-label">Logged in as</div>
//                 <div className="board-user-name">{currentUser}</div>
//               </div>
//             </div>

//             <div className="board-divider" />

//             <div className="board-nav-label">Navigation</div>
//             <div className="board-nav-items">
//               {/* Dashboard — NOT active on this page */}
//               <button
//                 className="board-nav-item"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 <div className="board-nav-icon">
//                   <IconDashboard />
//                 </div>
//                 <div className="board-nav-text">
//                   <span className="board-nav-item-label">Dashboard</span>
//                   <span className="board-nav-item-sub">Overview & stats</span>
//                 </div>
//               </button>

//               {/* Board — ACTIVE on this page */}
//               <button className="board-nav-item active">
//                 <div className="board-nav-icon">
//                   <IconBoard />
//                 </div>
//                 <div className="board-nav-text">
//                   <span className="board-nav-item-label">My Board</span>
//                   <span className="board-nav-item-sub">View all columns</span>
//                 </div>
//               </button>

//               {/* New Task — NOT active */}
//               <button
//                 className="board-nav-item"
//                 onClick={() => navigate("/create-task")}
//               >
//                 <div className="board-nav-icon board-nav-icon-blue">
//                   <IconPlus />
//                 </div>
//                 <div className="board-nav-text">
//                   <span className="board-nav-item-label">New Task</span>
//                   <span className="board-nav-item-sub">Add to board</span>
//                 </div>
//               </button>
//             </div>

//             <div className="board-divider" style={{ marginTop: "20px" }} />

//             <div className="board-nav-label" style={{ marginTop: "4px" }}>
//               Columns
//             </div>
//             <div className="board-col-stats">
//               {columns.map((col) => (
//                 <div key={col.id} className="board-col-stat">
//                   <div
//                     className="board-col-stat-dot"
//                     style={{ backgroundColor: col.dot }}
//                   />
//                   <span className="board-col-stat-name">{col.label}</span>
//                   <span className="board-col-stat-count">
//                     {groupedTasks[col.id].length}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="board-left-footer">
//             <div className="board-total-label">Total Tasks</div>
//             <div className="board-total-count">{totalTasks}</div>
//             <div className="board-total-sub">across all status</div>
//           </div>
//         </div>

//         {/* ── RIGHT BOARD CONTENT ── */}
//         <div className="board-right">
//           <div className="board-header">
//             <div className="board-title-block">
//               <div className="board-page-label">Kanban Board</div>
//               <h1>My Tasks</h1>
//             </div>
//             <div className="board-header-actions">
//               <button
//                 className="board-add-btn"
//                 onClick={() => navigate("/create-task")}
//               >
//                 <IconPlus />
//                 <span>Add Task</span>
//               </button>
//             </div>
//           </div>

//           <DragDropContext onDragEnd={handleDragEnd}>
//             <div className="board-columns-wrapper">
//               {columns.map((column) => (
//                 <Droppable key={column.id} droppableId={column.id}>
//                   {(provided, snapshot) => (
//                     <div
//                       className={`board-column ${snapshot.isDraggingOver ? "drag-over" : ""}`}
//                     >
//                       <div className="board-column-header">
//                         <div className="board-column-title-row">
//                           <div
//                             className="board-column-dot"
//                             style={{ backgroundColor: column.dot }}
//                           />
//                           <span className="board-column-title">
//                             {column.label}
//                           </span>
//                         </div>
//                         <span className="board-column-count">
//                           {groupedTasks[column.id].length}
//                         </span>
//                       </div>

//                       <div
//                         className="board-column-body"
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                       >
//                         {groupedTasks[column.id].length === 0 &&
//                           !snapshot.isDraggingOver && (
//                             <div className="board-column-empty">
//                               <div className="board-column-empty-icon">○</div>
//                               <span>No tasks yet</span>
//                             </div>
//                           )}

//                         {groupedTasks[column.id].map((task, index) => (
//                           <Draggable
//                             key={task.id}
//                             draggableId={String(task.id)}
//                             index={index}
//                           >
//                             {(provided, snapshot) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className="task-card"
//                                 style={{
//                                   ...provided.draggableProps.style,
//                                   boxShadow: snapshot.isDragging
//                                     ? "0 12px 32px rgba(0,0,0,0.15)"
//                                     : undefined,
//                                   border: snapshot.isDragging
//                                     ? "1px solid #3b82f6"
//                                     : undefined,
//                                 }}
//                               >
//                                 <div className="task-card-name">
//                                   {task.taskName}
//                                 </div>
//                                 <div className="task-card-meta">
//                                   <span
//                                     className="task-priority-badge"
//                                     style={{
//                                       backgroundColor: (
//                                         priorityColors[task.taskPriority] || {
//                                           bg: "#f3f4f6",
//                                         }
//                                       ).bg,
//                                       color: (
//                                         priorityColors[task.taskPriority] || {
//                                           color: "#6b7280",
//                                         }
//                                       ).color,
//                                     }}
//                                   >
//                                     {task.taskPriority}
//                                   </span>
//                                   <span className="task-deadline">
//                                     📅 {task.taskDeadline}
//                                   </span>
//                                 </div>
//                                 <div className="task-card-actions">
//                                   <button
//                                     className="task-btn task-btn-edit"
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                     onClick={() => handleEditClick(task)}
//                                   >
//                                     Edit
//                                   </button>
//                                   <button
//                                     className="task-btn task-btn-delete"
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                     onClick={() => handleDelete(task.id)}
//                                   >
//                                     Delete
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     </div>
//                   )}
//                 </Droppable>
//               ))}
//             </div>
//           </DragDropContext>
//         </div>
//       </main>

//       {/* ── EDIT MODAL ── */}
//       {editingTask && (
//         <div className="modal-overlay" onClick={() => setEditingTask(null)}>
//           <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <div>
//                 <div className="modal-label">Edit Task</div>
//                 <div className="modal-title">{editingTask.taskName}</div>
//               </div>
//               <button
//                 className="modal-close-btn"
//                 onClick={() => setEditingTask(null)}
//               >
//                 <IconClose />
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="modal-field">
//                 <label className="modal-field-label">Task Name</label>
//                 <input
//                   className="modal-input"
//                   value={editForm.taskName}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, taskName: e.target.value })
//                   }
//                   placeholder="Task name"
//                 />
//               </div>
//               <div className="modal-field">
//                 <label className="modal-field-label">Priority</label>
//                 <select
//                   className="modal-input"
//                   value={editForm.taskPriority}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, taskPriority: e.target.value })
//                   }
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//               <div className="modal-field">
//                 <label className="modal-field-label">Deadline</label>
//                 <input
//                   className="modal-input"
//                   type="date"
//                   value={editForm.taskDeadline}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, taskDeadline: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="modal-btn-cancel"
//                 onClick={() => setEditingTask(null)}
//               >
//                 Cancel
//               </button>
//               <button className="modal-btn-save" onClick={handleEditSave}>
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Board;

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getAllTasksByUser,
  updateTasks,
  deleteTasks,
} from "../redux/slice/taskSlice";
import { logout } from "../redux/slice/authSlice";
import Sidebar from "./SideBar";
import "../styles/Board.css";

const stageMap = {
  backlog: 0,
  todo: 1,
  inprogress: 2,
  done: 3,
};

const columns = [
  { id: "backlog", label: "Backlog", dot: "#6b7280" },
  { id: "todo", label: "To Do", dot: "#3b82f6" },
  { id: "inprogress", label: "In Progress", dot: "#f97316" },
  { id: "done", label: "Done", dot: "#10b981" },
];

const priorityColors = {
  low: { bg: "#f0fdf4", color: "#16a34a" },
  medium: { bg: "#fff7ed", color: "#ea580c" },
  med: { bg: "#fff7ed", color: "#ea580c" },
  high: { bg: "#fff1f2", color: "#dc2626" },
};

const IconPlus = () => (
  <svg
    width="14"
    height="14"
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
    width="14"
    height="14"
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
const IconClose = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function Board() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);
  const { currentUser } = useSelector((state) => state.auth);

  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (currentUser) dispatch(getAllTasksByUser(currentUser));
  }, [currentUser]);

  const groupedTasks = {
    backlog: tasks.filter((t) => t.taskStage === 0),
    todo: tasks.filter((t) => t.taskStage === 1),
    inprogress: tasks.filter((t) => t.taskStage === 2),
    done: tasks.filter((t) => t.taskStage === 3),
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const movedTask = groupedTasks[source.droppableId][source.index];
    if (!movedTask) return;
    dispatch(
      updateTasks({
        taskId: movedTask.id,
        update: { taskStage: stageMap[destination.droppableId] },
      }),
    );
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditForm({
      taskName: task.taskName,
      taskPriority: task.taskPriority,
      taskDeadline: task.taskDeadline,
    });
  };

  const handleEditSave = () => {
    dispatch(updateTasks({ taskId: editingTask.id, update: editForm }));
    setEditingTask(null);
  };

  const handleDelete = (taskId) => dispatch(deleteTasks(taskId));
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const initials = currentUser ? currentUser.charAt(0).toUpperCase() : "U";

  return (
    <div className="board-page">
      <div className="board-bg" />

      {/* ── Topbar ── */}
      <nav className="board-nav">
        <div className="board-nav-inner">
          <div className="board-logo">
            <div className="logo-dots">
              <span className="dot blue"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="logo-text">Zenith</span>
          </div>

          <div className="board-breadcrumb">
            <span className="home-text" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="sep">›</span>
            <span className="home-text" onClick={() => navigate("/dashboard")}>
              Dashboard
            </span>
            <span className="sep">›</span>
            <span className="active">Board</span>
          </div>

          <div className="board-nav-right">
            <div className="user-pill">
              <div className="user-avatar">{initials}</div>
              <span className="user-name">{currentUser}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <IconLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="board-main">
        {/* ── SHARED SIDEBAR — same component as Dashboard ── */}
        <Sidebar
          activePage="board"
          username={currentUser}
          showProgress={false}
          totalTasks={tasks.length}
          groupedTasks={groupedTasks}
        />

        {/* ── RIGHT BOARD CONTENT ── */}
        <div className="board-right">
          <div className="board-header">
            <div className="board-title-block">
              <div className="board-page-label">Kanban Board</div>
              <h1>My Tasks</h1>
            </div>
            <div className="board-header-actions">
              <button
                className="board-add-btn"
                onClick={() => navigate("/create-task")}
              >
                <IconPlus />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="board-columns-wrapper">
              {columns.map((column) => (
                <Droppable key={column.id} droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`board-column ${snapshot.isDraggingOver ? "drag-over" : ""}`}
                    >
                      <div className="board-column-header">
                        <div className="board-column-title-row">
                          <div
                            className="board-column-dot"
                            style={{ backgroundColor: column.dot }}
                          />
                          <span className="board-column-title">
                            {column.label}
                          </span>
                        </div>
                        <span className="board-column-count">
                          {groupedTasks[column.id].length}
                        </span>
                      </div>

                      <div
                        className="board-column-body"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {groupedTasks[column.id].length === 0 &&
                          !snapshot.isDraggingOver && (
                            <div className="board-column-empty">
                              <div className="board-column-empty-icon">○</div>
                              <span>No tasks yet</span>
                            </div>
                          )}
                        {groupedTasks[column.id].map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={String(task.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="task-card"
                                style={{
                                  ...provided.draggableProps.style,
                                  boxShadow: snapshot.isDragging
                                    ? "0 12px 32px rgba(0,0,0,0.15)"
                                    : undefined,
                                  border: snapshot.isDragging
                                    ? "1px solid #3b82f6"
                                    : undefined,
                                }}
                              >
                                <div className="task-card-name">
                                  {task.taskName}
                                </div>
                                <div className="task-card-meta">
                                  <span
                                    className="task-priority-badge"
                                    style={{
                                      backgroundColor: (
                                        priorityColors[task.taskPriority] || {
                                          bg: "#f3f4f6",
                                        }
                                      ).bg,
                                      color: (
                                        priorityColors[task.taskPriority] || {
                                          color: "#6b7280",
                                        }
                                      ).color,
                                    }}
                                  >
                                    {task.taskPriority}
                                  </span>
                                  <span className="task-deadline">
                                    📅 {task.taskDeadline}
                                  </span>
                                </div>
                                <div className="task-card-actions">
                                  <button
                                    className="task-btn task-btn-edit"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={() => handleEditClick(task)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="task-btn task-btn-delete"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={() => handleDelete(task.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </main>

      {/* ── EDIT MODAL ── */}
      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-label">Edit Task</div>
                <div className="modal-title">{editingTask.taskName}</div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setEditingTask(null)}
              >
                <IconClose />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-field-label">Task Name</label>
                <input
                  className="modal-input"
                  value={editForm.taskName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, taskName: e.target.value })
                  }
                  placeholder="Task name"
                />
              </div>
              <div className="modal-field">
                <label className="modal-field-label">Priority</label>
                <select
                  className="modal-input"
                  value={editForm.taskPriority}
                  onChange={(e) =>
                    setEditForm({ ...editForm, taskPriority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="modal-field">
                <label className="modal-field-label">Deadline</label>
                <input
                  className="modal-input"
                  type="date"
                  value={editForm.taskDeadline}
                  onChange={(e) =>
                    setEditForm({ ...editForm, taskDeadline: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn-cancel"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>
              <button className="modal-btn-save" onClick={handleEditSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
