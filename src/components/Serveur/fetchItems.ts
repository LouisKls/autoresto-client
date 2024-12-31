import React from 'react';

export const fetchItems = async (
  setData: React.Dispatch<React.SetStateAction<any>>,
  setItems: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const response = await fetch('/items/items.json');
    const data = await response.json();
    setData(data);

    // Merge items from all categories into a single array
    const allItems = [
      ...data.items.entrees,
      ...data.items.plats,
      ...data.items.desserts,
      ...data.items.boissons
    ];

    console.log('allItems : ', allItems);

    setItems(allItems); // Update state with the merged array of items
  } catch (error) {
    console.error('Erreur lors du chargement des items :', error);
  }
};