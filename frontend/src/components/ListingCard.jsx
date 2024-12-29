import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListingCard.css';

const ListingCard = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 12; // Number of listings per page

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/listings?page=${currentPage}&limit=${limit}`);
        console.log('Listings response:', response.data);
        setListings(response.data.listings);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to fetch listings');
      }
      setLoading(false);
    };
    fetchListings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper function to convert Decimal128 to a number
  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2); // Convert to float and format
    }
    return price;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!listings.length) {
    return <p>No listings available</p>;
  }

  return (
    <div className="listings">
      {listings.map((listing) => {
        // Ensure that the listing has an image and access the picture_url
        const imageUrl = listing.images && listing.images[0] ? listing.images[0].picture_url : './images/fallback-img.png';
        // Ensure the key is unique
        return (
          <div key={listing._id || listing.id} className="listing-card"> {/* Fallback key if _id is missing */}
            <img src={imageUrl} alt={listing.title} className="listing-image" />
            <h4>{listing.title}</h4>
            <p>{listing.description}</p>
            <p>${formatPrice(listing.price)} / night</p> {/* Using formatPrice to convert Decimal128 */}
            <Link to={`/listing/${listing._id}`} className="view-details-btn">View Details</Link>
          </div>
        );
      })}

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ListingCard;