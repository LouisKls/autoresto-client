import React, { useState } from 'react';
import CategoryTabs from '@components/ui/CategoryTabs/CategoryTabs';
import SubcategoryCarousel from '@components/ui/SubcategoryCarousel/SubcategoryCarousel';
import { ProductCard } from '@components/ui/ProductCard/ProductCard';

import { CATEGORIES, SUBCATEGORIES, PRODUCTS } from '@/data/data';
import { CartItem, Product } from '@/data/types';

import styles from './TableTerritory.module.scss';
import RightCart from '../RightCart/RightCart';

export const TableTerritory = ({ tableId }: { tableId: string }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('plats');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('viandes');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const defaultSubcat = SUBCATEGORIES[catId]?.[0]?.id;
    setSelectedSubcategory(defaultSubcat || '');
  };

  const handleSelectSubcategory = (subcatId: string) => {
    setSelectedSubcategory(subcatId);
  };

  const filteredProducts: Product[] = (() => {
    if (!selectedCategory || !selectedSubcategory) return [];
    const categoryProducts = PRODUCTS[selectedCategory];
    if (!categoryProducts) return [];
    return categoryProducts[selectedSubcategory] || [];
  })();

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  return (
    <div 
      className={styles.tableTerritoryContainer}
    >
      <div className={styles.selectionContainer}>
        <CategoryTabs
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        {SUBCATEGORIES[selectedCategory] && (
          <SubcategoryCarousel
            subcategories={SUBCATEGORIES[selectedCategory]}
            selectedSubcategory={selectedSubcategory}
            onSelectSubcategory={handleSelectSubcategory}
            visibleCount={5}
          />
        )}
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
              tableId={tableId}
            />
          ))}
        </div>
      </div>
      <RightCart cart={cart} onRemoveItem={handleRemoveFromCart} />
    </div>
  );
};