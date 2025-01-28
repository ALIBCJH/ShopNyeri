import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"; // for colored console output
import users from "./Data/users.js";
import products from "./Data/products.js";
import User from "./models/userModel.js"; // Import User model
import Product from "./models/productModel.js"; // Import Product model
import Order from "./models/orderModel.js"; // Import Order model
import connectDB from "./config/db.js";

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB

const importData = async () => {
  try {
    // Delete all existing data from the collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert new users into the User collection
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; // Get admin user ID

    // Map products to include the admin user
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert new products into the Product collection
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse); // Success message
    process.exit(); // Exit the process
  } catch (error) {
    console.error(`${error}`.red.inverse); // Log error
    process.exit(1); // Exit the process with failure
  }
};

const destroyData = async () => {
  try {
    // Delete all data from collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse); // Success message
    process.exit(); // Exit the process
  } catch (error) {
    console.error(`${error}`.red.inverse); // Log error
    process.exit(1); // Exit the process with failure
  }
};

// Check for the "-d" argument to decide whether to destroy data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData(); // Call importData when not using the "-d" flag
}
