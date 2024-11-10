// PriceRangePieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PriceRangePieChart = ({ selectedMonth, priceRangeData }) => {
  // Prepare data for Chart.js Pie chart
  const data = {
    labels: priceRangeData.map((range) => `${range.minPrice} - ${range.maxPrice}`),
    datasets: [
      {
        data: priceRangeData.map((range) => range.count),
        backgroundColor: [
          "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#1ABC9C",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4A5568", // Dark gray for better readability
        },
      },
      title: {
        display: true,
        text: `Price Range Distribution - ${selectedMonth}`,
        color: "#1F2937", // Text color for title (gray-800)
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: "#4A5568",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-6">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Price Range Distribution for {selectedMonth}
        </h3>
        <div className="w-full h-80">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PriceRangePieChart;
