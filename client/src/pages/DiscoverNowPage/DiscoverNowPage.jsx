import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DiscoverNowPage.scss';

export default function DiscoverNowPage() {

  const [artworks, setArtworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect (() => {
    const fetchArtworks = async () => {
      try {
        console.log('Fetching artworks from API...');
        const response = await axios.get('http://localhost:3001/api/art-styles');
        console.log('Response data:', response.data);
        setArtworks(response.data || []);
      } catch (error) {
        console.error('Error fetching artworks', error )
      }
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchFilteredArtworks = async () => {
      try {
        console.log('Fetching filtered artworks from API...');
        const response = await axios.get('http://localhost:3001/api/search-art-styles', {
          params: { keyword: searchQuery }
        });
        console.log('Filtered response data:', response.data);
        setArtworks(response.data || []);
      } catch (error) {
        console.error('Error fetching filtered artworks', error);
      }
    };

    fetchFilteredArtworks();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    console.log('Search input changed:', event.target.value);
    setSearchQuery(event.target.value);
  };

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
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="discover-now__search-button">
            <span className="discover-now__search-icon">🔍</span> Search
          </button>
        </div>

        <div className="discover-now__artworks">
          {Array.isArray(artworks) && artworks.map((artwork) => (
            <div key={artwork.id} className="discover-now__artwork">
              <div className="discover-now__artwork-placeholder">
                {artwork.primaryimageurl ? (
                  <img src={artwork.primaryimageurl} alt={artwork.title} />
                ) : (
                  <div>No Image Available</div>
                )}
              </div>
              <div className="discover-now__artwork-details">
                <p className="discover-now__artwork-title">{artwork.title}</p>
                <p className="discover-now__artwork-artist">{artwork.people?.[0]?.name || 'Unknown Artist'}</p>
                <p className="discover-now__artwork-style">{artwork.classification || 'Unknown Style'}</p>
                <p className="discover-now__artwork-year">{artwork.century || 'Unknown Century'}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


