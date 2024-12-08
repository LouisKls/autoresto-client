'use client';

import styles from './Card.module.scss';
import React, { ReactNode } from 'react';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { Plus } from 'lucide-react';

export interface CardProps {
  label: string;
  description: string;
  price: number;
  imageLink: string;
}

export const Card = ({
  label,
  description,
  price,
  imageLink,
  ...props
}: CardProps) => {
  return (
    <div {...props} className={styles.card}>
      <div className={styles.cardImage}>
        <img src={imageLink}/>
      </div>
      <div className={styles.cardBody}>
        <h1 className={styles.cardTitle}>{label}</h1>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardPrice}>{price.toFixed(2) + '€'}</div>
        <IconButton
          square={false}
          disabled={false}
          onClick={() => {}}
        >
          <Plus color={"white"} />
        </IconButton>
      </div>
    </div>
  );
};
