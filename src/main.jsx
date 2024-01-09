import React from "react";
import ReactDOM from "react-dom/client";
import AudiosList from "./show-audios-list/AudiosList.jsx";
import UploadAudios from "./upload-audios/UploadAudios.jsx";
import "typeface-inter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AudiosList />,
  },
  {
    path: "/upload",
    element: <UploadAudios />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
