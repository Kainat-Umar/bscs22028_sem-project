import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings');
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="profile">
      <h2>Your Bookings</h2>
      {error && <p className="error-message">{error}</p>}
      {bookings.map((booking) => (
        <div key={booking._id} className="booking-card">
          <p>Property: {booking.listing.title}</p>
          <p>Dates: {new Date(booking.checkInDate).toDateString()} - {new Date(booking.checkOutDate).toDateString()}</p>
          <p>Total Price: ${booking.totalPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;