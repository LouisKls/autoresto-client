import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import CategoryTabs from '@components/ui/CategoryTabs/CategoryTabs';
import SubcategoryCarousel from '@components/ui/SubcategoryCarousel/SubcategoryCarousel';
import { ProductCard, ProductCardRef } from '@components/ui/ProductCard/ProductCard';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { X } from 'lucide-react';
import { CATEGORIES, SUBCATEGORIES, PRODUCTS } from '@/data/data';
import { CartItem, Product } from '@/data/types';
import classNames from 'classnames';
import { Button } from '@components/ui/Button/Button';

import styles from './TableTerritory.module.scss';
import RightCart from '../RightCart/RightCart';

export interface TableTerritoryProps {
  tableId: string;
  reverse?: boolean;
  onAddCard: (product: Product, shared: boolean[]) => void;
  onRemoveCard: (product: Product, shared: boolean[]) => void;
}

export interface TableTerritoryRef {
  addToCart: (product: Product, shared: boolean[]) => void;
  removeFromCart: (product: Product) => void;
}

export const TableTerritory = forwardRef<TableTerritoryRef, TableTerritoryProps>(({ tableId, reverse, onAddCard, onRemoveCard }, ref) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('plats');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('viandes');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDragging, setIsDragging] = useState(false); // State to track dragging status
  const [share, setShare] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [selectedShared, setSelectedShared] = useState<boolean[]>([false, false, false, false]);
  const cardRefs = useRef<ProductCardRef[]>([]);

  useImperativeHandle(ref, () => ({
    addToCart: (product: Product, shared: boolean[]) => {
      addToCart(product, shared);
    },
    removeFromCart: (product: Product) => {
      removeFromCart(product);
    }
  }));

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

  const handleAddToCart = (product: Product, shared: boolean[]) => {
    onAddCard(product, shared);
  };

  const addToCart = (product: Product, shared: boolean[]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, shared }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1, shared }];
      }
    });
  }

  const handleRemoveFromCart = (product: Product, shared: boolean[]) => {
    onRemoveCard(product, shared);
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== product.id));
  }

  const handleStartDrag = (product: Product) => {
    setIsDragging(true);
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  };

  const handleEndDrag = () => {
    setIsDragging(false);
    // Re-enable scrolling
    document.body.style.overflow = '';
  };

  const handleShare = (product: Product, shared: boolean[]) => {
    setSelectedShared(shared);
    setCurrentProduct(product);
    setShare(true);
  };

  const handleSend = (product: Product) => {
    setCurrentProduct(product);
    setSend(true);
  };

  const closeModale = () => {
    setShare(false);
    setSend(false);
  }

  const handleSelectShare = (index: number) => {
    setSelectedShared((prevState) => {
      const newState = [...prevState]; 
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleConfirmShare = () => {
    const cardRef = cardRefs.current.find(ref => ref.getProductId() === currentProduct?.id);
    if (cardRef) {
      cardRef.setShared(selectedShared);
    } else {
      console.log("Child not found");
    }
    closeModale();
  }

  const addToCardRefs = (el: any) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const getSharedPrice = () => {
    let sharedNumber = 0;
    selectedShared.forEach(shared => {
      if(shared) sharedNumber++;
    });
    return currentProduct ? currentProduct.price / sharedNumber : 0;
  }

  return (
    <div className={styles.tableTerritoryContainer}>
      {reverse && <RightCart cart={cart} onRemoveItem={handleRemoveFromCart} tableId={tableId} className={(share || send) ? styles.modaleOpenned : ''}/>}
      <div className={[
        styles.selectionContainer,
        (share || send) ? styles.modaleOpenned : '',
      ].join(' ')}>
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
            visibleCount={50}
          />
        )}
        <div
          className={styles.productsGrid}
          style={{ overflow: isDragging ? 'hidden' : 'auto' }} // Disable scrolling during drag
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              ref={addToCardRefs}
              product={product}
              onAdd={handleAddToCart}
              onShare={handleShare}
              onSend={handleSend}
              tableId={tableId}
              onStartDrag={handleStartDrag}
              onEndDrag={handleEndDrag}
            />
          ))}
        </div>
      </div>
      {!reverse && <RightCart cart={cart} onRemoveItem={handleRemoveFromCart} tableId={tableId} className={(share || send) ? styles.modaleOpenned : ''}/>}
      {(share || send) && <div className={styles.modale}>
          <div className={styles.modaleContent}>
            <IconButton
              square={false}
              disabled={false}
              onClick={() => closeModale()}
              color='grey'
              className={styles.closeButton}
            >
              <X color={"white"}/>
            </IconButton>
            {share && <div className={classNames(styles.modaleBody, styles.shareBody)}>
              <div className={styles.modaleHeader}>
                <h1>Partager un plat</h1>
                <h2>{currentProduct?.name}</h2>
              </div>
              <div className={styles.shareZone}>
                <Button variant={'contained'} onClick={tableId === "tableA" ? () => {} : () => {handleSelectShare(0)}} color={selectedShared[0] ? 'primary' : 'grey'} thin className={styles.sharedButton}>
                  {tableId === "tableA" ? "Vous" : "A"}
                </Button>
                <Button variant={'contained'} onClick={tableId === "tableB" ? () => {} : () => {handleSelectShare(1)}} color={selectedShared[1] ? 'primary' : 'grey'} thin className={styles.sharedButton}>
                  {tableId === "tableB" ? "Vous" : "B"}
                </Button>
                <Button variant={'contained'} onClick={tableId === "tableC" ? () => {} : () => {handleSelectShare(2)}} color={selectedShared[2] ? 'primary' : 'grey'} thin className={styles.sharedButton}>
                  {tableId === "tableC" ? "Vous" : "C"}
                </Button>
                <Button variant={'contained'} onClick={tableId === "tableD" ? () => {} : () => {handleSelectShare(3)}} color={selectedShared[3] ? 'primary' : 'grey'} thin className={styles.sharedButton}>
                  {tableId === "tableD" ? "Vous" : "D"}
                </Button>
              </div>
              <div className={styles.priceLine}>
                <p className={styles.oldPrice}>{currentProduct?.price.toFixed(2) + '€'}</p>
                <p>soit</p>
                <p className={styles.newPrice}>{getSharedPrice().toFixed(2) + '€'}</p>
                <p>/ personne</p>
              </div>
              <Button variant={'contained'} onClick={handleConfirmShare} color={'success'} thin>
                  Confirmer
              </Button>
            </div>}
            {send && <div className={classNames(styles.modaleBody, styles.sendBody)}>
              <h1>Send</h1>
            </div>}
          </div>
      </div>}
    </div>
  );
});
