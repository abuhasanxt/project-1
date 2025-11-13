"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function MissingPunchRequest() {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("00:00");
  const [time, setTime] = useState("00:00");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEvent("");
    setDate("");
    setTime("");
    setNotes("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/missing-punch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, date, time, notes }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "✅ Request submitted successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        resetForm();
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission failed!",
          text: data?.message || "Something went wrong!",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-5">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-blue-600 text-xl">
            <FaArrowRightFromBracket />
          </span>
          <h1 className="text-xl font-semibold text-blue-600">
            Request Out of Office
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Event */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Date *</label>
            <input
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              value={event}
              type="date"
              onChange={(e) => setEvent(e.target.value)}
            ></input>
          </div>

          {/*  time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* from time */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700">From *</label>
              <input
                type="time"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/*to Time */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700">To *</label>
              <input
                type="time"
                value={time}
                required
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Notes *</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              rows={5}
              placeholder="Write your reason for missing punch..."
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white flex items-center gap-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <span>➕</span>
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
            >
              <span>🚫</span> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
