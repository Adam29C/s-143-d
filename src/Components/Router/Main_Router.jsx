// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./PublicRoute/PublicRoute.route";
import adminRoutes from "./PrivateRoute/Superadmin.route";
// import ErrorPage from "../Pages/Auth/NotFound";
import ErrorPage from "../Testing/aaaa";

const router = createBrowserRouter([
  ...publicRoutes,
  ...adminRoutes,
  {
    path: "*",
   element: <ErrorPage />,
  },
]);

export default router;
