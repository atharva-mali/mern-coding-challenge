import React from 'react';

const Statistics = ({ selectedMonth, transactions }) => {
  // Ensure transactions is available
  if (!transactions || transactions.length === 0) {
    return <p className="text-center text-gray-600 font-medium mt-4">No transactions available</p>;
  }

  // Filter transactions by the selected month
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionMonth = new Date(transaction.dateOfSale).toLocaleString('default', { month: 'short' });
    return transactionMonth === selectedMonth;
  });

  // Calculate total sales and item count for the selected month
  const totalSales = filteredTransactions.reduce((acc, transaction) => acc + transaction.price, 0);
  const totalItems = filteredTransactions.length;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Statistics for {selectedMonth}</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-800 text-lg font-medium">
        <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Total Sales</p>
          <p className="text-blue-600 text-2xl font-bold">${totalSales.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Total Items</p>
          <p className="text-green-600 text-2xl font-bold">{totalItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
