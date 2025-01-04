'use client';

import React from 'react';
import { ServerProvider } from '@/app/Voiture/ServerContext';
import ProductChoice, { PRODUCT_TYPE } from '@/app/Voiture/ProductChoice';
import { ItemsProvider } from '@/app/Voiture/ItemsContext';
import ReservationComponent from '@/app/Voiture/ReservationHour';

const TestPage = () => {
  return (
    <ServerProvider>
      <ItemsProvider>
       <ReservationComponent></ReservationComponent>
      </ItemsProvider>
    </ServerProvider>
  );
};

export default TestPage;
