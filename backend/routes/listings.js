import express from 'express';
import Listing from '../models/Listing.js'; // Assuming you have a Listing model in `models/Listing.js`

const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new listing
router.post('/', async (req, res) => {
  const { title, description, price, image } = req.body;

  try {
    const newListing = new Listing({ title, description, price, image });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a listing
router.delete('/:id', async (req, res) => {
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

export default router;
