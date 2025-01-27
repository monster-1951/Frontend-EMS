import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { calculateAttendance } from "../utils/CalculateAttendance";
import EditEmployeeForm from "./EditEmployee";
import { CalculateSalary } from "../utils/CalculateSalary.ts";
type Attendance = {
  date: string;
  status: "Present" | "Absent" | "Leave";
};

type Employee = {
  id: number;
  name: string;
  role: "Admin" | "Employee";
  salary: number;
  attendance: Attendance[];
  email: string;
};

interface EmployeeDetailsParams {
  idd?: string;
}

const EmployeeDetails = ({ idd }: EmployeeDetailsParams) => {
  const ServerUrl = import.meta.env.VITE_ServerUrl
  const Role = useSelector((state: any) => state.role.value);
  const { id } = useParams<{ id: string }>(); // Assuming the route is set up with ":id"
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleUpdate = async (updatedEmployee: Employee) => {
    setEmployee(updatedEmployee);
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

  const logout = async () => {
    await axios.get(`${ServerUrl}/auth/logout`);
    localStorage.removeItem("role");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `${ServerUrl}/CRUD/Employee/${id || idd}`
        );
        console.log(response.data.EmployeeToFind[0]);
        setEmployee(response.data.EmployeeToFind[0]);
      } catch (err) {
        setError("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeDetails();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="flex justify-between bg-gray-800 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <div className="flex gap-4">
          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-4">{error}</div>
        ) : employee ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 ">{employee.name}</h1>
            <div className="flex justify-between">
              <div>
                <p className="mb-2">
                  <strong>ID:</strong> {employee.id}
                </p>
                <p className="mb-2">
                  <strong>Role:</strong> {employee.role}
                </p>
                <p className="mb-2">
                  <strong>Package:</strong> ${(employee.salary*12).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Email:</strong> {employee.email}
                </p>
                <p className="mb-4">
                  <strong>Attendance:</strong>{" "}
                  {calculateAttendance(employee.attendance)}%
                </p>
                <p className="mb-4">
                  <strong>Salary for next month:</strong>{" "}
                  ${CalculateSalary(employee.salary, employee.attendance)}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-2">Attendance Records:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 border border-gray-600">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employee.attendance.map((record, index) => (
                    <tr key={index} className="text-center hover:bg-gray-600">
                      <td className="py-2 px-4 border-b">{record.date}</td>
                      <td className="py-2 px-4 border-b">{record.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between">
              {Role == "Admin" && (
                <>
                  <button
                    onClick={() => navigate(-1)}
                    className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleEdit(employee)}
                    className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  {selectedEmployee && (
                    <EditEmployeeForm
                      employee={selectedEmployee}
                      onSubmit={handleUpdate}
                      onCancel={() => setSelectedEmployee(null)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 mt-4">
            Employee not found.
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Employee Management System
      </footer>
    </div>
  );
};

export default EmployeeDetails;
