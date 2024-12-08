// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from '@/app/Voiture/Accueil';
import Formule from '@/app/Voiture/Formule';

const VoitureAppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/order" element={<Formule />} />
      </Routes>
    </Router>
  );
};

export default VoitureAppRoutes;