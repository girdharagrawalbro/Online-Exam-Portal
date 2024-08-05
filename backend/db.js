const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/onlineexam"; // Replace with your actual URI

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error(err);
    // Handle connection errors appropriately (e.g., process.exit(1))
  }
};

module.exports = connectToMongo;
