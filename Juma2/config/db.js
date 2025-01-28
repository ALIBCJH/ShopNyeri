import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Directly use the MongoDB connection URI
    const mongoURI =
      "mongodb+srv://simonombom22:0OLkPdkLgc2TXhMc@cluster0.sycny.mongodb.net/ShopYangu";

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // This line accesses conn
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
