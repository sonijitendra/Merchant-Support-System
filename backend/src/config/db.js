const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn("MONGODB_URI is not configured. Using in-memory storage.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully.");
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      `MongoDB connection failed. Using in-memory storage instead. ${error.message}`
    );
    return false;
  }
};

module.exports = connectDatabase;
