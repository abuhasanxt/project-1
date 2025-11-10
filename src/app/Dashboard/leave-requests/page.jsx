"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function RequestLeaveForm() {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [numberOfDays, setNumberOfDays] = useState(0);
  const [balance, setBalance] = useState(0);
  const [holidays, setHolidays] = useState(0);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Leave balance info
  const leaveBalances = {
    annual: 15,
    sick: 10,
    casual: 5,
    maternity: 90,
    paternity: 10,
    unpaid: 0,
  };

  // ✅ Calculate total days
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (endDate < startDate) return 0;

    const diffTime = endDate - startDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // ✅ Count weekends (holidays)
  const calculateHolidays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    let count = 0;

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const day = d.getDay();
      if (day === 0 || day === 6) count++;
    }

    return count;
  };

  // ✅ Update automatically
  useEffect(() => {
    const days = calculateDays(formData.startDate, formData.endDate);
    const weekends = calculateHolidays(formData.startDate, formData.endDate);
    setNumberOfDays(days);
    setHolidays(weekends);

    if (formData.leaveType && leaveBalances[formData.leaveType] !== undefined) {
      setBalance(leaveBalances[formData.leaveType]);
    } else {
      setBalance(0);
    }
  }, [formData.startDate, formData.endDate, formData.leaveType]);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear individual error
    if (errors[name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  // ✅ Validation
  const validateForm = () => {
    const newErr = {};
    if (!formData.leaveType) newErr.leaveType = "Please select a leave type.";
    if (!formData.startDate) newErr.startDate = "Please select a start date.";
    if (!formData.endDate) newErr.endDate = "Please select an end date.";
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErr.endDate = "End date must be after start date.";
      }
    }
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formData, numberOfDays, holidays };

    try {
      // 🚀 Example API (you can change this)
      const res = await fetch("http://localhost:5000/api/leave-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // ✅ Success alert
        Swal.fire({
          icon: "success",
          title: "✅ Request submitted successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        setShowSuccess(true);
        setTimeout(() => {
          setFormData({ leaveType: "", startDate: "", endDate: "", notes: "" });
          setNumberOfDays(0);
          setBalance(0);
          setHolidays(0);
          setErrors({});
          setShowSuccess(false);
        }, 2000);
      } else {
        const data = await res.json();
        Swal.fire({
          icon: "error",
          title: "Failed to submit request",
          text: data.message || "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      // ❌ Error alert
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: err.message,
        confirmButtonColor: "#d33",
      });
    }
  };
  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All data will be lost.")) {
      setFormData({ leaveType: "", startDate: "", endDate: "", notes: "" });
      setNumberOfDays(0);
      setBalance(0);
      setHolidays(0);
      setErrors({});
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10 animate-fadeIn">
      {/* ✅ Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md flex items-center gap-3">
          <span className="text-xl">✅</span>
          <span>Leave request submitted successfully!</span>
        </div>
      )}

      <div className="mb-8 pb-6 border-b-2 border-gray-100">
        <h1 className="text-2xl font-semibold text-indigo-600">
          Request Leave
        </h1>
      </div>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="space-y-6">
            {/* Leave Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type <span className="text-red-600">*</span>
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.leaveType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">--- Select ---</option>
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="paternity">Paternity Leave</option>
                <option value="unpaid">Unpaid Leave</option>
              </select>
              {errors.leaveType && (
                <p className="text-red-600 text-sm mt-1">{errors.leaveType}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={today}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startDate && (
                <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || today}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && (
                <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Enter any additional information..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <div className="flex gap-5">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-5xl font-semibold text-gray-800 mb-2">
                  {numberOfDays}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Number of Days
                </div>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-5xl font-semibold text-gray-800 mb-2">
                  {balance}
                </div>
                <div className="text-sm text-gray-600 font-medium">Balance</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>({holidays}) Holiday Leave Days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ Buttons */}
        <div className="mt-10 pt-8 border-t-2 border-gray-100 flex gap-4">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
          >
            <span className="text-lg">＋</span>
            <span>Submit</span>
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-3 bg-white text-red-600 font-semibold border border-gray-300 rounded-md hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all flex items-center gap-2"
          >
            <span className="text-lg">⊗</span>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
}
