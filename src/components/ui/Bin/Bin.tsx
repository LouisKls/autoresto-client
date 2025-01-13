'use client';

import React from 'react';
import styles from './Bin.module.scss';
import { MdDelete } from 'react-icons/md'; // Importez une icône spécifique

export const Bin = () => {
  return (
    <div className={styles.binContainer}>
      <div className={styles.binIcon}>
        <MdDelete size={24} /> {/* Utilisation de l'icône */}
      </div>
    </div>
  );
};