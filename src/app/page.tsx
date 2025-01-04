'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../components/ui/Layout/Layout';
import CategoryTabs from '@components/ui/CategoryTabs/CategoryTabs';
import SubcategoryCarousel from '@components/ui/SubcategoryCarousel/SubcategoryCarousel';
import { ProductCard } from '@components/ui/ProductCard/ProductCard';
import { ListBox } from '@components/ui/ListBox/ListBox';

import { CATEGORIES, SUBCATEGORIES, PRODUCTS } from '@/data/data';
import { CartItem, Product } from '@/data/types';

import styles from './index.module.scss';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('plats');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('viandes');
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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

  const options = SUBCATEGORIES[selectedCategory].map((subcategory) => ({
    id: subcategory.id,
    label: subcategory.label,
  }));

  var mobile = windowSize[0] < 550;
  return (
    <Layout cart={cart} onRemoveItem={handleRemoveFromCart} mobile={mobile}>
      {!mobile && <CategoryTabs
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        mobile={true}
      />}

      {SUBCATEGORIES[selectedCategory] && mobile ? (
        <div className={styles.subcategoryListBoxContainer}>
          <div className={styles.subcategoryListBoxWrapper}>
            <ListBox 
              options={options}
              selectedValue= {selectedSubcategory}
              onChange={handleSelectSubcategory}
            />
          </div>
        </div>
      ) : (
        <SubcategoryCarousel
          subcategories={SUBCATEGORIES[selectedCategory]}
          selectedSubcategory={selectedSubcategory}
          onSelectSubcategory={handleSelectSubcategory}
          visibleCount={8}
        />
      )}

      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
        ))}
      </div>

      {mobile && <CategoryTabs
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        mobile={true}
      />}
    </Layout>
  );
}
