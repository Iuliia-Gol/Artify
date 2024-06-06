import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import DiscoverNowPage from './pages/DiscoverNowPage/DiscoverNowPage';
import GenerateArtworkPage from './pages/GenerateArtworkPage/GenerateArtworkPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/discover-now' element={<DiscoverNowPage />} />
        <Route path='/generate-artwork' element={<GenerateArtworkPage />} />
      </Routes>
    </Router>
  );
}

export default App;