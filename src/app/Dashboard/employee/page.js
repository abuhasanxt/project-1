"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Clock } from "lucide-react";

export default function EmployeePage() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Attendance", path: "/Dashboard/employee/attendance" },
    { name: "Requests", path: "/Dashboard/employee/request" },
    { name: "Leaves", path: "/Dashboard/employee/leaves" },
    { name: "Leaves Balance", path: "/Dashboard/employee/balances" },
    { name: "Notices / Warning", path: "/Dashboard/employee/notices" },
    { name: "Decisions", path: "/Dashboard/employee/decisions" },
    { name: "Violation of Company Rules", path: "/Dashboard/employee/rules" },
    { name: "Evaluation Forms", path: "/Dashboard/employee/evaluation" },
    { name: "Memos", path: "/Dashboard/employee/memos" },
    { name: "Loans / Receivables", path: "/Dashboard/employee/receivables" },
    { name: "Survey Responses", path: "/Dashboard/employee/surveyResponses" },
    { name: "Working Activity", path: "/Dashboard/employee/workingActivity" },
    { name: "Letters", path: "/Dashboard/employee/letters" },
    { name: "My Custody", path: "/Dashboard/employee/myCustody" },
    { name: "Payslips", path: "/Dashboard/employee/payslips" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 text-gray-600 font-semibold text-lg">
          <Clock size={20} />
          <span>Employee Menu</span>
        </div>

        {/* Menu List */}
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FileText size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content Placeholder */}
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold text-blue-600">
          Select an item from the sidebar
        </h2>
      </main>
    </div>
  );
}
