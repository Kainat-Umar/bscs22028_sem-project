import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockListings from '../data/listings.json';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the listing details by ID
    const selectedListing = mockListings.find((item) => item.id === parseInt(id));
    setListing(selectedListing);
  }, [id]);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }
    setError('');
    alert('Booking confirmed! Details will be sent to your email.');
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  const totalNights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = totalNights * listing.price;

  return (
    <div className="booking-page">
      <h2>Booking for {listing.title}</h2>
      <div className="booking-form">
        <label>
          Check-in:
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </label>
        <label>
          Check-out:
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="booking-summary">
          <p><strong>Price per night:</strong> ${listing.price}</p>
          <p><strong>Total nights:</strong> {totalNights}</p>
          <p><strong>Total price:</strong> ${totalPrice}</p>
        </div>
        <button onClick={handleBooking} className="confirm-btn">Confirm Booking</button>
      </div>
    </div>
  );
};

export default BookingPage;
