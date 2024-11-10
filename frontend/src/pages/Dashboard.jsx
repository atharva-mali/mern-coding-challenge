import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import TransactionStatistics from '../components/TransactionStatistics';
import TransactionBarChart from '../components/TransactionBarChart';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded"
        >
          {/* Add other months */}
          <option>January</option>
          <option>February</option>
          <option>March</option>
        </select>
      </div>

      <TransactionStatistics month={selectedMonth} />
      <TransactionTable month={selectedMonth} />
      <TransactionBarChart month={selectedMonth} />
    </div>
  );
};

export default Dashboard;
