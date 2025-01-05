'use client';

import React from 'react';
import { ServerProvider } from '@/app/Voiture/ServerContext';
import ProductChoice, { PRODUCT_TYPE } from '@/app/Voiture/ProductChoice';
import { ItemsProvider } from '@/app/Voiture/ItemsContext';

const TestPage = () => {
  return (
    <ServerProvider>
      <ItemsProvider>
        <ProductChoice productType={PRODUCT_TYPE.ENTREE}></ProductChoice>
      </ItemsProvider>
    </ServerProvider>
  );
};

export default TestPage;
