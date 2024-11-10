import axios from "axios";
import { ProductTransaction } from '../models/ProductTransaction.js';

// Seed Database with Third-Party Data
export const seedDatabase = async (req, res) => {
  try {
    const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");

    if (!response.data || !Array.isArray(response.data)) {
      return res.status(400).json({ error: "Invalid data format from API" });
    }

    await ProductTransaction.deleteMany({}); // Clear existing data
    await ProductTransaction.insertMany(response.data); // Insert new data

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: "Error seeding database" });
  }
};

// List All Transactions
export const listTransactions = async (req, res) => {
  try {
    const transactions = await ProductTransaction.find();

    const sanitizedTransactions = transactions.map(transaction => {
      if (isNaN(new Date(transaction.dateOfSale).getTime())) {
        transaction.dateOfSale = null;
      }
      return transaction;
    });

    res.status(200).json(sanitizedTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

// Get Monthly Statistics
export const getStatistics = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  try {
    const { startDate, endDate } = getDateRange(getMonthNumber(month));

    const soldItems = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: true,
    });
    const notSoldItems = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: false,
    });

    const totalSales = soldItems.reduce((sum, item) => sum + item.price, 0);

    return {
      totalSales,
      totalSoldItems: soldItems.length,
      totalNotSoldItems: notSoldItems.length,
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Error fetching statistics");
  }
};

// Helper function to map month names to month numbers
const monthMap = {
  "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
  "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
};

// Convert month name to month number
const getMonthNumber = (month) => {
  if (!month || typeof month !== 'string') throw new Error("Invalid month");
  
  const monthTrimmed = month.trim(); // Ensure no leading/trailing spaces
  const monthNumber = monthMap[monthTrimmed];
  
  if (!monthNumber) throw new Error(`Invalid month name '${monthTrimmed}'. Use short format like 'Jan', 'Feb'.`);
  
  return monthNumber;
};

// Helper function to create date range for the selected month (ignoring the year)
const getDateRange = (monthNumber) => {
  // Ignore the current year, just get the date range for the month
  const startDate = new Date(Date.UTC(0, monthNumber - 1, 1)); // Start of the month (year is 0, so no year filter)
  const endDate = new Date(Date.UTC(0, monthNumber, 1)); // Start of next month (year is 0, so no year filter)

  return { startDate, endDate };
};

// Get price range data for a specific month dynamically
export const getPriceRangeData = async (req, res) => {
  const { month } = req.query;  // Read the query parameter

  if (!month) {
    return res.status(400).json({ error: 'Month parameter is required' });
  }

  try {
    const { startDate, endDate } = getDateRange(getMonthNumber(month));

    // Fetch transactions for the selected month (across all years)
    const transactions = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    if (!transactions.length) {
      return res.status(404).json({ error: 'No transactions found for the selected month' });
    }

    // Calculate the min and max price from the transactions
    const minPrice = Math.min(...transactions.map((transaction) => transaction.price));
    const maxPrice = Math.max(...transactions.map((transaction) => transaction.price));

    // Return the dynamic price range
    return {
      min: minPrice,
      max: maxPrice,
    };
  } catch (error) {
    console.error('Error fetching price range data:', error);
    throw new Error('Error fetching price range data');
  }
};

// Get category data for a specific month
export const getCategoryData = async (selectedMonth) => {
  try {
    if (!selectedMonth) {
      return { data: [] };
    }

    const { startDate, endDate } = getDateRange(getMonthNumber(selectedMonth));

    const categoryTransactions = await ProductTransaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } }
    ]);

    return { data: categoryTransactions };
  } catch (error) {
    console.error("Error in getCategoryData:", error);
    return { data: [] };
  }
};

// Get Combined Data from All Endpoints
export const getCombinedData = async (req, res) => {
  try {
    const selectedMonth = req.query.month;

    if (!selectedMonth) {
      return res.status(400).json({ error: "Month is required" });
    }

    const [statistics, priceRangeData, categoryData] = await Promise.all([
      getStatistics(req, res),
      getPriceRangeData(req, res),
      getCategoryData(selectedMonth),
    ]);

    res.status(200).json({
      statistics,
      priceRangeData,
      categoryData,
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Error fetching combined data" });
  }
};
