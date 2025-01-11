'use client';

import React from 'react';
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
}

export const ProductCard = ({
  product,
  onAdd,
  tableId, // Récupérer l'identifiant de la table
  ...props
}: ProductCardProps) => {

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const data = { product, tableId }; // Ajouter la table d'origine
    event.dataTransfer.setData('product', JSON.stringify(data)); 
    event.currentTarget.classList.add(styles.dragging);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    // Retirer la classe "dragging" lorsque le drag se termine
    event.currentTarget.classList.remove(styles.dragging);
  };

  return (
    <div
      id={product.id.toString()}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      {...props}
      className={styles.card}
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
  );
};