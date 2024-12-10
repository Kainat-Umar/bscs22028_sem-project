// Import necessary modules using ES6 imports
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth.js';
import listingsRoutes from './routes/listings.js';
import adminRoutes from './routes/admin.js';

// Initialize environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Set up routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/listings', listingsRoutes);  // Listings routes
app.use('/api/admin', adminRoutes);  // Admin routes

// Serve static files in production (if frontend is built)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // Serve index.html file for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

// Default route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Airbnb-inspired API!');
});

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
