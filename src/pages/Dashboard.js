import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [spinner, setSpinner] = useState(false);

  // Dummy data
  const metrics = {
    totalItems: 1200,
    soldItems: 450,
    availableStock: 750,
    ordersProcessed: 300,
  };

  const chartData = {
    labels: [
      "Total Items",
      "Sold Items",
      "Available Stock",
      "Orders Processed",
    ],
    datasets: [
      {
        label: "Inventory Metrics",
        data: [
          metrics.totalItems,
          metrics.soldItems,
          metrics.availableStock,
          metrics.ordersProcessed,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Inventory Overview",
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="user-directory">
      <h2>Dashboard</h2>
      {spinner && (
        <div className="overlay">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Items</h3>
          <p>{metrics.totalItems}</p>
        </div>
        <div className="dashboard-card">
          <h3>Sold Items</h3>
          <p>{metrics.soldItems}</p>
        </div>
        <div className="dashboard-card">
          <h3>Available Stock</h3>
          <p>{metrics.availableStock}</p>
        </div>
        <div className="dashboard-card">
          <h3>Orders Processed</h3>
          <p>{metrics.ordersProcessed}</p>
        </div>
      </div>

      <div className="dashboard-chart">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
