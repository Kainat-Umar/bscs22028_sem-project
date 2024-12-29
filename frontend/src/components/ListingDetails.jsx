import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported
import './ListingDetails.css';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the listing from the backend by ID
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setListing(response.data);  // Set the fetched listing data to state
      } catch (err) {
        setError('Failed to fetch the listing');
        console.error('Error fetching listing:', err);
      }
    };

    fetchListing();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div className="listing-details">
      <div className="image-gallery">
        <img src={listing.image} alt={listing.title} className="main-image" />
      </div>
      <div className="details-content">
        <h2>{listing.title}</h2>
        <p>{listing.type} · {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms</p>
        <p className="price">${listing.price} / night</p>
        <p className="amenities"><strong>Amenities:</strong> {listing.amenities.join(', ')}</p>
        <Link to={`/book/${listing._id}`} className="book-now-btn">Book Now</Link>
      </div>
    </div>
  );
};

export default ListingDetails;
