import React from 'react';

const TransactionsTable = ({ transactions, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">Transactions</h2>
      
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={onSearchChange}
        className="border border-gray-300 rounded-lg p-3 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-900 text-sm">
              <th className="p-4 border-b font-semibold">Image</th>
              <th className="p-4 border-b font-semibold">Title</th>
              <th className="p-4 border-b font-semibold">Description</th>
              <th className="p-4 border-b font-semibold">Price</th>
              <th className="p-4 border-b font-semibold hidden md:table-cell">Category</th>
              <th className="p-4 border-b font-semibold hidden md:table-cell">Date of Sale</th>
              <th className="p-4 border-b font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-blue-50 transition-colors text-gray-700 text-sm">
                <td className="p-4 border-b">
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="p-4 border-b">{transaction.title}</td>
                <td className="p-4 border-b text-gray-600 whitespace-normal max-w-lg">
                  {transaction.description}
                </td>
                <td className="p-4 border-b font-medium text-blue-600">${transaction.price}</td>
                <td className="p-4 border-b hidden md:table-cell text-gray-500">{transaction.category}</td>
                <td className="p-4 border-b hidden md:table-cell text-gray-500">
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </td>
                <td className="p-4 border-b">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${transaction.sold ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {transaction.sold ? 'Sold' : 'Not Sold'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
  