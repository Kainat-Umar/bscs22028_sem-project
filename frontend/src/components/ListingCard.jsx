import React from 'react';
import { Link } from 'react-router-dom';
import './ListingCard.css';

const ListingCard = ({ listings }) => (
  <div className="listing-grid">
    {listings.map((listing) => (
      <Link 
        to={`/listings/${listing.id}`} 
        key={listing.id} 
        className="listing-card"
      >
        <div className="image-container">
          <img src={listing.image} alt={listing.title} className="listing-image" />
        </div>

        <div className="listing-content">
          <div className="listing-header">
            <h3 className="listing-title">{listing.title}</h3>
            <p className="listing-type">{listing.type} · {listing.guests} guests</p>
          </div>

          <div className="listing-footer">
            <p className="listing-price">
              ${listing.price} <span className="per-night">/ night</span>
            </p>
            <p className="listing-rating">
              <i className="fas fa-star"></i> {listing.rating}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default ListingCard;
