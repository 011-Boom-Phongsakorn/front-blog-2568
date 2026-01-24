import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetail from "../pages/PostDetail";
import Author from "../pages/Author";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        )
      },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        )
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "author/:id", element: <Author /> },
    ],
  },
]);

export default router;
