import React, { createContext, useContext, useState } from 'react';
import { Item } from '@components/Serveur/types';

interface ItemsContextType {
  selectedItems: Item[];
  setSelectedItems: (items: Item[]) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  return (
    <ItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};