/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token, allowedRoles, role }) => {
  if (!token) {
    return <Navigate to="/log-in" replace />;
  }

  if (!allowedRoles || !allowedRoles.includes(role)) {
    if (role === "ROLE_USER") {
      return <Navigate to="/feed" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
