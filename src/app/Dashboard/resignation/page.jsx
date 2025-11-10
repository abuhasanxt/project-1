"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function TerminateRequest() {
  const [formData, setFormData] = useState({
    lastWorkingDay: "",
    terminationType: "",
    reason: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { lastWorkingDay, terminationType, reason, notes } = formData;

    // ✅ validation
    if (!lastWorkingDay || !terminationType || !reason || !notes) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/terminate-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "✅ Request submitted successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        // reset form
        setFormData({
          lastWorkingDay: "",
          terminationType: "",
          reason: "",
          notes: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "❌ Failed to submit request",
          text: data.message || "Please try again",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "❌ API Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow">
      {/* Header */}
      <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-600 mb-6">
        <span>📄</span> Terminate Contractual Relationship Request
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Last Working Day */}
          <div>
            <label className="block mb-1 font-medium">Last working day *</label>
            <input
              type="date"
              name="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Termination Type */}
          <div>
            <label className="block mb-1 font-medium">Termination Type *</label>
            <select
              name="terminationType"
              value={formData.terminationType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose Termination Type</option>
              <option>Voluntary</option>
              <option>Involuntary</option>
              <option>End of Contract</option>
            </select>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block mb-1 font-medium">Reason *</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-1 font-medium">Notes *</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "➕ Submit"}
          </button>

          <button
            type="button"
            onClick={() =>
              setFormData({
                lastWorkingDay: "",
                terminationType: "",
                reason: "",
                notes: "",
              })
            }
            className="px-5 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 flex items-center gap-2"
          >
            🚫 Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
