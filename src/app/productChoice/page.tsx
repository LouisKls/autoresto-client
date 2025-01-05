'use client';

import React from 'react';
import ProductChoice, { PRODUCT_TYPE } from '@/app/Voiture/ProductChoice';
import { useSearchParams } from 'next/navigation';

const TestPage = () => {
  const searchParams = useSearchParams();
  const queryProductType = searchParams.get('productType');
  const productType = queryProductType
    ? parseInt(queryProductType, 10) as PRODUCT_TYPE
    : PRODUCT_TYPE.ENTREE;

  return (
      <ProductChoice productType={productType}></ProductChoice>
  );
};

export default TestPage;
