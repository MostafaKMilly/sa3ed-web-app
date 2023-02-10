import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Help,
  Signup,
  Donation,
  ImportantLinks,
  UserInfo,
} from "@/pages";
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
          element: <Help />,
          index: true,
        },
        {
          element: <Donation />,
          path: "donation",
        },
        {
          element: <UserInfo />,
          path: "user-info",
        },
        {
          element: <ImportantLinks />,
          path: "important-links",
        },
      ],
    },
  ]);

export default router;
