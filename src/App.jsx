import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Router/Main_Router";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => <RouterProvider router={router} />;

export default App;
