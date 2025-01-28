import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the cors package
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddlleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

connectDB(); // Connect to MongoDB
const port = process.env.PORT || 3000;

const app = express();

// Enable CORS for all routes
app.use(cors()); // Add this line to enable CORS

app.get("/", (req, res) => {
  res.send("API is running .....!");
});

// Use your product routes with the API prefix
//app.use("/api/products", productRoutes);
app.use("/api/products", productRoutes);

// Middleware for handling not found and error responses
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
