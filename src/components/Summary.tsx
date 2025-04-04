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
                                    const c1 = calculateCValue(q1, qs1, n1);
                                    const c2 = calculateCValue(q2, qs2, n2);
                                    const c3 = calculateCValue(q3, qs3, n3);

                                    return (
                                      <div className="p-6 border rounded-lg bg-white shadow-md">
                                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Sammanfattning</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          {/* Left column - Concentration values */}
                                          <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-base font-medium mb-3 text-gray-900">Koncentration (C) [cfu/m³]</h4>
                                            <div className="space-y-2">
                                              <div className="flex items-center">
                                                <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                                                <span className="font-medium text-blue-700">Rum 1:</span>
                                                <span className="ml-2 text-gray-900">{isFinite(c1) ? c1.toFixed(2) : "0.00"}</span>
                                              </div>
                                              <div className="flex items-center">
                                                <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
                                                <span className="font-medium text-green-700">Rum 2:</span>
                                                <span className="ml-2 text-gray-900">{isFinite(c2) ? c2.toFixed(2) : "0.00"}</span>
                                              </div>
                                              <div className="flex items-center">
                                                <div className="w-4 h-4 rounded-full bg-orange-600 mr-2"></div>
                                                <span className="font-medium text-orange-700">Rum 3:</span>
                                                <span className="ml-2 text-gray-900">{isFinite(c3) ? c3.toFixed(2) : "0.00"}</span>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right column - Other parameters in float layout */}
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                              <h4 className="text-base font-medium mb-3 text-gray-900">Luftflöde (Q) [m³/s]</h4>
                                              <div className="space-y-2">
                                                <div><span className="font-medium text-blue-700">Rum 1:</span> <span className="text-gray-900">{q1.toFixed(4)}</span></div>
                                                <div><span className="font-medium text-green-700">Rum 2:</span> <span className="text-gray-900">{q2.toFixed(4)}</span></div>
                                                <div><span className="font-medium text-orange-700">Rum 3:</span> <span className="text-gray-900">{q3.toFixed(4)}</span></div>
                                              </div>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                              <h4 className="text-base font-medium mb-3 text-gray-900">Personer (n)</h4>
                                              <div className="space-y-2">
                                                <div><span className="font-medium text-blue-700">Rum 1:</span> <span className="text-gray-900">{n1}</span></div>
                                                <div><span className="font-medium text-green-700">Rum 2:</span> <span className="text-gray-900">{n2}</span></div>
                                                <div><span className="font-medium text-orange-700">Rum 3:</span> <span className="text-gray-900">{n3}</span></div>
                                              </div>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                                              <h4 className="text-base font-medium mb-3 text-gray-900">Källstyrka (qs) [cfu/s]</h4>
                                              <div className="space-y-2">
                                                <div><span className="font-medium text-blue-700">Rum 1:</span> <span className="text-gray-900">{qs1}</span></div>
                                                <div><span className="font-medium text-green-700">Rum 2:</span> <span className="text-gray-900">{qs2}</span></div>
                                                <div><span className="font-medium text-orange-700">Rum 3:</span> <span className="text-gray-900">{qs3}</span></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }