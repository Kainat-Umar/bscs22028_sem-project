import mongoose from 'mongoose';

// Function to establish connection to MongoDB
const connectDB = async () => {
  try {
    // Use the connection string stored in environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDB;
