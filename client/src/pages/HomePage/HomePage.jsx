
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import BackgroundImage from '../../assets/AdobeStock_542387977.png';
import ArrowIcon from '../../assets/Arrow.svg'; 
import Logo from '../../assets/Artify-logo.svg'; 


function HomePage() {
  return (
    <div className="home">

      <nav className="home__nav">
      <div className="home__logo">
          <img src={Logo} alt="Artifý Logo" className="discover__logo--image" />
        </div>
        <div><button className="home__nav-button">Generative Artwork</button></div>
      </nav>


      <main className="home__main">

      <div className='home__imagebox' >
      <img className='home__imagebox--image' style={{ backgroundImage: `url(${BackgroundImage})`}}></img>
      </div>
        
        <div className="home__title">
          <div className="home__title--sublime">SUBLIME</div>
          <span className="home__title--highlight">art</span>
          <div className="home__title--escape">ESCAPES</div>
        </div>

        <div className="home__subtitle-section">

          <h2 className="home__subtitle-section--description">Uncover the richness of art styles and history. 
          Let our AI help you create stunning artworks inspired by the great masters.</h2>

          <div className="home__discover-now">
          <Link to="/discover-now" className="home__discover-now-button">
          <button className="home__discover-button">
               <span className='home__discover-button--text'>Discover Now</span> 
                <span className="home__discover-button--icon">
                  <img src={ArrowIcon} alt="Arrow Icon" />
                </span>
              </button>
            </Link>
          </div>

        </div>
        <div className="home__stats">
          <div className="home__stat">Explore 100+ Art Styles</div>
          <div className="home__stat">Create Your Masterpiece with AI</div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;