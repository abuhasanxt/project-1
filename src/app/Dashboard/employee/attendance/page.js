"use client";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
       Attendance
      </h2>

      <div className="flex flex-col gap-4">
        {/* Request Button */}
        <Link
          href="/Dashboard/employee/attendance/CheckInOnline"
          className="block text-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
        Check-In Online
        </Link>

        {/* Employee Button */}
        <Link
          href="/Dashboard/employee/attendance/schedule"
          className="block text-center px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Attendance Schedule
        </Link>
       
      </div>
    </div>
  );
}

