import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
