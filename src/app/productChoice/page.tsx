'use client';

import React from 'react';
import { ServerProvider } from '@/app/Voiture/ServerContext';
import ProductChoice from '@/app/Voiture/ProductChoice';
import { PRODUCT_TYPE } from '@/app/Voiture/Formule';
import { ItemsProvider } from '@/app/Voiture/ItemsContext';

const TestPage = () => {
  return (
    <ServerProvider>
      <ItemsProvider>
        {/* Vos autres composants */}
        <ProductChoice productType={PRODUCT_TYPE.ENTREE} />
        {/* Le composant qui gère la partie vocale */}
      </ItemsProvider>
    </ServerProvider>
  );
};

export default TestPage;
