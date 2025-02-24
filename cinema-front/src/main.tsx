import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import MoviesList from "./pages/MoviesList.tsx";
import MovieReservation from "./pages/MovieReservation.tsx";
import CreateMovie from "./pages/createMovie.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MoviesList />,
      },
      {
        path: "/add-reservation",
        element: <MovieReservation />,
      },
      {
        path: "/add-movie",
        element: <CreateMovie />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
