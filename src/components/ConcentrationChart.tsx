// src/components/ConcentrationChart.tsx
  import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
  import { Bar } from "react-chartjs-2";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  interface ChartData {
    c1: number;
    c2: number;
    c3: number;
  }

  export default function ConcentrationChart({ c1, c2, c3 }: ChartData) {
    const chartData = {
      labels: ["Rum 1", "Rum 2", "Rum 3"],
      datasets: [
        {
          label: "Koncentration (C) [cfu/m³]",
          data: [
            isFinite(c1) ? c1 : 0,
            isFinite(c2) ? c2 : 0,
            isFinite(c3) ? c3 : 0,
          ],
          backgroundColor: ["#1f77b4", "#2ca02c", "#ff7f0e"],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Koncentrationsjämförelse för 3 rum",
          color: "#1f2937",
          font: {
            size: 16,
            weight: 700
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: {
              dataset: {label: string};
              raw: number;
            }) {
              return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
            },
          },
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Koncentration (C) [cfu/m³]",
            color: "#4b5563"
          },
          ticks: {
            color: "#4b5563"
          }
        },
        x: {
          ticks: {
            color: "#4b5563"
          }
        }
      }
    };

    return (
      <div className="p-6 border rounded-lg bg-white mb-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Koncentration jämförelse mellan rummen</h2>
        <div className="flex justify-center">
          <div className="h-96 w-full max-w-5xl">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>
      </div>
    );
  }