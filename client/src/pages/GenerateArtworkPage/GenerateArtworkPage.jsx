import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import openaiLogo from '/src/assets/OpenAI_Logo.svg.png';
import './GenerateArtworkPage.scss';
import Logo from '../../assets/Artify-logo.svg'; 
import Placeholder from '../../assets/GenArtPlaceholder.svg'

export default function GenerateArtworkPage() {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('');

  const artStyles = [
    'Impressionism', 'Cubism', 'Surrealism', 'Abstract Expressionism',
    'Pop Art', 'Renaissance', 'Baroque', 'Minimalism', 'Art Nouveau', 'Futurism',
    'Neoclassicism', 'Op Art', 'Art Deco', 'Romanticism'
  ];

  const prompts = {
    'Impressionism': ["Sunset over a calm sea", "Morning fog over a bustling harbor", "Flower garden in full bloom", "City street on a rainy day"],
    'Cubism': ["Abstract portrait with geometric shapes", "Still life with fragmented objects", "Geometric landscape with buildings", "Abstract still life with fruit and bottles"],
    'Surrealism': ["Dreamlike forest with floating clocks", "Melting buildings in a desert", "Flying fish in a night sky", "Giant clock face in a meadow"],
    'Abstract Expressionism': ["Colorful chaotic brushstrokes", "Bold splashes of red and black", "Chaotic lines in vibrant colors", "Energetic strokes of blue and yellow"],
    'Pop Art': ["Comic-style city scene", "Retro-style soda bottle", "Comic book hero in action", "Neon sign with bold letters"],
    'Renaissance': ["Classical portrait with detailed realism", "Noblewoman in ornate dress", "Mythological scene with gods", "Knight in shining armor"],
    'Baroque': ["Dramatic scene with intense lighting", "Grand palace interior with chandeliers", "Royal banquet with dramatic lighting", "Ornate cathedral with stained glass"],
    'Minimalism': ["Simple geometric shapes on a white background", "Single red dot on white canvas", "Three parallel lines on black background", "Simple square in muted tones"],
    'Art Nouveau': ["Elegant woman with flowing hair", "Ornate butterfly with floral patterns", "Graceful dancer with flowing dress", "Peacock with intricate tail feathers"],
    'Futurism': ["Dynamic cityscape with motion lines", "High-speed train in motion", "Futuristic robot with sleek design", "Spaceship soaring through stars"],
    'Neoclassicism': ["Heroic figure in classical attire", "Ancient Roman architecture", "Statuesque figure in a toga", "Classical temple with columns"],
    'Op Art': ["Optical illusion with black and white patterns", "Colorful spirals and waves", "Checkerboard pattern with visual depth", "Geometric shapes creating visual tricks"],
    'Art Deco': ["Stylish city skyline with geometric patterns", "Elegant interior with bold shapes", "Vintage car with sleek design", "Glamorous fashion illustration"],
    'Romanticism': ["Stormy sea with a shipwreck", "Dramatic mountain landscape", "Heroic scene with a lone figure", "Emotional depiction of a natural disaster"]
  };

  const handleGenerate = async (style) => {
    try {
      const response = await axios.post('http://localhost:3001/generate-artwork', {
        keywords: prompts[style],
        style: style
      });
      setGeneratedImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating artwork:', error);
    }
  };

  return (
    <div className="generate-artwork-page">
      <nav className="navbar">
        <div className="navbar__logo">
          <img src={Logo} alt="Artifý Logo" className="navbar__logo-image" />
          <img src={openaiLogo} alt="OpenAI Logo" className="navbar__logo-image" />
        </div>
       
        <Link to="/" className="navbar__button">HOME</Link>
      </nav>
      <main className="main-section">
        <h2 className="main-section__title">CREATE YOUR MASTERPIECE</h2>
        <p className="main-section__subtitle">
        Choose an art style, and let our AI create a unique masterpiece. Exploring different art styles helps you understand the diverse techniques and historical contexts that define each movement. 
        By recognizing the unique characteristics of each style, you can deepen your appreciation for art and its evolution over time.
        </p>
        <div className="main-section__dropdown">
          <label htmlFor="art-style" className="main-section__dropdown-label">Style</label>
          <select
            id="art-style"
            className="main-section__dropdown-select"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
          >
            <option value="">Select Art Style</option>
            {artStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        <button
          className="main-section__generate-button"
          onClick={() => handleGenerate(selectedStyle)}
        >
          GENERATE
        </button>
        <div className="artwork-placeholder">
          {generatedImage ? (
            <img src={generatedImage} alt="Generated Artwork" className="artwork-placeholder__image" />
          ) : (
            <img src={Placeholder} alt="Artwork Placeholder" className="artwork-placeholder__image" />
          )}
        </div>
      </main>
    </div>
  );
}
