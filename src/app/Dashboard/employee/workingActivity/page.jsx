"use client";
import { useState } from "react";

export default function WorkingActivity() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6">
      {/* ---- Top Search Bar ---- */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="border px-4 py-2 flex items-center gap-2 rounded text-gray-600 hover:bg-gray-100"
        >
          🔍 Search
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
          ➕ Add
        </button>
      </div>

      {/* ---- Title ---- */}
      <h2 className="mt-6 mb-3 flex items-center gap-2 text-lg font-semibold">
        👤 Working Activity
      </h2>

      {/* ---- No Data Warning ---- */}
      <div className="border border-blue-300 p-6 rounded text-blue-500 flex items-center gap-3 justify-center">
        ⚠️ لم يتم العثور على سجلات
      </div>

      {/* --------------------------------------------- */}
      {/* ----------- RIGHT SIDEBAR (Search Drawer) --- */}
      {/* --------------------------------------------- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="absolute right-0 top-0 w-80 h-full bg-white shadow-lg p-5 overflow-auto animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Search Filter</h3>

            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Enter request number"
            />

            <label className="text-sm font-medium">Const center</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Choose Const Center"
            />

            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Apply Filter
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------- */}
      {/* ---------------- CENTER MODAL --------------- */}
      {/* --------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">Add </h3>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 gap-3">
              <label>Date *</label>
              <input type="date" className="border px-3 py-2 rounded" />
              <label>From *</label>
              <input
                type="time"
                className="border px-3 py-2 rounded"
                placeholder="Time"
              />
              <label>To *</label>
              <input
                type="time"
                className="border px-3 py-2 rounded"
                placeholder="Exam Time"
              />

              <input
                type="text"
                className="border px-3 py-2 rounded"
                placeholder="Const Center"
              />

              <textarea
                className="border px-3 py-2 rounded"
                placeholder="Notes"
                rows={3}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Animations ---- */}
      <style>{`
        .animate-slideLeft {
          animation: slideLeft .3s ease forwards;
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .animate-fadeIn {
          animation: fadeIn .3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
