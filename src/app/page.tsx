'use client';

import React from 'react';
import styles from './index.module.scss';
import { TableTerritory } from '@/components/ui/TableTerritory/TableTerritory';

export default function HomePage() {

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <TableTerritory/>
        <TableTerritory/>
      </div>
      <div className={styles.bottomContainer}>
        <TableTerritory/>
        <TableTerritory/>
      </div>
    </div>
  );
}
