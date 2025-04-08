import { useState, useEffect, useCallback } from "react";

          interface RoomProps {
            roomNumber: number;
            color: string;
            accentColor: string;
            bgColor: string;
            onChange: (q: number, qs: number, n: number) => void;
            step: number;
          }

          export default function Room({ roomNumber, color, accentColor, bgColor, onChange, step }: RoomProps) {
            const [area, setArea] = useState(10);
            const [height, setHeight] = useState(2.5);
            const [airChanges, setAirChanges] = useState(10);
            const [n, setN] = useState(4);
            const [qs, setQs] = useState(4);
            const [q, setQ] = useState(0);
            const [c, setC] = useState("");
            const [directQMode, setDirectQMode] = useState(false);

            useEffect(() => {
              // Calculate q based on air changes if not in direct mode
              if (!directQMode) {
                const volume = area * height; // m^3
                const calculatedQ = (airChanges * volume) / 3600; // m^3/s
                setQ(calculatedQ);
              } else {
                // Update airChanges based on Q when in direct mode
                const volume = area * height; // m^3
                const calculatedAirChanges = (q * 3600) / volume;
                setAirChanges(calculatedAirChanges);
              }

              // Calculate concentration
              if (q > 0) {
                const concentration = (n * qs) / q;
                setC(concentration.toFixed(2) + " cfu/m³");
              } else {
                setC("∞ cfu/m³");
              }

              onChange(q, qs, n);
            }, [area, height, airChanges, n, qs, q, onChange, directQMode]);

            // Handle direct Q input change
            const handleQChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const newQ = parseFloat(e.target.value) || 0;
              setQ(newQ);
            };

            // Toggle between direct Q mode and air changes mode
            const toggleQMode = () => {
              setDirectQMode(!directQMode);
            };

            return (
              <div className={`p-6 border rounded-lg ${bgColor} relative`}>
                <h2 className={`text-xl font-bold mb-4 ${color}`}>Rum {roomNumber}</h2>

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
                      step="0.1"
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border rounded text-gray-900"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {directQMode ? `Luftväxlingar per timme: ${airChanges.toFixed(2)}` : `Luftväxlingar per timme: ${airChanges}`}
                    </label>
                    <button
                      onClick={toggleQMode}
                      className={`text-xs px-2 py-1 rounded ${directQMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {directQMode ? "Q Läge" : "ACH Läge"}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="150"
                    step={step}
                    value={airChanges}
                    onChange={(e) => setAirChanges(parseFloat(e.target.value))}
                    className={`w-full ${accentColor}`}
                    style={{
                      accentColor: accentColor.includes("blue") ? "#2563eb" : accentColor.includes("green") ? "#16a34a" : "#f97316",
                      opacity: directQMode ? 0.5 : 1
                    }}
                    disabled={directQMode}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">Luftflöde (Q) [m³/s]</label>
                  <input
                    type="number"
                    value={q.toFixed(4)}
                    onChange={handleQChange}
                    readOnly={!directQMode}
                    className={`w-full p-2 border rounded ${directQMode ? 'bg-white' : 'bg-gray-100'} text-gray-900`}
                    step="0.001"
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