
"use client";
import { useState } from "react";

export default function FingerprintRecords() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="p-4 md:p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        {/* SEARCH BUTTON */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="border px-4 py-2 flex items-center gap-2 rounded text-gray-600 hover:bg-gray-100"
        >
          🔍 Search
        </button>

        {/* ADD BUTTON */}
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          ➕ Add
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-auto border rounded-md shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Work Location</th>
              <th className="p-3 text-left">Device Name</th>
              <th className="p-3 text-left">Device Id</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold">
                    CG
                  </div>
                  <div>
                    <div className="font-semibold">CAROL GUZMAN</div>
                    <div className="text-xs text-gray-500">27022</div>
                  </div>
                </td>

                <td className="p-3">Sunday, 16 Nov, 2025</td>

                <td className="p-3">
                  <span className="px-3 py-1 rounded text-xs bg-pink-100 text-pink-600">
                    Check Out
                  </span>
                </td>

                <td className="p-3">12:00:33 AM</td>
                <td className="p-3">---</td>
                <td className="p-3">nov</td>
                <td className="p-3">2899</td>

                <td className="p-3">
                  <button className="border px-3 py-1 rounded text-blue-600 hover:bg-blue-50">
                    ℹ Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================================================== */}
      {/* =============== ADD MODAL (TOP CENTER) =============== */}
      {/* ===================================================== */}
      {isAddOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-5"
          onClick={() => setIsAddOpen(false)}
        >
          <div
            className="bg-white w-11/12 md:w-[550px] lg:w-[950px] p-6 rounded-lg shadow-xl animate-topModal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              Add Record
            </h2>

            <div className="lg:flex  justify-around gap-5">
              <div>
                <label className="text-sm font-medium">Employee</label>
                <input className="border w-full px-3 py-2 rounded mb-3" />

                <label className="text-sm font-medium">Event</label>
                <select className="border w-full px-3 py-2 rounded mb-3">
                  <option>Select Event</option>
                  <option>Check In</option>
                  <option>Check Out</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="border w-full px-3 py-2 rounded mb-3"
                />

                <label className="text-sm font-medium">Time</label>
                <input
                  type="time"
                  className="border w-full px-3 py-2 rounded mb-4"
                />
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => setIsAddOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* ================== SEARCH SIDEBAR ==================== */}
      {/* ===================================================== */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="absolute right-0 top-0 w-80 md:w-96 h-full bg-white p-6 shadow-lg animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Search Filters</h2>

            {/* 1 */}
            <label className="text-sm font-medium">Employee Name / ID</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded mb-3"
            />

            {/* 2 */}
            <label className="text-sm font-medium">From Date</label>
            <input
              type="date"
              className="border w-full px-3 py-2 rounded mb-3"
            />

            {/* 3 */}
            <label className="text-sm font-medium">To Date</label>
            <input
              type="date"
              className="border w-full px-3 py-2 rounded mb-3"
            />

            {/* 4 */}
            <label className="text-sm font-medium">Status</label>
            <select className="border w-full px-3 py-2 rounded mb-3">
              <option>All</option>
              <option>Check In</option>
              <option>Check Out</option>
            </select>

            {/* 5 */}
            <label className="text-sm font-medium">Company Name</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded mb-3"
            />

            {/* 6 */}
            <label className="text-sm font-medium">Department / Section</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded mb-3"
            />

            {/* 7 */}
            <label className="text-sm font-medium">Device ID</label>
            <input
              type="text"
              className="border w-full px-3 py-2 rounded mb-5"
            />

            <div className="flex justify-between mt-3">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        .animate-slideLeft {
          animation: slideLeft .3s ease forwards;
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }

        .animate-topModal {
          animation: topModal .3s ease forwards;
        }
        @keyframes topModal {
          from { transform: translateY(-40px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
