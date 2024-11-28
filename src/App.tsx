import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import Home from "./pages/Home";
import "./App.css"
import Email from "./pages/Email";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Test";
// import ProtectedRoute from "./component/ProtectedRoute";
import CenterLayout from "./component/CenterOutlet";
import Blog from "./pages/Blog";
import BlogLayout from "./component/BlogOutlet";
import Post from "./pages/Post";
import Demo from "./pages/Demo";
import ImageUpload from "./pages/Image";
import UserBlog from "./pages/UserBlog";
import Posts from "./pages/Posts";




const router = createBrowserRouter([
  {
    element: <CenterLayout />,
    children: [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/email",
        element: <Email />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/demo",
        element: <Demo />,
      },
    ],
  },
  {
    element: <BlogLayout />,
    children: [
      {
        path: "/home",
        element: <Blog />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/posts/:userName",
        element: (
          <UserBlog />
        ),
      },

    ]
  },
  {
    path: "/:userName",
    element: (
      <Posts />
    ),
  },
  {
    path: "/test",
    element: <Dashboard />,
  },
  {
    path: "/image",
    element: <ImageUpload />,
  },

]);

const App = () => {

  const id = import.meta.env.VITE_GOOGLE_ID as string

  return (
    <>
      <GoogleOAuthProvider clientId={id}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
