import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function AuthRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default AuthRoute;
