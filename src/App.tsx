import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';
import FinalPage from './pages/FinalPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shadow-realm" element={<SecondPage />} />
        <Route path="/mirror-dimension" element={<ThirdPage />} />
        <Route path="/final-truth" element={<FinalPage />} />
        <Route path="/revelation" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;