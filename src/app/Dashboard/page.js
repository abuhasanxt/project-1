"use client";

import Link from "next/link";
import {
  FileText,
  Clock,
  Briefcase,
  Calendar,
  Fingerprint,
  Users,
  LogOut,
  MessageSquare,
} from "lucide-react";

export default function DashboardPage() {
  const requests = [
    {
      title: "Request to deposit bonus bills",
      icon: <FileText size={30} />,
      path: "/Dashboard/request/bonus-bills",
    },
    {
      title: "Leave Requests",
      icon: <Clock size={30} />,
      path: "/Dashboard/request/leave-requests",
    },
    {
      title: "Request extra working hours",
      icon: <Briefcase size={30} />,
      path: "/Dashboard/request/extra-working-hours",
    },
    {
      title: "Request to change a rest day",
      icon: <Calendar size={30} />,
      path: "/Dashboard/request/change-rest-day",
    },
    {
      title: "Missing Punch Request",
      icon: <Fingerprint size={30} />,
      path: "/Dashboard/request/missing-punch",
    },
    {
      title: "Change Work Shift Request",
      icon: <Users size={30} />,
      path: "/Dashboard/request/change-shift-request",
    },
    {
      title: "Request Out of Office",
      icon: <Clock size={30} />,
      path: "/Dashboard/request/out-of-office",
    },
    {
      title: "Resignation Request",
      icon: <LogOut size={30} />,
      path: "/Dashboard/request/resignation",
    },
    {
      title: "Request Grievance",
      icon: <MessageSquare size={30} />,
      path: "/Dashboard/request/grievance",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center items-center p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        {requests.map((req, index) => (
          <Link
            key={index}
            href={req.path}
            className="flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg rounded-xl p-6 border border-gray-200 transition-transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="text-blue-600 mb-3">{req.icon}</div>
            <p className="text-center text-gray-700 font-medium">{req.title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
