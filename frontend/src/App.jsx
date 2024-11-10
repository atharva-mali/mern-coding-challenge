// App.js
import React, { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import TransactionsBarChart from "./components/TransactionsBarChart";
import PriceRangePieChart from "./components/PriceRangePieChart";
import Footer from "./components/Footer";  // Import the Footer component

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [priceRangeData, setPriceRangeData] = useState([]);

  // Fetch transactions data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate price ranges based on filtered transactions
  const calculatePriceRanges = (transactions) => {
    const ranges = [
      { minPrice: 0, maxPrice: 50, count: 0 },
      { minPrice: 51, maxPrice: 100, count: 0 },
      { minPrice: 101, maxPrice: 200, count: 0 },
      { minPrice: 201, maxPrice: 500, count: 0 },
      { minPrice: 501, maxPrice: 1000, count: 0 },
      { minPrice: 1001, maxPrice: 5000, count: 0 },
    ];

    transactions.forEach((transaction) => {
      const price = transaction.price;
      ranges.forEach((range) => {
        if (price >= range.minPrice && price <= range.maxPrice) {
          range.count += 1;
        }
      });
    });

    return ranges;
  };

  // Update filtered transactions and price range data when transactions, selected month, or search query change
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const transactionMonth = new Date(transaction.dateOfSale).toLocaleString(
        "default",
        { month: "short" }
      );
      const isInMonth = transactionMonth === selectedMonth;
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return isInMonth && matchesSearch;
    });

    setFilteredTransactions(filtered);
    const ranges = calculatePriceRanges(filtered);
    setPriceRangeData(ranges);
  }, [transactions, selectedMonth, searchQuery]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Transactions Dashboard
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="w-full md:w-auto px-4 py-2 border border-blue-300 rounded-md text-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search transactions..."
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <TransactionsTable
          transactions={filteredTransactions}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <Statistics selectedMonth={selectedMonth} transactions={filteredTransactions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TransactionsBarChart selectedMonth={selectedMonth} priceRangeData={priceRangeData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <PriceRangePieChart selectedMonth={selectedMonth} priceRangeData={priceRangeData} />
        </div>
      </div>

      {/* Add Footer Component */}
      <Footer />
    </div>
  );
};

export default App;
