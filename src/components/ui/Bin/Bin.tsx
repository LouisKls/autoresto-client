'use client';

import React from 'react';
import styles from './Bin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TableTerritory } from '@/components/ui/TableTerritory/TableTerritory';

export const Bin = () => {
  return (
    <div className={styles.binContainer}>
      <div className={styles.binIcon}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};