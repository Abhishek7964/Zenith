import React, { useEffect } from "react";
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

  // allTasksByUser(localStorage.getItem("currentUser"));
  // addNewTask({
  //   id: "3",
  //   createdBy: "palabhab",
  //   taskName: "Sonarqube setup",
  //   taskStage: 0,
  //   taskPriority: "low",
  //   taskDeadline: "2026-02-15",
  // });

  useEffect(() => {
    // updateTask(3, {
    //   id: "3",
    //   createdBy: "palabhab",
    //   taskName: "Sonarqube setup 1",
    //   taskStage: 0,
    //   taskPriority: "low",
    //   taskDeadline: "2026-02-10",
    //   createdAt: "2026-02-15T10:30:00.000Z",
    // });
    deleteTask(3);
  }, []);

  return (
    <div>
      <div>Welcome, {loggedInUser}</div>
      <div>Dashboard Page!</div>
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
