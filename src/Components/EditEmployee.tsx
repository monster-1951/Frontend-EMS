import React, { useState } from "react";
import "./style.css";

interface Attendance {
  date: string;
  status: "Present" | "Absent" | "Leave";
}

interface Employee {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Employee";
  salary: number;
  attendance: Attendance[];
}

interface EditEmployeeFormProps {
  employee: Employee;
  onSubmit: (updatedEmployee: Employee) => void;
  onCancel: () => void;
}

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({
  employee,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Employee>({ ...employee });
  const [newAttendance, setNewAttendance] = useState<Attendance>({
    date: "",
    status: "Present",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleAttendanceChange = (
    index: number,
    field: keyof Attendance,
    value: string
  ) => {
    const updatedAttendance = [...formData.attendance];
    updatedAttendance[index] = { ...updatedAttendance[index], [field]: value };
    setFormData((prev) => ({ ...prev, attendance: updatedAttendance }));
  };

  const handleAddAttendance = () => {
    if (!newAttendance.date) {
      setError("Attendance date cannot be empty.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      attendance: [...prev.attendance, newAttendance],
    }));
    setNewAttendance({ date: "", status: "Present" });
    setError(null);
  };

  const handleDeleteAttendance = (index: number) => {
    const updatedAttendance = formData.attendance.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, attendance: updatedAttendance }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      setError("Please fill out all fields.");
      return;
    }

    setError(null);
    onSubmit(formData);
  };

  return (
    <div className="fixed flex justify-center inset-0 bg-gray-700 transition-opacity overflow-scroll">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto my-auto h-fit">
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">ID</label>
            <input
              type="number"
              name="id"
              value={formData.id}
              readOnly
              className="w-full p-2 border rounded bg-gray-700 cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Attendance</label>
            <div className="h-32 overflow-y-scroll inset-shadow-sm inset-shadow-black py-3 px-2 flex flex-col  justify-between">
              {formData.attendance.map((record, index) => (
                <div key={index} className="flex justify-between items-center mb-2  ">
                  <input
                    type="date"
                    value={record.date}
                    onChange={(e) =>
                      handleAttendanceChange(index, "date", e.target.value)
                    }
                    className="p-2 border rounded mr-2"
                  />
                  <select
                    value={record.status}
                    onChange={(e) =>
                      handleAttendanceChange(index, "status", e.target.value)
                    }
                    className="p-2 border rounded mr-2"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDeleteAttendance(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="flex items-center mt-2 justify-between">
                <input
                  type="date"
                  value={newAttendance.date}
                  onChange={(e) =>
                    setNewAttendance((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="p-2 border rounded mr-2"
                />
                <select
                  value={newAttendance.status}
                  onChange={(e) =>
                    setNewAttendance((prev) => ({
                      ...prev,
                      status: e.target.value as Attendance["status"],
                    }))
                  }
                  className="p-2 border rounded mr-2 bg-gray-700 focus:outline-none"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddAttendance}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
