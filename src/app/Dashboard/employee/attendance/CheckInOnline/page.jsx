"use client";
import { useState, useEffect } from "react";
import { LogIn, XCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function CheckInPage() {
  const [event, setEvent] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event) {
      Swal.fire({
        icon: "warning",
        title: "Please choose an event first!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const payload = { event, time: currentTime };

      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "✅ Check-in successful!",
          text: `You checked in for: ${event}`,
          timer: 2000,
          showConfirmButton: false,
        });
        setEvent("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission failed!",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-5">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-8 border">
        <div className="flex items-center gap-2 text-blue-600 text-lg font-semibold mb-6">
          <LogIn size={20} />
          <span>Check-in Online</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Event *
              </label>
              <select
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Choose Event</option>
                <option value="Check In">Check In</option>
                <option value="Check Out">Check Out</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Time</label>
              <div className="border rounded-lg px-3 py-2 bg-gray-50 text-gray-600">
                {currentTime || "Loading..."}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              <LogIn size={16} />
              Check-in Online
            </button>

            <button
              type="button"
              onClick={() => setEvent("")}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg"
            >
              <XCircle size={16} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
