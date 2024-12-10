import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsResponse = await axios.get('/api/admin/listings');
        const bookingsResponse = await axios.get('/api/admin/bookings');
        setListings(listingsResponse.data);
        setBookings(bookingsResponse.data);
      } catch (err) {
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(`/api/admin/listings/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      setError('Failed to delete listing');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="listings">
        <h3>Manage Listings</h3>
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h4>{listing.title}</h4>
            <p>{listing.description}</p>
            <button onClick={() => handleDeleteListing(listing._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="bookings">
        <h3>Manage Bookings</h3>
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <p>User: {booking.user.username}</p>
            <p>Property: {booking.listing.title}</p>
            <p>Dates: {new Date(booking.checkInDate).toDateString()} - {new Date(booking.checkOutDate).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
