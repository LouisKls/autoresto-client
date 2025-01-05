'use client';

import React from 'react';
import { ServerProvider } from '@/app/Voiture/ServerContext';
import Accueil from '@/app/Voiture/Accueil';

const TestPage = () => {
  return (
    <ServerProvider>
      <Accueil></Accueil>
    </ServerProvider>
  );
};

export default TestPage;
