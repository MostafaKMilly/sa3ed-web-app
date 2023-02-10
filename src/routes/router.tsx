import { createBrowserRouter } from "react-router-dom";
import { Login, Home, Signup } from "@/pages";
import { MainLayout } from "@/layouts";
import { QueryClient } from "@tanstack/react-query";

const router = (client: QueryClient) =>
  createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      loader: Login.loader,
      action: Login.action,
    },
    {
      path: "/signup",
      element: <Signup />,
      loader: Signup.loader,
      action: Signup.action,
    },
    {
      path: "/",
      element: <MainLayout />,
      loader: MainLayout.loader,
      children: [
        {
          element: <Home />,
          index: true,
        },
      ],
    },
  ]);

export default router;
