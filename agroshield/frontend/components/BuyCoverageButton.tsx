"use client";

import { useState } from "react";
import { buyPolicy } from "@/lib/agroshield";

export default function BuyCoverageButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    try {
      setLoading(true);
      setMessage("Waiting for wallet signature...");

      const result = await buyPolicy({
        premium: 10_0000000,        // 10 XLM
        coverageAmount: 1000_0000000, // 1000 XLM coverage
        rainfallThreshold: 25,
        periodDays: 30,
      });

      setMessage(`Success! Policy created. Hash: ${result.hash}`);
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50"
      >
        {loading ? "Processing..." : "Buy Coverage (10 XLM)"}
      </button>

      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
