'use client';

import React from 'react';
import Accueil from '@/app/Voiture/Accueil';
import ServerProvider from '@/app/Voiture/ServerContext';

const TestPage = () => {
  return (
    <ServerProvider>
      <Accueil></Accueil>
    </ServerProvider>
  );
};

export default TestPage;
