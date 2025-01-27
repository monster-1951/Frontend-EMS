import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
interface EmployeeFormProps {
  onSuccess: () => void;
}

const CreateEmployeeForm: React.FC<EmployeeFormProps> = ({ onSuccess }) => {
  const ServerUrl = import.meta.env.VITE_ServerUrl
  const [id, setId] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("Employee");
  const [salary, setSalary] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const Role = useSelector((state: any) => state.role.value);
  const currentId = localStorage.getItem('id')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newEmployee = {
      id,
      name,
      email,
      password,
      role,
      salary,
    };

    try {
      await axios.post(`${ServerUrl}/CRUD/Create`, newEmployee);
      setSuccessMessage("Employee created successfully!");
      setError(null);
      onSuccess();
    } catch (err) {
      setError("Failed to create employee. Please try again.");
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
   if (Role=="Employee") {
    window.location.href = `/employee/${currentId}`
   }
  },[])
  
  return (
    <div className="bg-slate-900">
      <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>
        )}
        {successMessage && (
          <div className="bg-green-500 text-white p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium mb-1">
              ID
            </label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              required
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none"
            >
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium mb-1">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              required
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
