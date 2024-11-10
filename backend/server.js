import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

// Load environment variables from .env file
config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// MongoDB connection
console.log("MongoDB URI:", process.env.MONGO_URI); // Check if the URI is being loaded correctly
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define routes
import transactionRoutes from "./routes/transactionRoutes.js";  // Ensure the correct extension
app.use("/api", transactionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
