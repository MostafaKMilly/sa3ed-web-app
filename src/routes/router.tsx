import { createBrowserRouter } from "react-router-dom";
import { Login, Home, Signup } from "@/pages";
import { MainLayout } from "@/layouts";

const router = createBrowserRouter([
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
    children: [
      {
        element: <Home />,
        index: true,
      },
    ],
  },
]);

export default router;
