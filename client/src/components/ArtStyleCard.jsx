import React from "react";
import './ArtStyleCard.scss'

const ArtStyleCard = ({ artStyle, description }) => {
    // if (!isOpen) return null;
  
    return (
      <div className="card">
        <div className="card__content">
          <h2 className="card__title">{artStyle}</h2>
          <p className="card__description">{description}</p>
        </div>
      </div>
    );
  };
  
  export default ArtStyleCard;