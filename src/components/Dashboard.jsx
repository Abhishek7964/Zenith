import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

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
