import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import store from "./redux/store";
import AdLogin from "./components/admin/AdLogin"; 
import AdminHome from "./components/admin/AdminHome";
import { Provider } from "react-redux";
import AdLogin from "./components/admin/AdLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: rootLoader,
  },
  {
    path: "/signup",
    element: <Register />,
    // loader: teamLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "/admin/login",
    element: <AdLogin />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
