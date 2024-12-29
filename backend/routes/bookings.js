import express from 'express';
import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect routes with JWT authentication middleware
router.use(authMiddleware);

// Get all bookings for the authenticated user
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('listing');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const { listingId, checkInDate, checkOutDate, totalPrice } = req.body;

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const newBooking = new Booking({
      user: req.user.id, // The user making the booking
      listing: listingId,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

export default router;
