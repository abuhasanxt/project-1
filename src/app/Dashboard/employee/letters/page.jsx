"use client";

import { useEffect, useState } from "react";

export default function LettersPage() {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===========================
  // Fetch Data From Backend API
  // ===========================
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const res = await fetch("/api/letters");

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();

        // API থেকে ডেটা না এলে fallback sample data
        if (Array.isArray(data) && data.length > 0) {
          setLetters(data);
        } else {
          setLetters(sampleLetters); // fallback data
        }
      } catch (error) {
        console.log("API Error:", error);
        setLetters(sampleLetters); // fallback
      }

      setLoading(false);
    };

    fetchLetters();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-6">
      {/* ========== HEADER ========== */}
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
        <span className="text-blue-600 text-xl">👤</span>
        <h1 className="text-xl font-semibold text-gray-800">Letters</h1>
      </div>

      {/* ========== TABLE WRAPPER ========== */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full">
          {/* ========== TABLE HEAD ========== */}
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Letter No</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Employee</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Letter Type</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          {/* ========== TABLE BODY ========== */}
          <tbody>
            {letters.map((item) => (
              <tr key={item.letterNo} className="border-b hover:bg-gray-50 transition">
                {/* Letter No */}
                <td className="py-4 px-4 text-sm text-gray-700">{item.letterNo}</td>

                {/* Employee */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-700">
                      {item.employeeShort}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.employeeName}</p>
                      <p className="text-xs text-gray-500">{item.employeeId}</p>
                    </div>
                  </div>
                </td>

                {/* Letter Type */}
                <td className="py-4 px-4 text-sm text-gray-700">{item.letterType}</td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
                      🖨 Print
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 flex items-center gap-2">
                      ⬇ Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========== FOOTER ========== */}
      <div className="mt-4 text-right text-sm text-blue-600 font-medium">
        Total: {letters.length}
      </div>
    </main>
  );
}

// ===========================
// Fallback Sample Data
// ===========================
const sampleLetters = [
  {
    letterNo: "0006333",
    employeeName: "Fatima Abdullah Al-Mutair Abdullah Al-Mutair",
    employeeShort: "FA",
    employeeId: "00020",
    letterType: "Google Maps Employee Reward Policy",
  },
  {
    letterNo: "0005350",
    employeeName: "Fatima Abdullah Al-Mutair Abdullah Al-Mutair",
    employeeShort: "FA",
    employeeId: "00020",
    letterType: "Internal circular",
  },
  {
    letterNo: "0006331",
    employeeName: "Fatima Abdullah Al-Mutair Abdullah Al-Mutair",
    employeeShort: "FA",
    employeeId: "00020",
    letterType: "Google Maps Employee Reward Policy",
  },
  {
    letterNo: "0005704",
    employeeName: "Fatima Abdullah Al-Mutair Abdullah Al-Mutair",
    employeeShort: "FA",
    employeeId: "00020",
    letterType: "Upgrade health insurance category",
  },
  {
    letterNo: "0005703",
    employeeName: "Fatima Abdullah Al-Mutair Abdullah Al-Mutair",
    employeeShort: "FA",
    employeeId: "00020",
    letterType: "Internal circular",
  },
  {
    letterNo: "0005740",
    employeeName: "Fatima Abdullah Al-Mutair Abdullah Al-Mutair",
    employeeShort: "FA",
    employeeId: "00020",
    letterType: "Letter to the Cooperative Insurance Company",
  },
];
