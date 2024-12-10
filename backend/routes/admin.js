import express from 'express';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js'; // Assuming you have a Booking model in `models/Booking.js`

const router = express.Router();

// Admin route to get all listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin route to add a new listing
router.post('/listings', async (req, res) => {
  const { title, description, price, image } = req.body;

  try {
    const newListing = new Listing({ title, description, price, image });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin route to delete a listing
router.delete('/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    await listing.remove();
    res.json({ message: 'Listing removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin route to get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('listing', 'title price').populate('user', 'username');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
