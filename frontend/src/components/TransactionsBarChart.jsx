import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ selectedMonth, priceRangeData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Prepare the price range data for the chart
    const ranges = priceRangeData.map((range) => range.count);

    // Set up chart data with price ranges and counts
    setChartData({
      labels: ['0-50', '51-100', '101-200', '201-500', '501-1000', '1001-5000'],
      datasets: [
        {
          label: 'Number of Items',
          data: ranges,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [priceRangeData]);

  if (!chartData) return <p className="text-center text-gray-600">Loading chart...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6" style={{ height: '400px' }}> {/* Set a fixed height */}
      <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Price Range Distribution for {selectedMonth}
      </h3>
      <div className="w-full h-full">
        <Bar
          data={chartData}
          height={300} // Adjust height to ensure vertical size
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Price Range',
                  color: '#4A5568',
                  font: { size: 14 },
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Items',
                  color: '#4A5568',
                  font: { size: 14 },
                },
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  color: '#4A5568',
                },
              },
              tooltip: {
                backgroundColor: '#4A5568',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsBarChart;
