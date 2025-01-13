'use client';

import React from 'react';
import styles from './Bin.module.scss';
import { Trash2 } from 'lucide-react';

export const Bin = () => {
  return (
    <div className={styles.binContainer}>
      <div className={styles.binIcon}>
        <Trash2 size={70}/>
      </div>
    </div>
  );
};