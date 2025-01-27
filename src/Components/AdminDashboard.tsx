import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { calculateAttendance } from "../utils/CalculateAttendance";
import EditEmployeeForm from "./EditEmployee";
import DeleteDialog from "./DeleteDialog";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Employee";
  position: string;
  salary: number;
  attendance: Attendance[];
}

interface Attendance {
  date: string;
  status: "Present" | "Absent" | "Leave";
}

const AdminDashboard = () => {
  const ServerUrl = import.meta.env.VITE_ServerUrl;
  console.log(ServerUrl);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleete, setDeleete] = useState<number>(0);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${ServerUrl}/CRUD/`);
        setEmployees(response.data.Employees);
      } catch (err) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const logout = async () => {
    await axios.get(`${ServerUrl}/auth/logout`);
    localStorage.removeItem("role");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const handleAddEmployee = () => {
    window.location.href = "/add-employee";
  };

  const handleViewEmployee = (id: number) => {
    window.location.href = `/employee/${id}`;
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    // window.location.href = `/edit-employee/${employee.id}`;
  };

  const handleUpdate = async (updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    setSelectedEmployee(null);

    const response = await axios
      .post(
        `${ServerUrl}/CRUD/Employee/Update/${updatedEmployee.id}`,
        updatedEmployee
      )
      .then((res) => res)
      .catch((err) => err);

    console.log(response);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 px-6 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleAddEmployee}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Add Employee
          </button>
          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Employee List</h2>
        </section>

        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-4">{error}</div>
        ) : (
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Salary</th>
                  <th className="py-2 px-4 border-b">Attendance</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="text-center hover:bg-gray-700"
                  >
                    <td className="py-2 px-4 border-b">{employee.id}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleViewEmployee(employee.id)}
                        className="text-blue-400 underline"
                      >
                        {employee.name}
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {employee.position}
                      {employee.role === "Admin" && `(${employee.role})`}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${(employee.salary * 12).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {calculateAttendance(employee.attendance)}%
                    </td>
                    <td className="py-12 px-4 border-b flex h-full justify-between">
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => setDeleete(employee.id)}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {selectedEmployee && (
        <EditEmployeeForm
          employee={selectedEmployee}
          onSubmit={handleUpdate}
          onCancel={() => setSelectedEmployee(null)}
        />
      )}
      {deleete > 0 && <DeleteDialog id={deleete} />}
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Employee Management System
      </footer>
    </div>
  );
};

export default AdminDashboard;
