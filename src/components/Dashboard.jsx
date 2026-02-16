import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import {
  addNewTask,
  allTasksByUser,
  deleteTask,
  updateTask,
} from "../service/api";

function Dashboard() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.auth.currentUser);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleBoardClick = () => {
    navigate("/board");
  };

  const handleCreateTaskClick = () => {
    navigate("/create-task");
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await allTasksByUser(loggedInUser);
        setTotalTasks(tasks.length);
        setPendingTasks(
          tasks.filter((task) => {
            return task.taskStage !== 3;
          }).length,
        );
        setCompletedTasks(
          tasks.filter((task) => {
            return task.taskStage === 3;
          }).length,
        );
      } catch (error) {
        console.error("Something went wrong while fetching tasks", error);
      }
    }
    if (loggedInUser) {
      fetchTasks();
    }
  }, [loggedInUser]);

  return (
    <div>
      <div>Welcome, {loggedInUser}</div>
      <div>Dashboard Page!</div>
      <div>Total Tasks: {totalTasks}</div>
      <div>Completed Tasks: {completedTasks}</div>
      <div>Pending Tasks: {pendingTasks}</div>
      <Button variant="contained" onClick={handleLogoutClick}>
        Logout
      </Button>
      <Button variant="contained" onClick={handleBoardClick}>
        Go To Board
      </Button>
      <Button variant="contained" onClick={handleCreateTaskClick}>
        Create Task
      </Button>
    </div>
  );
}

export default Dashboard;
