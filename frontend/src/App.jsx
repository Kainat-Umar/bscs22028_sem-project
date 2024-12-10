import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';
import ListingDetails from './components/ListingDetails';
import BookingPage from './components/BookingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'; // Protect routes for logged-in users
import mockListings from './data/listings.json';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const App = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  // Load mock listings data
  useEffect(() => {
    setListings(mockListings);
    setFilteredListings(mockListings);
  }, []);

  const filterByCategory = (category) => {
    setFilteredListings(
      category
        ? listings.filter((listing) => listing.category === category)
        : listings
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <Categories onCategorySelect={filterByCategory} />
                <ListingCard listings={filteredListings} />
              </>
            }
          />

          {/* Listing Details Page */}
          <Route path="/listings/:id" element={<ListingDetails />} />

          {/* Booking Page */}
          <Route path="/book/:id" element={<BookingPage />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Signup Page */}
          <Route path="/signup" element={<Signup />} />

          {/* Admin Panel (Protected Route) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* Profile Page (Protected Route) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
