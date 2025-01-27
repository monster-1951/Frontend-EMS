import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import EmployeeDetails from "./ViewEmployee";


const DashBoard = () => {
  const role = useSelector((state: any) => state.role.value);
  console.log(role, "From dashboard");
  const currentId = localStorage.getItem('id')
  if (role === "Admin") {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <AdminDashboard />
      </div>
    );
  } else if (role === "Employee") {
    window.location.href = `/employee/${currentId}`
    return (
      <>
     <EmployeeDetails idd=""/>
     </>
    );
  } else {
    window.location.href = '/login'
    // return (
    //   <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
    //     <h1 className="text-3xl font-semibold">Access Denied</h1>
    //   </div>
    // );
  }
};

export default DashBoard;
