import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

export default function InvoiceChart() {
  const data = {
    labels: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 5}K`),
    datasets: [
      {
        label: "Invoice Percentage",
        data: [20, 30, 25, 40, 35, 50, 55, 45, 60, 64, 48, 50],
        borderColor: "#007bff",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#007bff",
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(0, 123, 255, 0.2)");
          gradient.addColorStop(1, "rgba(0, 123, 255, 0)");
          return gradient;
        },
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 20,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
          padding: 25,
        },
        grid: {
          drawTicks: false,
          color: (context) => {
            return context.tick.value % 20 === 0 ? "#EAEAEA" : "transparent";
          },
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          padding: 25,
        },
        grid: {
          drawTicks: false,
          color: "transparent",
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
