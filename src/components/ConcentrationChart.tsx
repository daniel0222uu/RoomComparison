// src/components/ConcentrationChart.tsx
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
);

interface ChartData {
  c1: number;
  c2: number;
  c3: number;
}

export default function ConcentrationChart({ c1, c2, c3 }: ChartData) {
  // Use separate datasets for each bar to ensure proper coloring
  const chartData = {
    labels: ["Rum 1", "Rum 2", "Rum 3"],
    datasets: [
      {
        label: "Rum 1",
        data: [isFinite(c1) ? c1 : 0, null, null],
        backgroundColor: "#1f77b4",
        stack: "Stack 0",
      },
      {
        label: "Rum 2",
        data: [null, isFinite(c2) ? c2 : 0, null],
        backgroundColor: "#2ca02c",
        stack: "Stack 0",
      },
      {
        label: "Rum 3",
        data: [null, null, isFinite(c3) ? c3 : 0],
        backgroundColor: "#ff7f0e",
        stack: "Stack 0",
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
          label: function(tooltipItem: any) {
            const value = tooltipItem.raw;
            return `Koncentration (C) [cfu/m³]: ${value.toFixed(2)}`;
          },
        },
      },
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            yMin: 50,
            yMax: 50,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: 'Tröskelvärde: 50 cfu/m³',
              position: 'end',
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              font: {
                size: 12
              }
            }
          }
        }
      }
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
        <div className="flex justify-center">
          <div className="h-96 w-full max-w-5xl">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>
      </div>
  );
}