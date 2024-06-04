import React from 'react';
import { Link } from 'react-router-dom';
import './DiscoverNowPage.scss';

export default function DiscoverNowPage() {
  return (
    <div className="discover-now">

      <nav className="discover-now__nav">
        <div className="discover-now__logo">artifý</div>
        <Link to="/" className="discover-now__nav-button">HOME</Link>
      </nav>

      <main className="discover-now__main">

        <h1 className="discover-now__title">Discover Art</h1>
        <div className="discover-now__search-section">
          <input 
            type="text" 
            className="discover-now__search-input" 
            placeholder="Search for art styles, artists, and their works . . ." 
          />
          <button className="discover-now__search-button">
            <span className="discover-now__search-icon">🔍</span> Search
          </button>
        </div>

        <div className="discover-now__artworks">
          {[1, 2, 3].map((placeholder) => (
            <div key={placeholder} className="discover-now__artwork">
              <div className="discover-now__artwork-placeholder">Placeholder Image</div>
              <div className="discover-now__artwork-details">
                <p className="discover-now__artwork-title">Artwork Title</p>
                <p className="discover-now__artwork-artist">Artist Name</p>
                <p className="discover-now__artwork-style">Art Style</p>
                <p className="discover-now__artwork-year">Year</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
