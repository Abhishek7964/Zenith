import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import AuthRoute from "./components/AuthRoute";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import FocusMode from "./components/FocusMode";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/focus-mode"
            element={
              <ProtectedRoute>
                <FocusMode />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
