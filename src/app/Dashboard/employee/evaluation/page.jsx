"use client";
import { useState } from "react";

export default function EvaluationSearch() {
  const [status, setStatus] = useState("");
  const [period, setPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setResults(null);

    const res = await fetch("/api/evaluation-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, period }),
    });

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  const clearSearch = () => {
    setStatus("");
    setPeriod("");
    setResults(null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* SEARCH CARD */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2 mb-6">
          <span>🔍</span> Search
        </h2>

        <div className="space-y-6">
          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            >
              <option value="">Choose Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Evaluation Period */}
          <div>
            <label className="block font-medium mb-1">Evaluation Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            >
              <option value="">Choose Evaluation Period</option>
              <option value="2024-Q1">2024 Q1</option>
              <option value="2024-Q2">2024 Q2</option>
              <option value="2024-Q3">2024 Q3</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSearch}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              🔍 Search
            </button>

            <button
              onClick={clearSearch}
              className="px-5 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
            >
              🧹 Clear Search
            </button>
          </div>
        </div>
      </div>

      {/* RESULTS CARD */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-lg font-semibold text-blue-600 flex items-center gap-2 mb-6">
          <span>📄</span> Evaluation Forms
        </h2>

        {loading && <div className="text-center text-gray-600">Loading...</div>}

        {!loading && results === null && (
          <div className="border rounded-xl p-6 text-gray-500 text-center">
            Start a search to see results
          </div>
        )}

        {!loading && results && results.data.length === 0 && (
          <div className="border rounded-xl p-6 text-center text-blue-600 flex items-center justify-center gap-3">
            ⚠️ لم يتم العثور على سجلات
          </div>
        )}

        {!loading && results && results.data.length > 0 && (
          <div className="border rounded-xl p-6 space-y-4">
            {results.data.map((item, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Period:</strong> {item.period}
                </p>
                <p>
                  <strong>Score:</strong> {item.score}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
