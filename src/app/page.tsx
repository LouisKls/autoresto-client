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
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, type: string) => {
    event.preventDefault();
  
    // Vérifiez si l'événement provient d'une table
    if (type === "global") {
      console.log("Dépôt la zone d'achat, ajout du produit à la table X");
      return;
    }else if (type === "tables") {
      console.log("Dépôt sur une table, il ne se passe rien");
      return;
    }else if (type === "bin") {
      console.log("Dépôt sur une poubelle, suppression du produit de la liste");
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
        className={styles.topContainer}>

        <div 
          onDragOver={enableDropping}  
          onDrop={(event) => {
            event.stopPropagation();
            handleDrop(event, "tables");
          }} 
          className={styles.tables}
        >
          <TableTerritory tableId="tableA" />
        </div>

        <div 
          onDragOver={enableDropping}  
          onDrop={(event) => {
            event.stopPropagation();
            handleDrop(event, "bin");
          }}  
        >
          <Bin/>
        </div>

        <div 
          onDragOver={enableDropping}  
          onDrop={(event) => {
            event.stopPropagation();
            handleDrop(event, "tables");
          }}  
          className={styles.tables}
        >
          <TableTerritory tableId="tableB" />
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

        <div 
          onDragOver={enableDropping}  
          onDrop={(event) => {
            event.stopPropagation();
            handleDrop(event, "tables");
          }} 
          className={styles.tables}
        >
          <TableTerritory tableId="tableC" />
        </div>

        <div 
          onDragOver={enableDropping}  
          onDrop={(event) => {
            event.stopPropagation();
            handleDrop(event, "bin");
          }}  
        >
          <Bin/>
        </div>

        <div 
          onDragOver={enableDropping}  
          onDrop={(event) => {
            event.stopPropagation();
            handleDrop(event, "tables");
          }}  
          className={styles.tables}
        >
          <TableTerritory tableId="tableD" />
        </div>

      </div>
    </div>
  );
}