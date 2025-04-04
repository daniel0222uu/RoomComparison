// src/components/Room.tsx
import { useState, useEffect } from "react";
import { calculateQ, calculateC } from "../utils/calculations";

interface RoomProps {
  roomNumber: number;
  color: string;
  accentColor: string;
  bgColor: string;
  onChange: (q: number, qs: number, n: number) => void;
  step?: number;
}

export default function Room({
  roomNumber,
  color,
  accentColor,
  bgColor,
  onChange,
  step = 0.1
}: RoomProps) {
  const [area, setArea] = useState(100);
  const [height, setHeight] = useState(2.5);
  const [airChanges, setAirChanges] = useState(3);
  const [q, setQ] = useState(0);
  const [n, setN] = useState(4);
  const [qs, setQs] = useState(4);
  const [c, setC] = useState("");

  // Update Q value
  useEffect(() => {
    const newQ = calculateQ(area, height, airChanges);
    setQ(newQ);
    onChange(newQ, qs, n);
  }, [area, height, airChanges, qs, n, onChange]);

  // Update C value
  useEffect(() => {
    setC(calculateC(q, qs, n));
  }, [q, qs, n]);

  // Update parent when qs or n changes
  useEffect(() => {
    onChange(q, qs, n);
  }, [qs, n, q, onChange]);

  return (
    <div className={`p-4 border rounded-lg shadow-md ${bgColor}`}>
      <h2 className={`text-xl font-semibold mb-4 ${color}`}>Rum {roomNumber}</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Golvyta (m²)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Rumshöjd (m)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded text-gray-900"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Luftväxlingar per timme: {airChanges}
        </label>
        <input
          type="range"
          min="1"
          max="50"
          step={step}
          value={airChanges}
          onChange={(e) => setAirChanges(parseFloat(e.target.value))}
          className={`w-full ${accentColor}`}
          style={{ accentColor: accentColor.includes("blue") ? "#2563eb" : accentColor.includes("green") ? "#16a34a" : "#f97316" }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Luftflöde (Q) [m³/s]</label>
        <input
          type="number"
          value={q.toFixed(4)}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 text-gray-900"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Antal personer (n): {n}
        </label>
        <input
          type="range"
          min="1"
          max="8"
          step="1"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className={`w-full ${accentColor}`}
          style={{ accentColor: accentColor.includes("blue") ? "#2563eb" : accentColor.includes("green") ? "#16a34a" : "#f97316" }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Källstyrka per person (q_s) [cfu/s]: {qs}
        </label>
        <input
          type="range"
          min="1"
          max="40"
          step="1"
          value={qs}
          onChange={(e) => setQs(parseInt(e.target.value))}
          className={`w-full ${accentColor}`}
          style={{ accentColor: accentColor.includes("blue") ? "#2563eb" : accentColor.includes("green") ? "#16a34a" : "#f97316" }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Koncentration (C)</label>
        <input
          type="text"
          value={c}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 text-gray-900"
        />
      </div>
    </div>
  );
}