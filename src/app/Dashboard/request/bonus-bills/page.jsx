"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function BonusBillsPage() {
  const [step, setStep] = useState(1);
  const [invoice, setInvoice] = useState("");
  const [bonusCount, setBonusCount] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Step 1 → Step 2
  const handleNext = () => {
    if (step === 1 && !invoice.trim()) return;
    if (step === 2 && !bonusCount.trim()) return;
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  // ✅ Submit with API + SweetAlert
  const handleSubmit = async () => {
    if (!invoice.trim() || !bonusCount.trim()) return;

    try {
      setLoading(true);

      const payload = { invoice, bonusCount, createdAt: new Date() };

      const res = await fetch("http://localhost:5000/api/bonus-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "✅ Request Submitted!",
          text: "Your bonus request has been recorded successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
        setStep(1);
        setInvoice("");
        setBonusCount("");
      } else {
        Swal.fire({
          title: "❌ Error",
          text: data.message || "Something went wrong!",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "🚫 API Error",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-3xl border border-gray-200 p-6">
        {/* Step Header */}
        <div className="flex items-center justify-between mb-8">
          {[
            "Request for Billing Bonus",
            "Bonus Number of Bills",
            "Review Information",
          ].map((label, index) => {
            const current = index + 1;
            const isActive = step === current;
            const isCompleted = step > current;

            return (
              <div
                key={label}
                className="flex-1 flex items-center justify-center relative"
              >
                {current !== 1 && (
                  <div
                    className={`absolute -left-1/2 top-1/2 h-[2px] w-full ${
                      isCompleted ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
                <div
                  className={`flex flex-col items-center z-10 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-white ${
                      isCompleted
                        ? "bg-green-500"
                        : isActive
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={18} /> : current}
                  </div>
                  <span className="text-xs font-medium text-center w-24">
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <label className="block text-gray-700 font-medium mb-2">
              Invoices included *
            </label>
            <input
              type="text"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
              >
                NEXT <ChevronRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <label className="block text-gray-700 font-medium mb-2">
              Number of invoices *
            </label>
            <input
              type="number"
              value={bonusCount}
              onChange={(e) => setBonusCount(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition flex items-center gap-2"
              >
                <ChevronLeft size={18} /> PREVIOUS
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
              >
                NEXT <ChevronRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h2 className="text-md font-semibold text-gray-800 mb-6 ">
              <p className="text-md font-semibold t my-6 text-gray-700 border border-white bg-white p-2">
                Request for Billing Bonus for Professional Services (%)
              </p>
            </h2>
            <div>
              <div className="ml-5">
                <h2 className="text-gray-700 border border-white bg-white ">
                  <span className="font-medium text-xl m-1 p-1">
                    1. Invoices included
                  </span>{" "}
                </h2>
                <h2 className="text-gray-700 border border-white bg-white mt-2">
                  <span className="font-medium text-xl m-1 p-1">
                    {invoice || "Not provided"}
                  </span>
                </h2>
              </div>
              <h2 className="text-md font-semibold t my-6 text-gray-700 border border-white bg-white p-2">
                Bonus number of bills
              </h2>
              <div className="ml-5 my-5">
                <h2 className="text-gray-700 border border-white bg-white px-5">
                  <span className="font-medium text-xl">2.Bonus Bills:</span>{" "}
                </h2>
                <p className="text-gray-700 border border-white bg-white mt-2 ">
                  <span className="font-medium text-xl m-1 p-1">
                    {bonusCount || "Not provided"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition flex items-center gap-2"
              >
                <ChevronLeft size={18} /> PREVIOUS
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                } text-white px-8 py-2 rounded-md transition`}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
