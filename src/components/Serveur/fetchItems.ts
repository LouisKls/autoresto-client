import { PRODUCTS } from '@/data/data';
import React from 'react';
import { Product } from '@/data/types';

export const fetchItems = async (
  setData: React.Dispatch<React.SetStateAction<any>>,
  setItems: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const data = PRODUCTS;
    setData(data);

    // Automatiser la fusion des items
    const allItems: Product[] = Object.values(data).flatMap((subcategories) =>
      Object.values(subcategories).flat()
    );

    console.log('allItems : ', allItems);

    setItems(allItems); // Met à jour l'état avec tous les items fusionnés
  } catch (error) {
    console.error('Erreur lors du chargement des items :', error);
  }
};
