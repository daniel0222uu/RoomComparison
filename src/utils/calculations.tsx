// src/utils/calculations.ts
export const calculateQ = (area: number, height: number, airChanges: number): number => {
  const volume = area * height;
  return (volume * airChanges) / 3600;
};

export const calculateC = (Q: number, qs: number, n: number): string => {
  if (Q === 0) {
    return "Undefined (division by zero)";
  }
  const C = (n * qs) / Q;
  return `${C.toFixed(4)} cfu/m³`;
};

export const calculateCValue = (Q: number, qs: number, n: number): number => {
  if (Q === 0) return Infinity;
  return (n * qs) / Q;
};