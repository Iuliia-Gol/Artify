
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

function HomePage() {
  return (
    <div className="home">
      <nav className="home__nav">
        <div className="home__logo">artifý</div>
        <button className="home__nav-button">Generative Artwork</button>
      </nav>
      <main className="home__main">
        <div className="home__header">
          <h1 className="home__title">Sublime Art Escapes</h1>
          <div className="home__image">
            {/* Add image here */}
          </div>
        </div>
        <div className="home__subtitle-section">
          <h2 className="home__subtitle">Explore a world of art</h2>
          <div className="home__discover-now">
          <Link to="/discover-now" className="home__discover-now-button">
              <span>Discover Now</span>
              <span className="home__discover-now-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 4L20 12L12 20L4 12L12 4Z" fill="currentColor" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="home__body-text">
          {/* body text here */}
        </div>
      </main>
    </div>
  );
}

export default HomePage;