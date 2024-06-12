import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import openaiLogo from '/src/assets/OpenAI_Logo.svg.png';
import './GenerateArtworkPage.scss';
import Logo from '../../assets/Artify-logo.svg'; 
import Placeholder from '../../assets/GenArtPlaceholder.svg'
import ArtStyleCard from '../../components/ArtStyleCard.jsx';

export default function GenerateArtworkPage() {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [cardContent, setCardContent] = useState({artStyles:'', description:''});

  const artStyles = [
    'Impressionism', 'Cubism', 'Surrealism', 'Abstract Expressionism',
    'Pop Art', 'Renaissance', 'Baroque', 'Minimalism', 'Art Nouveau', 'Futurism',
    'Neoclassicism', 'Op Art', 'Art Deco', 'Romanticism', 'Expressionism', 'Post-Impressionism', 
    'Dada', 'Symbolism', 'Realism', 'Constructivism'
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
    'Romanticism': ["Stormy sea with a shipwreck", "Dramatic mountain landscape", "Heroic scene with a lone figure", "Emotional depiction of a natural disaster"],
    'Neoclassicism': 'Neoclassicism is an art movement that emerged in the mid-18th century as a reaction against the ornate Rococo style. Inspired by the classical art and architecture of ancient Greece and Rome, Neoclassical artists like Jacques-Louis David and Jean-Auguste-Dominique Ingres emphasized simplicity, symmetry, and rationality. This style often features heroic subjects and moral themes, reflecting Enlightenment ideals.',
    'Op Art': 'Op Art, short for Optical Art, is a style of visual art that uses optical illusions to create the impression of movement or depth. Emerging in the 1960s, Op Art artists like Bridget Riley and Victor Vasarely used precise patterns, lines, and contrasting colors to trick the viewer\'s eye. This style explores the relationship between perception and reality, often resulting in mesmerizing, dynamic compositions.',
    'Art Deco': 'Art Deco is a decorative art style that emerged in the 1920s and 1930s, characterized by its bold geometric shapes, lavish ornamentation, and vibrant colors. Influenced by a range of sources, including Cubism and ancient Egyptian art, Art Deco artists like Tamara de Lempicka and Erté created works that convey elegance, luxury, and modernity. This style is often associated with architecture, fashion, and design.',
    'Romanticism': 'Romanticism is an artistic movement that began in the late 18th century, emphasizing emotion, imagination, and individualism. Romantic artists like Caspar David Friedrich and Eugène Delacroix depicted dramatic landscapes, historical events, and exotic subjects, often with a focus on the sublime and the transcendental. This style values personal expression and the beauty of the natural world, reacting against the rationalism of the Enlightenment.',
    'Expressionism': 'Expressionism is an early 20th-century art movement that emphasizes the expression of emotional experience rather than physical reality. Artists like Edvard Munch and Egon Schiele used bold colors, distorted forms, and exaggerated lines to convey intense feelings and moods. This style often explores themes of angst, isolation, and existential dread, reflecting the turbulent social and political climate of the time.',
    'Post-Impressionism': 'Post-Impressionism is a term used to describe the diverse range of styles that emerged in the late 19th century in response to Impressionism. Artists like Vincent van Gogh, Paul Cézanne, and Georges Seurat sought to build on Impressionism\'s innovations while emphasizing more structured forms and emotional depth. This movement paved the way for many of the avant-garde art styles of the 20th century.',
    'Dada': 'Dada is an avant-garde art movement of the early 20th century that rejected conventional aesthetics and embraced absurdity, spontaneity, and anti-bourgeois sentiment. Artists like Marcel Duchamp and Hannah Höch used collage, photomontage, and readymade objects to challenge traditional notions of art and provoke thought about the role of art in society. Dada is considered a precursor to Surrealism and other modern art movements.',
    'Symbolism': 'Symbolism is an art movement that emerged in the late 19th century, emphasizing the use of symbolic imagery to express mystical, philosophical, and emotional themes. Artists like Gustav Klimt and Odilon Redon created works that often featured dreamlike, allegorical subjects, using rich colors and intricate details to evoke a sense of mystery and otherworldliness. Symbolism seeks to convey the deeper truths hidden beneath the surface of reality.',
    'Realism': 'Realism is an art movement that began in the mid-19th century, focusing on the accurate and unembellished depiction of everyday life. Artists like Gustave Courbet and Jean-François Millet portrayed ordinary people and scenes with a commitment to truth and social commentary. Realism rejects the idealization of subjects, instead highlighting the beauty and dignity of the commonplace and the working class.',
    'Constructivism': 'Constructivism is an early 20th-century art movement that originated in Russia, emphasizing abstract, geometric forms and a focus on materiality and functionality. Artists like Vladimir Tatlin and El Lissitzky created works that often had a political and social dimension, aiming to reflect the values of the new Soviet society. Constructivism influenced architecture, graphic design, and industrial design, promoting the idea that art should serve a practical purpose.'
};


  const artStyleDescriptions = {
    'Impressionism': 'Impressionism is an art movement that originated in France in the late 19th century. Characterized by small, thin brush strokes and an emphasis on light and its changing qualities, Impressionist artists often depicted everyday scenes and landscapes. They sought to capture the momentary effects of light and color, creating a sense of immediacy and movement. Notable artists include Claude Monet, Edgar Degas, and Pierre-Auguste Renoir.',
    'Cubism': 'Cubism is a revolutionary art movement that began in the early 20th century, pioneered by Pablo Picasso and Georges Braque. This style breaks objects into geometric shapes, presenting multiple viewpoints simultaneously. Cubism challenges traditional perspectives, focusing on abstract forms rather than realistic representation. It marks a significant departure from the artistic conventions of the time, influencing a wide range of subsequent art styles.',
    'Surrealism': 'Surrealism emerged in the 1920s as a literary and artistic movement aimed at unlocking the unconscious mind. Surrealist artists like Salvador Dalí and René Magritte created dreamlike scenes with illogical juxtapositions and bizarre imagery. By exploring the irrational and the fantastical, Surrealism challenges viewers to question reality and tap into their own subconscious thoughts and feelings.',
    'Abstract Expressionism': 'Abstract Expressionism is an American post-World War II art movement that emphasizes spontaneous, automatic, or subconscious creation. Artists such as Jackson Pollock and Mark Rothko used bold brush strokes, dynamic compositions, and vivid colors to express emotion and individual expression. This style often features non-representational forms and prioritizes the process of creation itself.',
    'Pop Art': 'Pop Art is an art movement that emerged in the mid-20th century, characterized by themes and techniques drawn from popular culture. Artists like Andy Warhol and Roy Lichtenstein used imagery from advertising, comic books, and mass media, often employing bright colors and bold lines. Pop Art critiques consumerism and challenges the boundaries between high art and commercial art.',
    'Renaissance': 'The Renaissance was a period of great cultural revival and achievement in Europe, spanning the 14th to 17th centuries. Marked by a renewed interest in classical antiquity, Renaissance art emphasizes realism, proportion, and perspective. Artists such as Leonardo da Vinci, Michelangelo, and Raphael created masterpieces that embody the harmony and beauty of this era, focusing on humanism and the natural world.',
    'Baroque': 'Baroque art, which flourished in Europe from the late 16th to the early 18th century, is known for its dramatic use of light and shadow, intense emotion, and dynamic compositions. Artists like Caravaggio, Peter Paul Rubens, and Rembrandt created works that convey movement, tension, and grandeur, often with religious or mythological themes.',
    'Minimalism': 'Minimalism is an art movement that emerged in the late 1950s, focusing on simplicity and abstraction. Minimalist artists like Donald Judd and Frank Stella created works with clean lines, geometric shapes, and monochromatic palettes. This style emphasizes the idea that "less is more," stripping away extraneous details to reveal the essence of form and color.',
    'Art Nouveau': 'Art Nouveau is an ornamental art style that flourished between 1890 and 1910, characterized by its use of flowing lines, intricate patterns, and organic forms. Artists like Alphonse Mucha and Gustav Klimt often depicted natural elements such as flowers and plants, blending them with graceful, sinuous lines. Art Nouveau aims to harmonize art with the natural environment, creating a sense of elegance and sophistication.',
    'Futurism': 'Futurism is an early 20th-century art movement that originated in Italy, celebrating technology, speed, and modernity. Futurist artists like Umberto Boccioni and Giacomo Balla sought to capture the dynamism of the industrial age through vibrant colors and fragmented forms. This style reflects a fascination with the energy and movement of contemporary life, often depicting scenes of urban environments and machines.',
    'Neoclassicism': 'Neoclassicism is an art movement that emerged in the mid-18th century as a reaction against the ornate Rococo style. Inspired by the classical art and architecture of ancient Greece and Rome, Neoclassical artists like Jacques-Louis David and Jean-Auguste-Dominique Ingres emphasized simplicity, symmetry, and rationality. This style often features heroic subjects and moral themes, reflecting Enlightenment ideals.',
    'Op Art': 'Op Art, short for Optical Art, is a style of visual art that uses optical illusions to create the impression of movement or depth. Emerging in the 1960s, Op Art artists like Bridget Riley and Victor Vasarely used precise patterns, lines, and contrasting colors to trick the viewer\'s eye. This style explores the relationship between perception and reality, often resulting in mesmerizing, dynamic compositions.',
    'Art Deco': 'Art Deco is a decorative art style that emerged in the 1920s and 1930s, characterized by its bold geometric shapes, lavish ornamentation, and vibrant colors. Influenced by a range of sources, including Cubism and ancient Egyptian art, Art Deco artists like Tamara de Lempicka and Erté created works that convey elegance, luxury, and modernity. This style is often associated with architecture, fashion, and design.',
    'Romanticism': 'Romanticism is an artistic movement that began in the late 18th century, emphasizing emotion, imagination, and individualism. Romantic artists like Caspar David Friedrich and Eugène Delacroix depicted dramatic landscapes, historical events, and exotic subjects, often with a focus on the sublime and the transcendental. This style values personal expression and the beauty of the natural world, reacting against the rationalism of the Enlightenment.'
};


  const handleGenerate = async (style) => {
    try {
      const response = await axios.post('http://localhost:3001/generate-artwork', {
        keywords: prompts[style],
        style: style
      });
      setGeneratedImage(response.data.imageUrl);
      setCardContent({ artStyle: style, description: artStyleDescriptions[style] });
      setIsCardOpen(true);
    } catch (error) {
      console.error('Error generating artwork:', error);
    }
  };

  const handleRandomGenerate = async () => {
    const randomStyle = artStyles[Math.floor(Math.random() * artStyles.length)];
    setSelectedStyle(randomStyle);
    try {
      const response = await axios.post('http://localhost:3001/generate-artwork', {
        keywords: prompts[randomStyle],
        style: randomStyle
      });
      setGeneratedImage(response.data.imageUrl);
      setCardContent({ artStyle: randomStyle, description: artStyleDescriptions[randomStyle] });
      setIsCardOpen(true);
    } catch (error) {
      console.error('Error generating artwork:', error);
    }
  };

  const handleStyleChange = (event) => {
    const style = event.target.value;
    setSelectedStyle(style);
    setGeneratedImage(null);
    setIsCardOpen(false);
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
            onChange={handleStyleChange}
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

        <button
             className="main-section__surprise-button"
             onClick={handleRandomGenerate}
                                      >
              SURPRISE ME
        </button>


        <div className="artwork-placeholder">
          {generatedImage ? (
            <img src={generatedImage} alt="Generated Artwork" className="artwork-placeholder__generated" />
          ) : (
            <img src={Placeholder} alt="Artwork Placeholder" className="artwork-placeholder__image" />
          )}
        </div>
        {isCardOpen && (
          <ArtStyleCard
            artStyle={cardContent.artStyle}
            description={cardContent.description}
          />
        )}
      </main>
    </div>
  );
}
