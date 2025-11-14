"use client"

import { useState } from "react"

export default function ViolationOfCompanyRulesPage() {
  const violationData = [
    {
      id: 1,
      date: "8 Sep, 2025",
      violation: "Failure to issue an electronic invoice",
      occurrences: 1,
      actionTaken: "Deduction 50% From pay day",
    },
    {
      id: 2,
      date: "25 Apr, 2025",
      violation: "Absence without written permission or an acceptable excuse from two to six days within contractual year",
      occurrences: 2,
      actionTaken: "Deduction 300% From pay day",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Violation of Company Rules</h1>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-6 py-4">
              <div className="font-semibold text-gray-900 text-sm">Date</div>
              <div className="font-semibold text-gray-900 text-sm">Violation</div>
              <div className="font-semibold text-gray-900 text-sm">Occurrences</div>
              <div className="font-semibold text-gray-900 text-sm">Action Taken</div>
              <div className="font-semibold text-gray-900 text-sm">Actions</div>
            </div>
          </div>

          {/* Table Rows */}
          <div>
            {violationData.map((violation) => (
              <div key={violation.id} className="border-b border-gray-200 hover:bg-gray-50 transition last:border-b-0">
                <div className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
                  {/* Date */}
                  <div>
                    <p className="text-sm text-gray-700">{violation.date}</p>
                  </div>

                  {/* Violation */}
                  <div>
                    <p className="text-sm text-gray-700">{violation.violation}</p>
                  </div>

                  {/* Occurrences */}
                  <div>
                    <p className="text-sm text-gray-700 text-center">{violation.occurrences}</p>
                  </div>

                  {/* Action Taken */}
                  <div>
                    <p className="text-sm text-gray-700">{violation.actionTaken}</p>
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
          <p className="text-sm text-blue-600 font-medium">Total: {violationData.length}</p>
        </div>
      </div>
    </main>
  )
}
