import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockListings from '../data/listings.json';
import './ListingDetails.css';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Simulate fetching listing data by ID
    const selectedListing = mockListings.find((item) => item.id === parseInt(id));
    setListing(selectedListing);
  }, [id]);

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
        <Link to={`/book/${listing.id}`} className="book-now-btn">Book Now</Link>
      </div>
    </div>
  );
};

export default ListingDetails;
