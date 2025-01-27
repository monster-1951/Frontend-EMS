import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetRole } from "../redux/role/roleSlice.ts";

const LoginForm: React.FC = () => {
  const ServerUrl = import.meta.env.VITE_ServerUrl
  const dispatch = useDispatch();
  const Role = useSelector((state: any) => state.role.value);
  console.log(Role);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = { email, password, role };
    console.log("Values", values, "Values");
    await axios
      .post(`${ServerUrl}/auth/login`, values)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          // const role = getUserRoleFromToken(res.data.accessToken)
          console.log("Logged In as :", res.data.data.LoggedInAs);
          dispatch(SetRole(res.data.data.LoggedInAs));
          // console.log(res.data.data.
          //   EmployeeToLogIn.id)
          localStorage.setItem("role", res.data.data.LoggedInAs);
          localStorage.setItem("id", res.data.data.EmployeeToLogIn.id);
      
          console.log(Role);
          if(res.data.data.LoggedInAs=="Admin")
          navigate("/dashboard");
        if(res.data.data.LoggedInAs=="Employee")
          navigate(`/employee/${res.data.data.EmployeeToLogIn.id}`)
        } else {
          setError("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Credentials");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-4 text-red-400 font-bold">
          {error}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
