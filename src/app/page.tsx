// src/app/page.tsx
  "use client";

  import { useState, useCallback } from "react";
  import Room from "../components/Room";
  import ConcentrationChart from "../components/ConcentrationChart";
  import Summary from "../components/Summary";
  import { calculateCValue } from "../utils/calculations";

  export default function Home() {
    // Room state
    const [q1, setQ1] = useState(0);
    const [q2, setQ2] = useState(0);
    const [q3, setQ3] = useState(0);
    const [n1, setN1] = useState(4);
    const [n2, setN2] = useState(4);
    const [n3, setN3] = useState(4);
    const [qs1, setQs1] = useState(4);
    const [qs2, setQs2] = useState(4);
    const [qs3, setQs3] = useState(4);

    // Room change handlers
    const handleRoom1Change = useCallback((q: number, qs: number, n: number) => {
      setQ1(q);
      setQs1(qs);
      setN1(n);
    }, []);

    const handleRoom2Change = useCallback((q: number, qs: number, n: number) => {
      setQ2(q);
      setQs2(qs);
      setN2(n);
    }, []);

    const handleRoom3Change = useCallback((q: number, qs: number, n: number) => {
      setQ3(q);
      setQs3(qs);
      setN3(n);
    }, []);

    // Calculate concentration values for chart
    const c1Value = calculateCValue(q1, qs1, n1);
    const c2Value = calculateCValue(q2, qs2, n2);
    const c3Value = calculateCValue(q3, qs3, n3);

    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Room Concentration Comparison with Individual Source Strengths
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Room
            roomNumber={1}
            color="text-blue-700"
            accentColor="accent-blue-600"
            bgColor="bg-blue-50"
            onChange={handleRoom1Change}
            step={0.1}
          />
          <Room
            roomNumber={2}
            color="text-green-700"
            accentColor="accent-green-600"
            bgColor="bg-green-50"
            onChange={handleRoom2Change}
            step={0.5}
          />
          <Room
            roomNumber={3}
            color="text-orange-700"
            accentColor="accent-orange-600"
            bgColor="bg-orange-50"
            onChange={handleRoom3Change}
            step={0.5}
          />
        </div>

        {/* Chart */}
        <ConcentrationChart c1={c1Value} c2={c2Value} c3={c3Value} />

        {/* Info Text */}
        <Summary
          q1={q1}
          q2={q2}
          q3={q3}
          n1={n1}
          n2={n2}
          n3={n3}
          qs1={qs1}
          qs2={qs2}
          qs3={qs3}
        />
      </div>
    );
  }