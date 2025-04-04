// src/components/Summary.tsx
  import { calculateCValue } from "../utils/calculations";

  interface SummaryProps {
    q1: number;
    q2: number;
    q3: number;
    n1: number;
    n2: number;
    n3: number;
    qs1: number;
    qs2: number;
    qs3: number;
  }

  export default function Summary({ q1, q2, q3, n1, n2, n3, qs1, qs2, qs3 }: SummaryProps) {
    return (
      <div className="p-4 border rounded-lg bg-white shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Sammanfattning</h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium text-blue-700">Rum 1:</span> Q = {q1.toFixed(4)} m³/s, n = {n1}, q_s = {qs1},
            C = {calculateCValue(q1, qs1, n1).toFixed(2)} cfu/m³
          </p>
          <p>
            <span className="font-medium text-green-700">Rum 2:</span> Q = {q2.toFixed(4)} m³/s, n = {n2}, q_s = {qs2},
            C = {calculateCValue(q2, qs2, n2).toFixed(2)} cfu/m³
          </p>
          <p>
            <span className="font-medium text-orange-700">Rum 3:</span> Q = {q3.toFixed(4)} m³/s, n = {n3}, q_s = {qs3},
            C = {calculateCValue(q3, qs3, n3).toFixed(2)} cfu/m³
          </p>
        </div>
      </div>
    );
  }