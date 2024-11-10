// routes/transactionRoutes.js
import { Router } from 'express';
import { 
  seedDatabase, 
  listTransactions, 
  getStatistics, 
  getPriceRangeData, 
  getCategoryData, 
  getCombinedData 
} from '../controllers/transactionController.js';

const router = Router();

// Route for seeding the database
router.get('/seed', seedDatabase);

// Route to list transactions with search and pagination
router.get('/transactions', listTransactions);

// Route to get statistics
router.get('/statistics', getStatistics);

// Route to get price range data for bar chart
router.get('/price-range', getPriceRangeData);

// Route to get category data for pie chart
router.get('/categories', getCategoryData);

// Route to get combined data from all other routes
router.get('/combined', getCombinedData);

export default router;
