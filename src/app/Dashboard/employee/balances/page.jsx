"use client"

import { useState } from "react"

export default function LeaveBalancesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const leaveData = [
    {
      id: 1,
      employee: {
        name: "Fatima Abdullah Al-Mutairi Abdullah Al-Mutair",
        id: "00020",
        avatar: "FA",
      },
      joinedDate: "30 Apr, 2025",
      leaveType: "Sick Leave",
      year: 2025,
      balanceCarriedForward: 0,
      taken: 0,
      pending: 0,
      balance: 0,
    },
    {
      id: 2,
      employee: {
        name: "Fatima Abdullah Al-Mutairi Abdullah Al-Mutair",
        id: "00020",
        avatar: "FA",
      },
      joinedDate: "30 Apr, 2025",
      leaveType: "Annual leave",
      year: 2025,
      balanceCarriedForward: 21.0574,
      taken: 0,
      pending: 0,
      balance: 53.4492,
    },
  ]

  const filteredLeaves = leaveData.filter(
    (leave) =>
      leave.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employee.id.includes(searchTerm) ||
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Leave Balances</h1>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-9 gap-4 px-6 py-4">
              <div className="font-semibold text-gray-900 text-sm">Employee</div>
              <div className="font-semibold text-gray-900 text-sm">Joined Date</div>
              <div className="font-semibold text-gray-900 text-sm">Leave Type</div>
              <div className="font-semibold text-gray-900 text-sm">Year</div>
              <div className="font-semibold text-gray-900 text-sm">Balance Carried Forward</div>
              <div className="font-semibold text-gray-900 text-sm">Taken</div>
              <div className="font-semibold text-gray-900 text-sm">Pending</div>
              <div className="font-semibold text-gray-900 text-sm">Balance</div>
              <div className="font-semibold text-gray-900 text-sm">Actions</div>
            </div>
          </div>

          {/* Table Rows */}
          <div>
            {filteredLeaves.map((leave) => (
              <div key={leave.id} className="border-b border-gray-200 hover:bg-gray-50 transition last:border-b-0">
                <div className="grid grid-cols-9 gap-4 px-6 py-4 items-center">
                  {/* Employee */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">
                      {leave.employee.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{leave.employee.name}</p>
                      <p className="text-xs text-gray-500">{leave.employee.id}</p>
                    </div>
                  </div>

                  {/* Joined Date */}
                  <div>
                    <p className="text-sm text-gray-700">{leave.joinedDate}</p>
                  </div>

                  {/* Leave Type */}
                  <div>
                    <p className="text-sm text-gray-700">{leave.leaveType}</p>
                  </div>

                  {/* Year */}
                  <div>
                    <p className="text-sm text-gray-700">{leave.year}</p>
                  </div>

                  {/* Balance Carried Forward */}
                  <div>
                    <p className="text-sm text-gray-700">{leave.balanceCarriedForward}</p>
                  </div>

                  {/* Taken */}
                  <div>
                    <p className="text-sm text-gray-700">{leave.taken}</p>
                  </div>

                  {/* Pending */}
                  <div>
                    <p className="text-sm text-gray-700">{leave.pending}</p>
                  </div>

                  {/* Balance */}
                  <div>
                    <p className="text-sm text-gray-700">{leave.balance}</p>
                  </div>

                  {/* Actions */}
                  <div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1 transition">
                      ℹ Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <p className="text-sm text-blue-600 font-medium">Total: {filteredLeaves.length}</p>
        </div>
      </div>
    </main>
  )
}
