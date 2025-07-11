import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./components/RootLayout";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Auth/login";
import SignUp from "./components/Auth/signup";
import AfterLoginPage from "./components/Dashboard/afterLoginPage";

function App() {

  const Router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
        />
      ),
      children: [
        {
          path: "/",
          element: (
            <HomePage/>
          ),
        },
        {
          path: "/login",
          element: (
            <Login/>
          ),
        },
        {
          path: "/signup",
          element: (
            <SignUp/>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <AfterLoginPage/>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={Router} />;
}

export default App;
