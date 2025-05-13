import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../../Pages/Auth/Login";
import PublicRoute from "../PublicRoute/index";
import ErrorPage from "../../Pages/Auth/NotFound";
import BlockedUser from "../../Pages/Auth/BlockedUser";
import ExpiredUser from "../../Pages/Auth/ExpiredUser";

import Wraper from "../../Layout/Wraper/Wraper";

const isAuthenticated = "";

const publicRoutes = [
  {
    path: "/",
    element: <PublicRoute element={Wraper} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute element={Login} isAuthenticated={isAuthenticated} />
        ),
      },
      {
        path: "blocked",
        element: (
          <PublicRoute
            element={BlockedUser}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
      {
        path: "tokenexpiry",
        element: (
          <PublicRoute
            element={ExpiredUser}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
    ],
  },
];

export default publicRoutes;
