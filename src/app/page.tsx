'use client';

import React from 'react';
import styles from './index.module.scss';
import { TableTerritory } from '@/components/ui/TableTerritory/TableTerritory';
import { ShoppingCart } from 'lucide-react';
import { Bin } from '@/components/ui/Bin/Bin'; 
import { Label } from '@/components/ui/Label/Label';

export default function HomePage() {

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => { 
      event.preventDefault();
  }
  
  return (
    <div 
      onDragOver={enableDropping}  
      className={styles.pageContainer}
    >
      <div      
        className={styles.topContainer}>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableB" />
        </div>

        <div 
          onDragOver={enableDropping}  
          className="bin-container"
        >
          <Bin/>
        </div>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableA" />
        </div>

      </div>

      <div
        className={styles.cart}
      >
        <h2 className={styles.tableNameA}>A</h2>
        <h2 className={styles.tableNameC}>C</h2>

        <ShoppingCart size={70}/>

        <h2 className={styles.tableNameB}>B</h2>
        <h2 className={styles.tableNameD}>D</h2>
      </div>

      <div      
        className={styles.bottomContainer}>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableC" />
        </div>

        <div 
          onDragOver={enableDropping}   
          className="bin-container"
        >
          <Bin/>
        </div>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableD" />
        </div>

      </div>
    </div>
  );
}