'use client';

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/data/types';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { Users, Send } from 'lucide-react';
import Image from 'next/image';
import classNames from 'classnames';

// ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onAdd: (product: Product, shared: boolean[]) => void;
  onShare: (product: Product, shared: boolean[]) => void;
  onSend: (product: Product) => void;
  tableId: string; // Ajouter un identifiant de table ici
  onStartDrag: (product: Product) => void; // Fonction pour notifier le début du drag
  onEndDrag: () => void; // Fonction pour notifier la fin du drag
}

export interface ProductCardRef {
  getProductId: () => number;
  setShared: (shared: boolean[]) => void;
}

export const ProductCard = forwardRef<ProductCardRef, ProductCardProps>(({
  product,
  onAdd,
  onSend,
  onShare,
  tableId,
  onStartDrag,
  onEndDrag,
  ...props
}: ProductCardProps, ref: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [cloneVisible, setCloneVisible] = useState(false);
  const productCardRef = useRef<HTMLDivElement | null>(null);
  const cloneRef = useRef<HTMLDivElement | null>(null);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartPos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const touchDownRef = useRef(false);
  const [selectedShared, setSelectedShared] = useState<boolean[]>([tableId === "tableA", tableId === "tableB", tableId === "tableC", tableId === "tableD"]);
  const [tableIds, setTableIds] = useState<string[]>(["tableA", "tableB", "tableC", "tableD"]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchDownRef.current = true;
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current); // Clear any existing timer
    }

    // We only start drag after 1 second of touch, so delay preventDefault
    touchTimerRef.current = setTimeout(() => {
      console.log(touchDownRef.current);
      if(touchDownRef.current) {
        onStartDrag(product); // Start the drag after 1 second
        setIsDragging(true);
        setOpacity(0.5); // Apply opacity to the original card
        setCloneVisible(true); // Make the visual clone appear
        // Create a clone of the product card at the initial touch position
        const touch = event.touches[0];
        touchStartPos.current = { x: touch.clientX, y: touch.clientY };
        // event.preventDefault(); // Prevent default behavior, only after 1 second
      }
    }, 1000); // 1 second delay
  };

  // Lors du drag, vous ajoutez les données du produit dans l'événement de drag
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('product', JSON.stringify({ product, tableId }));
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && cloneRef.current) {
      const touch = event.touches[0];
      // Update the clone position based on the finger's movement
      const dx = touch.clientX - touchStartPos.current.x;
      const dy = touch.clientY - touchStartPos.current.y;
      cloneRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    touchDownRef.current = false;
    if (isDragging) {
      onEndDrag();
      setIsDragging(false);
      setOpacity(1);
      setCloneVisible(false);
  
      const productData = { product, tableId };
      let dropLocation: 'tables' | 'bin' | 'global' = 'global'; // Default to 'global'
  
      // Get the touch position
      const touch = event.changedTouches[0];
      const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
  
      if (targetElement) {
        // Check if the target is inside a Bin
        if (targetElement.closest('.bin-container')) {
          dropLocation = 'bin';
        }
        // Check if the target is inside a TableTerritory
        else if (targetElement.closest('.tableTerritoryContainer')) {
          dropLocation = 'tables';
        }
      }

      console.log("Card déposé, product data :", productData, dropLocation);
      if(dropLocation == "global") {
        onAdd(product, selectedShared);
      }
  
      // Trigger the onDrop callback with the identified location
    }
  };

  const isShared = () => {
    for(let i = 0; i < selectedShared.length; i++) {
      if(selectedShared[i] && tableId != tableIds[i]) return true;
    }
    return false;
  }

  const getSharedLabel = () => {
    let result = "";
    for(let i = 0; i < selectedShared.length; i++) {
      if(selectedShared[i] && tableId != tableIds[i]) result += tableIds[i].charAt(tableIds[i].length-1);
    }
    return result;
  }

  const getSharedPrice = () => {
    let sharedNumber = 0;
    selectedShared.forEach(shared => {
      if(shared) sharedNumber++;
    });
    return product ? product.price / sharedNumber : 0;
  }
  
  useImperativeHandle(ref, () => ({
    setShared: (shared: boolean[]) => {
      setSelectedShared(shared);
    },
    getProductId: () => {
      return product.id;
    }
  }));

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current); // Clean up any active timers on unmount
      }
    };
  }, []);

  return (
    <div
      ref={productCardRef}
      id={product.id.toString()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={handleDragStart} // Ajoutez cette ligne pour gérer le drag
      draggable // Rendre l'élément déplaçable
      {...props}
      className={styles.card}
      style={{ opacity: opacity }}
    >
      {/* Original card */}
      <div className={styles.cardImage}>
        <Image src={product.image} alt={product.name} width={56} height={40} className={styles.img} />
      </div>
      { isShared() && <Users className={styles.sharedIcon} />}
      <div className={styles.cardBody}>
        <h1 className={styles.cardTitle}>{product.name}</h1>
        <p className={styles.cardDescription}>{product.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardPriceSection}>
          <div className={classNames(styles.cardPrice, isShared() ? styles.cardOldPrice : '')}>{product.price.toFixed(2) + '€'}</div>
          { isShared() && <div className={styles.cardNewPrice}>{getSharedPrice().toFixed(2) + '€ / pers'}</div> }
        </div>
        <IconButton
          square={false}
          disabled={false}
          onClick={() => onShare(product, selectedShared)}
          className={styles.sharedButton}
        >
          { isShared() ?
            <p className={styles.sharedLabel}>{getSharedLabel()}</p>
            : <Users color={"white"} />
          }
        </IconButton>
        <IconButton
          square={false}
          disabled={false}
          onClick={() => onSend(product)}
          color='secondary'
        >
          <Send color={"white"}/>
        </IconButton>
      </div>

      {/* Visual clone of the card */}
      {cloneVisible && (
        <div
          ref={cloneRef}
          className={styles.cardClone} // Custom class to style the clone
          style={{
            position: 'fixed', // Make the clone follow the cursor around the screen
            zIndex: 1000, // Ensure it's above everything else
            pointerEvents: 'none', // Make sure clone doesn't interfere with other interactions
            transform: 'translate(0, 0)', // Initial position is the touch start position
          }}
        >
          <div className={styles.cardImage}>
            <Image src={product.image} alt={product.name} width={56} height={40} className={styles.img} />
          </div>
          { isShared() && <Users className={styles.sharedIcon} />}
          <div className={styles.cardBody}>
            <h1 className={styles.cardTitle}>{product.name}</h1>
            <p className={styles.cardDescription}>{product.description}</p>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardPriceSection}>
              <div className={classNames(styles.cardPrice, isShared() ? styles.cardOldPrice : '')}>{product.price.toFixed(2) + '€'}</div>
              { isShared() && <div className={styles.cardNewPrice}>{getSharedPrice().toFixed(2) + '€ / pers'}</div> }
            </div>
            <IconButton
              square={false}
              disabled={false}
              onClick={() => onShare(product, selectedShared)}
              className={styles.sharedButton}
            >
              { isShared() ?
                <p className={styles.sharedLabel}>{getSharedLabel()}</p>
                : <Users color={"white"} />
              }
            </IconButton>
            <IconButton
              square={false}
              disabled={false}
              onClick={() => onSend(product)}
              color='secondary'
            >
              <Send color={"white"}/>
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
});
