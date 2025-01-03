'use client';

import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/data/types';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onAdd,
  ...props
}: ProductCardProps) => {
  return (
    <div {...props} className={styles.card}>
      <div className={styles.cardImage}>
        <Image src={product.image} alt={product.name} width={140} height={100} className={styles.img}/>
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
