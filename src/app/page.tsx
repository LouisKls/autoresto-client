'use client';

import React, { useRef } from 'react';
import styles from './index.module.scss';
import { TableTerritory, TableTerritoryRef } from '@/components/ui/TableTerritory/TableTerritory';
import { ShoppingCart } from 'lucide-react';
import { Bin } from '@/components/ui/Bin/Bin'; 
import { Label } from '@/components/ui/Label/Label';
import { Product } from '@/data/types';

export default function HomePage() {

  const tableA = useRef<TableTerritoryRef>(null);
  const tableB = useRef<TableTerritoryRef>(null);
  const tableC = useRef<TableTerritoryRef>(null);
  const tableD = useRef<TableTerritoryRef>(null);

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => { 
      event.preventDefault();
  }

  const handleAddCard = (product: Product, shared: boolean[]) => {
    if(shared[0] && tableA.current) tableA.current.addToCart(product, shared);
    if(shared[1] && tableB.current) tableB.current.addToCart(product, shared);
    if(shared[2] && tableC.current) tableC.current.addToCart(product, shared);
    if(shared[3] && tableD.current) tableD.current.addToCart(product, shared);
  }

  const handleRemoveCard = (product: Product, shared: boolean[]) => {
    if(shared[0] && tableA.current) tableA.current.removeFromCart(product);
    if(shared[1] && tableB.current) tableB.current.removeFromCart(product);
    if(shared[2] && tableC.current) tableC.current.removeFromCart(product);
    if(shared[3] && tableD.current) tableD.current.removeFromCart(product);
  }
  
  return (
    <div 
      onDragOver={enableDropping}  
      className={styles.pageContainer}
    >
      <div      
        className={styles.topContainer}>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableC" onAddCard={handleAddCard} onRemoveCard={handleRemoveCard} ref={tableC}/>
        </div>

        <div 
          onDragOver={enableDropping}  
          className="bin-container"
        >
          <Bin/>
        </div>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableD" reverse={true} onAddCard={handleAddCard} onRemoveCard={handleRemoveCard} ref={tableD}/>
        </div>

      </div>

      <div
        className={styles.cart}
      >
        <h2 className={styles.tableNameA}>A</h2>
        <h2 className={styles.tableNameC}>C</h2>
        <h2 className={styles.tableNameB}>B</h2>
        <h2 className={styles.tableNameD}>D</h2>

        <ShoppingCart size={70}/>
      </div>

      <div      
        className={styles.bottomContainer}>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableA" onAddCard={handleAddCard} onRemoveCard={handleRemoveCard} ref={tableA}/>
        </div>

        <div 
          onDragOver={enableDropping}   
          className="bin-container"
        >
          <Bin/>
        </div>

        <div className={`${styles.tables} tableTerritoryContainer`}>
          <TableTerritory tableId="tableB" reverse={true} onAddCard={handleAddCard} onRemoveCard={handleRemoveCard} ref={tableB}/>
        </div>

      </div>
    </div>
  );
}