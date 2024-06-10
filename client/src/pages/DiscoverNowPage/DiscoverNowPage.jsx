import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DiscoverNowPage.scss';
import Logo from '../../assets/Artify-logo.svg'; 
import SearchIcon from '../../assets/Search-icon.svg';


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
    <div className="discover">

      <nav className="discover__nav">
      <div className="discover__logo">
          <img src={Logo} alt="Artifý Logo" className="discover__logo--image" />
        </div>
        <Link to="/" className="discover__nav-button">HOME</Link>
      </nav>

      <main className="main">

        <h1 className="main__title">Discover Art</h1>
        <div className="main__search">
        <div className="main__icon">
            <img src={SearchIcon} alt="Search Icon" />
          </div>
          <input 
            type="text" 
            className="main__input" 
            placeholder="Search for art styles, artists, and their works . . ." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="main__button">SEARCH</button>
        </div>

        <section>
        <div className="artworks">
          {Array.isArray(artworks) && artworks.map((artwork) => (
            <div key={artwork.id} className="artworks__artwork">
              <div className="artworks__artwork--image">
                {artwork.image_id ? (
                  <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} alt={artwork.title} />
                ) : (
                  <div>No Image Available</div>
                )}
              </div>
              <div className="artworks__artdetails">
                <p className="artworks__artdetails--title">{artwork.artist_title}</p>
                <p className="artworks__artdetails--artist">{artwork.style_title}</p>
                <p className="artdetails--style">{artwork.classification_titles}</p>
                <p className="artdetails--year">{artwork.date_display}</p>
              </div>
            </div>
          ))}
        </div>
        </section>

      </main>
    </div>
  );
}


