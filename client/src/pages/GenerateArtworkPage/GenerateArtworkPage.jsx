import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import openaiLogo from '/src/assets/OpenAI_Logo.svg.png';

export default function GenerateArtworkPage() {
  const [generatedImage, setGeneratedImage] = useState(null);

  const artStyles = [
    'Impressionism', 'Cubism', 'Surrealism', 'Abstract Expressionism',
    'Pop Art', 'Renaissance', 'Baroque', 'Minimalism', 'Art Nouveau', 'Futurism'
  ];

  const prompts = {
    'Impressionism': "Sunset over a calm sea",
    'Cubism': "Abstract portrait with geometric shapes",
    'Surrealism': "Dreamlike forest with floating clocks",
    'Abstract Expressionism': "Colorful chaotic brushstrokes",
    'Pop Art': "Comic-style city scene",
    'Renaissance': "Classical portrait with detailed realism",
    'Baroque': "Dramatic scene with intense lighting",
    'Minimalism': "Simple geometric shapes on a white background",
    'Art Nouveau': "Elegant woman with flowing hair",
    'Futurism': "Dynamic cityscape with motion lines"
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
        <h1 className="navbar__title">Artifý</h1>
        <img src={openaiLogo} alt="OpenAI Logo" className="navbar__logo" />
        <Link to="/" className="navbar__button">HOME</Link>
      </nav>
      <main className="main-section">
        <h2 className="main-section__title">Create Your Masterpiece</h2>
        <p className="main-section__subtitle">
          Select an art style, and our AI will generate a unique artwork for you
        </p>
        <div className="style-buttons">
          {artStyles.map((style) => (
            <button
              key={style}
              className="style-button"
              onClick={() => handleGenerate(style)}
            >
              {style}
            </button>
          ))}
        </div>
        <div className="artwork-placeholder">
          {generatedImage ? (
            <img src={generatedImage} alt="Generated Artwork" className="artwork-placeholder__image" />
          ) : (
            <img src="path_to_placeholder_image.png" alt="Artwork Placeholder" className="artwork-placeholder__image" />
          )}
        </div>
      </main>
    </div>
  );
}

