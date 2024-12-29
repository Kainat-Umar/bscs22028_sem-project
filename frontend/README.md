# Airbnb-Inspired Application
A simplified Airbnb-inspired web app built with React, Node.js, and Express. Features include property listings, dynamic details, and mock booking functionality.

## Features
- **Frontend**: React-based, responsive design, React Router navigation.
- **Backend**: Mock Express server with API endpoints for listings and bookings.

## Installation

1. Clone the repository
2. Install dependencies
- npm install

## Running the Project
Start the server:
- npm run dev
- Runs on http://localhost:5173.

## API Endpoints
- GET: /api/listings	Fetch all property listings.
- GET: /api/listings/:id	Fetch specific listing details.
- GET: /api/listings/search?query=	Search listings by location.
- POST: /api/bookings	Mock booking submission.

## Frontend Routing
- /:	Homepage with listings.
- /listings/:id:	Details of a selected property.
- /book/:id:	Booking form for a selected listing.
