import React, { useState, useRef, useEffect } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/data/types';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { Plus } from 'lucide-react';
import Image from 'next/image';

// ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  tableId: string; // Ajouter un identifiant de table ici
  onStartDrag: (product: Product) => void; // Fonction pour notifier le début du drag
  onEndDrag: () => void; // Fonction pour notifier la fin du drag
}

export const ProductCard = ({
  product,
  onAdd,
  tableId,
  onStartDrag,
  onEndDrag,
  ...props
}: ProductCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [cloneVisible, setCloneVisible] = useState(false);
  const productCardRef = useRef<HTMLDivElement | null>(null);
  const cloneRef = useRef<HTMLDivElement | null>(null);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartPos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current); // Clear any existing timer
    }

    // We only start drag after 1 second of touch, so delay preventDefault
    touchTimerRef.current = setTimeout(() => {
      onStartDrag(product); // Start the drag after 1 second
      setIsDragging(true);
      setOpacity(0.5); // Apply opacity to the original card
      setCloneVisible(true); // Make the visual clone appear
      // Create a clone of the product card at the initial touch position
      const touch = event.touches[0];
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };
      event.preventDefault(); // Prevent default behavior, only after 1 second
    }, 1000); // 1 second delay
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
    if (isDragging) {
      onEndDrag(); // End the drag
      setIsDragging(false);
      setOpacity(1); // Reset opacity
      setCloneVisible(false); // Hide the clone

      // Call handleDrop after drag ends
      const productData = { product, tableId };
      event.preventDefault(); // Prevent the default action only if necessary
    }
  };

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
      {...props}
      className={styles.card}
      style={{ opacity: opacity }}
    >
      {/* Original card */}
      <div className={styles.cardImage}>
        <Image src={product.image} alt={product.name} width={56} height={40} className={styles.img} />
      </div>
      <div className={styles.cardBody}>
        <h1 className={styles.cardTitle}>{product.name}</h1>
        <p className={styles.cardDescription}>{product.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardPrice}>{product.price.toFixed(2) + '€'}</div>
        <IconButton
          square={false}
          disabled={false}
          onClick={() => onAdd(product)}
        >
          <Plus color={"white"} />
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
          <div className={styles.cardBody}>
            <h1 className={styles.cardTitle}>{product.name}</h1>
            <p className={styles.cardDescription}>{product.description}</p>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.cardPrice}>{product.price.toFixed(2) + '€'}</div>
            <IconButton
              square={false}
              disabled={false}
              onClick={() => onAdd(product)}
            >
              <Plus color={"white"} />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};