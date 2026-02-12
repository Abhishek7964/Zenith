import React from "react";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
