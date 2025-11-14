"use client";

import { useState } from "react";

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({
    rn: "",
    type: "",
    status: "",
  });

  const requests = [
    {
      id: 1,
      employee: {
        name: "Fatima Abdullah Al-Mutairi Abdullah Al-Mutair",
        id: "00020",
        avatar: "FA",
      },
      rn: "0849821",
      requestDate: "15 Sep, 2025",
      requestTime: "04:29 PM",
      requestType: "Request to deposit bonus bills",
      invoices: "5",
      invoicesIncluded: "10",
      status: "Rejected",
      stage: "Rejected",
    },
  ];

  // Filtering logic
  const filteredRequests = requests.filter((req) => {
    return (
      (filters.rn === "" || req.rn.includes(filters.rn)) &&
      (filters.type === "" ||
        req.requestType.toLowerCase().includes(filters.type.toLowerCase())) &&
      (filters.status === "" ||
        req.status.toLowerCase().includes(filters.status.toLowerCase()))
    );
  });

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Decisions</h1>
            <p className="text-sm text-gray-500 mt-1"> All decisions related to you</p>
          </div>

          <button
            onClick={() => setShowSidebar(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <span>🔍</span>
            Search
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-7 gap-4 px-6 py-4">
              <div className="font-semibold text-gray-900 text-sm">
                Employee
              </div>
              <div className="font-semibold text-gray-900 text-sm">
                Decision No.
              </div>
              <div className="font-semibold text-gray-900 text-sm"> Date</div>
              <div className="font-semibold text-gray-900 text-sm">
                Decision Type
              </div>
              <div className="font-semibold text-gray-900 text-sm">Status</div>
              <div className="font-semibold text-gray-900 text-sm">Stage</div>
              <div className="font-semibold text-gray-900 text-sm">Actions</div>
            </div>
          </div>

          {/* Table Rows */}
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition last:border-b-0"
            >
              <div className="grid grid-cols-7 gap-4 px-6 py-4 items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">
                    {req.employee.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {req.employee.name}
                    </p>
                    <p className="text-xs text-gray-500">{req.employee.id}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{req.rn}</p>
                <div>
                  <p className="text-sm text-gray-700">{req.requestDate}</p>
                  <p className="text-xs text-gray-500">
                    Time: {req.requestTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {req.requestType}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Number of invoices: {req.invoices}
                  </p>
                  <p className="text-xs text-gray-500">
                    Invoices included: {req.invoicesIncluded}
                  </p>
                </div>
                <span className="inline-block px-3 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-medium">
                  {req.status}
                </span>
                <p className="text-sm text-gray-700">{req.stage}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1 transition">
                  📋 Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <p className="text-sm text-blue-600 font-medium">
            Total: {filteredRequests.length}
          </p>
        </div>
      </div>

      {/* Sidebar Drawer */}
      {showSidebar && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowSidebar(false)}
          ></div>

          {/* Sidebar Panel */}
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            {/* Header Buttons */}
            <div className="flex items-center justify-between p-4 border-b">
             <h2></h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 px-6 pt-4 pb-2 border-b">
              <button
                onClick={() => setShowSidebar(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSidebar(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Apply Search
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-5">
              {/* Request Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Decision No.
                </label>
                <input
                  type="text"
                  placeholder="Enter request number"
                  value={filters.rn}
                  onChange={(e) =>
                    setFilters({ ...filters, rn: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Request Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 Employee Name / ID
                </label>
                <input
                  type="number"
                  placeholder="Choose Employee Name /ID"
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 Decision Type
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
