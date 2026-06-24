import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import queryClient from "@/lib/query-client";
import { pesquisaAppRoutes } from "@/routes/pesquisa.routes";
import "@/index.css";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/pesquisas" replace /> },
  ...pesquisaAppRoutes,
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
