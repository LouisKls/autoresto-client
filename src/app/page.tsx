'use client';

import React from 'react';
import styles from './index.module.scss';
import { TableTerritory } from '@/components/ui/TableTerritory/TableTerritory';

export default function HomePage() {

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => { 
      event.preventDefault();
  }
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, type: string) => {
    event.preventDefault();
  
    // Vérifiez si l'événement provient d'une table
    if (type === "global") {
      console.log("Dépôt la zone d'achat, ajout du produit à la table X");
      return;
    }else if (type === "tables") {
      console.log("Dépôt sur une table, il ne se passe rien");
      return;
    }
  
    const productData = event.dataTransfer.getData('product');
    const { product, tableId } = productData ? JSON.parse(productData) : { product: null, tableId: null };
  
    if (product && tableId) {
      console.log("Ajouter le produit à la table:", tableId);
    }
  };
    


  return (
    <div 
      onDragOver={enableDropping}  
      onDrop={(event) => handleDrop(event, "global")}
      className={styles.pageContainer}
    >
      <div 
        onDragOver={enableDropping}  
        onDrop={(event) => {
          event.stopPropagation();
          handleDrop(event, "tables");
        }}
        className={styles.topContainer}
      >
        <TableTerritory tableId="tableA" />
        <TableTerritory tableId="tableB" />
      </div>
      <div 
        onDragOver={enableDropping}  
        onDrop={(event) => {
          event.stopPropagation();
          handleDrop(event, "tables");
        }}        
        className={styles.bottomContainer}>
        <TableTerritory tableId="tableC" />
        <TableTerritory tableId="tableD" />
      </div>
    </div>
  );
}