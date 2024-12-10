import mongoose from 'mongoose';

// Create the listing schema
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL of the image or path
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model (host/owner)
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
