// src/components/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "../../Pages/Auth/NotFound";
import Login from "../../Pages/Auth/Login";

const PublicRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  return !isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PublicRoute;
