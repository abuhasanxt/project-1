"use client";

import { useState } from "react";
export default function PayslipTable() {
  const payslips = [
    { date: "Oct-2025", type: "General Payroll", salary: "3,610.00", add: "0.00", deduct: "0.00", net: "3,610.00", days: 30 },
    { date: "Jul-2025", type: "General Payroll", salary: "3,610.00", add: "0.00", deduct: "0.00", net: "3,610.00", days: 30 },
    { date: "May-2025", type: "General Payroll", salary: "3,730.33", add: "0.00", deduct: "0.00", net: "3,730.33", days: 31 },
    { date: "Mar-2025", type: "General Payroll", salary: "3,610.00", add: "0.00", deduct: "0.00", net: "3,610.00", days: 30 },
    { date: "Jan-2025", type: "General Payroll", salary: "3,610.00", add: "0.00", deduct: "0.00", net: "3,610.00", days: 30 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Payslips</h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600">Date</th>
              <th className="p-3 text-sm font-medium text-gray-600">Payroll Type</th>
              <th className="p-3 text-sm font-medium text-gray-600">Net Salary</th>
              <th className="p-3 text-sm font-medium text-gray-600">Total Additions</th>
              <th className="p-3 text-sm font-medium text-gray-600">Total Deductions</th>
              <th className="p-3 text-sm font-medium text-gray-600">Net Pay</th>
              <th className="p-3 text-sm font-medium text-gray-600">Total Days</th>
              <th className="p-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payslips.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{row.date}</td>
                <td className="p-3 text-sm text-gray-700">{row.type}</td>
                <td className="p-3 text-sm text-gray-700">{row.salary}</td>
                <td className="p-3 text-sm text-green-600">{row.add}</td>
                <td className="p-3 text-sm text-red-500">{row.deduct}</td>
                <td className="p-3 text-sm text-blue-600">{row.net}</td>
                <td className="p-3 text-sm text-gray-700">{row.days}</td>
                <td className="p-3 flex gap-2">
                  <button className="px-3 py-1 rounded border border-blue-500 text-blue-600 text-sm">Details</button>
                  <button className="px-3 py-1 rounded border border-blue-500 text-blue-600 text-sm">Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-3 text-sm text-gray-600 border-t">Total: {payslips.length}</div>
      </div>
    </div>
  );
}
