import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

export default function InvoiceChart({ chartData }) {
  console.log(chartData);
  const labels = chartData.map((data) => data.date);
  const totalInvoices = chartData.map((data) => data.total_invoices);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Invoices",
        data: totalInvoices,
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
        ticks: {
          color: "#22272B66",
          padding: 10,
        },
        grid: {
          drawTicks: false,
          color: "#EAEAEA",
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "#22272B66",
          padding: 10,
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
      tooltip: {
        callbacks: {
          label: (context) => `Total Invoices: ${context.raw}`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
