'use client';

import React from 'react';
import { ServerProvider } from '@/app/Voiture/ServerContext';
import { ItemsProvider } from '@/app/Voiture/ItemsContext';
import Recap from '@/app/Voiture/Recap';

const TestPage = () => {
  return (
    <ServerProvider>
      <ItemsProvider>
        <Recap></Recap>
      </ItemsProvider>
    </ServerProvider>
  );
};

export default TestPage;
