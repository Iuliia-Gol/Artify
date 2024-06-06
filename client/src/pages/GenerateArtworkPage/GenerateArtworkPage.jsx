import React from 'react';
import { Link } from 'react-router-dom';
import OpenAI from "openai";
import openaiLogo from '/src/assets/OpenAI_Logo.svg.png';


export default function GenerateArtworkPage() {
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
          Select an art style, provide keywords, and our AI will generate a unique artwork for you
        </p>
        <div className="search-bar">
          <input type="text" className="search-bar__input" placeholder="Enter keywords..." />
          <button className="search-bar__button">Generate</button>
        </div>
        <div className="artwork-placeholder">
          <img src="path_to_placeholder_image.png" alt="Artwork Placeholder" className="artwork-placeholder__image" />
        </div>
      </main>
    </div>
  );
}

