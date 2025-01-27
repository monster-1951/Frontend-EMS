import "./index.css"; // Adjust the path to your CSS file
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import DashBoard from "./Components/DashBoard";
import ViewEmployee from "./Components/ViewEmployee";
import axios from "axios";
import CreateEmployeeForm from "./Components/CreateEmployee";
// import EdititngDashBoard from "./Components/Editt";

function App() {
  axios.defaults.withCredentials = true;
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <>
          <DashBoard />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <LoginForm />
        </>
      ),
    },
    {
      path: "/add-employee",
      element: (
        <>
          <CreateEmployeeForm
            onSuccess={() => {
              window.location.href = "/dashboard";
            }}
          />
        </>
      ),
    },
    {
      path: `/employee/:id`,
      element: (
        <>
          <ViewEmployee />
        </>
      ),
    },
    {
      path: `/edit-employee/:id`,
      element: <>
      <DashBoard />
      </>,
    },
    {
      path: "/",
      element: <><DashBoard /></>,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
