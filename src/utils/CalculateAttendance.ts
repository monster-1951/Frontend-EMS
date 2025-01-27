type Attendance = {
  date: string;
  status: "Present" | "Absent" | "Leave";
};

export const calculateAttendance = (attendanceRecords: Attendance[]) => {
  if (attendanceRecords.length) {
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(
      (record) => record.status === "Present"
    ).length;
    return ((presentDays / totalDays) * 100)?.toFixed(2) || 0;
  } else {
    return 0;
  }
};
