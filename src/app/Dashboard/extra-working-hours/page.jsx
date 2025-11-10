"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function OvertimeRequest() {
  const [step, setStep] = useState(1);
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Number of working hours in excess of the specified time ",
    },
    {
      id: 2,
      title: "Attach a copy of the overtime invoice",
    },
    {
      id: 3,
      title: "Review Information",
    },
  ];

  // --- Validation for Next Step ---
  const handleNext = () => {
    if (step === 1) {
      if (!hours || Number(hours) <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Please enter valid hours!",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
      if (!date) {
        Swal.fire({
          icon: "warning",
          title: "Please select a date!",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
    }

    if (step === 2 && !invoice) {
      Swal.fire({
        icon: "warning",
        title: "Please attach an invoice file!",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("hours", hours);
      formData.append("date", date);
      formData.append("invoice", invoice);

      const res = await fetch("http://localhost:5000/api/overtime", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "✅ Request submitted successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form
        setStep(1);
        setHours("");
        setDate("");
        setInvoice(null);
      } else {
        const data = await res.json();
        Swal.fire({
          icon: "error",
          title: "Submission failed",
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
  };

  // --- Step-specific UI ---
  const renderStep = () => {
    if (step === 1) {
      return (
        <>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Working Hours *
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Enter hours"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Overtime Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div>
            <input
              type="file"
              accept=".jpg,.png,.pdf"
              onChange={(e) => setInvoice(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {invoice && (
              <p className="mt-2 text-sm text-green-600">
                ✅ {invoice.name} selected
              </p>
            )}
          </div>
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Working Hours:</strong> {hours} hrs
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Invoice:</strong>{" "}
              {invoice ? invoice.name : "No file attached"}
            </p>
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4">
      <div className="w-full  bg-white shadow-xl rounded-2xl p-8">
        {/* --- Step Header --- */}
        <div className="mb-8 flex items-center justify-between">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center mb-3">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-white mr-3
                ${
                  step === s.id
                    ? "bg-blue-600"
                    : step > s.id
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              >
                {s.id}
              </div>
              <p
                className={`text-sm md:text-base ${
                  step === s.id
                    ? "text-blue-600 font-semibold"
                    : step > s.id
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {s.title}
              </p>
            </div>
          ))}
        </div>

        {/* --- Step Content --- */}
        <form onSubmit={handleSubmit}>{renderStep()}</form>

        {/* --- Buttons --- */}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              ◂ Previous
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next ▸
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`ml-auto px-6 py-3 rounded-lg text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
