import { calculateAttendance } from "./CalculateAttendance";
type Attendance = {
  date: string;
  status: "Present" | "Absent" | "Leave";
};
export const CalculateSalary = (
  ActualSalary: number,
  Attendance: Attendance[]
) => {
  const AttendancePercentage = Number(calculateAttendance(Attendance))
  const Salary = (AttendancePercentage*ActualSalary)/100
  return Salary
};
