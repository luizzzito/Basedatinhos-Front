import React from "react";
import ReactDOM from "react-dom/client";
import AudiosList from "./show-audios-list/AudiosList.jsx";
import "typeface-inter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AudiosList />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
