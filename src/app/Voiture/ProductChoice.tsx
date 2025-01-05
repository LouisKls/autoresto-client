import React, { useEffect, useState } from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { CartItem, Product } from '@/data/types';
import { useServer } from '@/app/Voiture/ServerContext';
import styles from './Accueil.module.scss';
import RightCart from '@/components/ui/RightCart/RightCart';

export enum PRODUCT_TYPE {
  ENTREE,
  PLAT,
  DESSERT,
  BOISSON
}

export function getProductTypeString(product_type: PRODUCT_TYPE): string {
  switch (product_type) {
    case PRODUCT_TYPE.ENTREE:
      return 'Entrées';
    case PRODUCT_TYPE.PLAT:
      return 'Plats';
    case PRODUCT_TYPE.DESSERT:
      return 'Desserts';
    case PRODUCT_TYPE.BOISSON:
      return 'Boissons';
  }
}

interface Props {
  productType: PRODUCT_TYPE;
}

const ProductChoice: React.FC<Props> = ({ productType }) => {
  const {
    selectedItems,
    itemOrder, 
    setItemOrder,
    isSpeaking,
    isListening
  } = useServer();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToOrder = (item: Product) => {
    setItemOrder([...itemOrder, item]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: number) => {
    const newOrder = itemOrder.filter(item => item.id !== productId);
    setItemOrder(newOrder);
  };

  const isMobile = windowWidth <= 768;

  const cartItems = itemOrder.map(product => ({ product, quantity: 1 })) as CartItem[];

  return (
    <div style={containerStyle}>
      <ExitCarModeComponent containerWidth="90%" />
      
      <div style={statusContainer}>
        {isSpeaking && (
          <div style={statusIndicator} className={styles.statusIndicator}>
            🔊 Le serveur parle...
          </div>
        )}
        {isListening && (
          <div style={statusIndicator} className={styles.statusIndicator}>
            🎤 En écoute...
          </div>
        )}
      </div>

      <div style={headerContainer}>
        <h1 style={title}>{getProductTypeString(productType)}</h1>
        <p style={subtitle}>Sélectionnez un plat ou utilisez les commandes vocales</p>
      </div>

      <div style={itemsGrid}>
        {selectedItems.map((item, index) => (
          <button 
            key={index} 
            style={itemCard} 
            className={styles.orderButton}
            onClick={() => handleAddToOrder(item)}
          >
            <div style={itemInfo}>
              <span style={itemName}>{item.name}</span>
              <span style={itemPrice}>{item.price.toFixed(2)} €</span>
            </div>
          </button>
        ))}
      </div>

      <div style={instructionsContainer}>
        <div style={instructionBox} className={styles.instructionBox}>
          <span style={instructionIcon}>🔄</span>
          <span style={instructionText}>Dites "Autres" pour voir d'autres choix</span>
        </div>
        <div style={instructionBox} className={styles.instructionBox}>
          <span style={instructionIcon}>❌</span>
          <span style={instructionText}>Dites "Annuler" pour supprimer le dernier article</span>
        </div>
      </div>

      {isCartOpen && (
        <div style={{
          ...cartOverlay,
          width: isMobile ? '100%' : '400px'
        }}>
          <RightCart
            onClose={() => setIsCartOpen(false)}
            cart={itemOrder.length > 0 ? cartItems : undefined}
            onRemoveItem={handleRemoveFromCart}
          />
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: '20px',
  position: 'relative'
};

const statusContainer: React.CSSProperties = {
  width: '90%',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  gap: '10px'
};

const statusIndicator: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '20px',
  fontSize: '18px'
};

const headerContainer: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
  width: '90%'
};

const title: React.CSSProperties = {
  fontSize: '28px',
  color: '#1976d2',
  marginBottom: '8px'
};

const subtitle: React.CSSProperties = {
  fontSize: '16px',
  color: '#666'
};

const itemsGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '15px',
  width: '90%',
  marginBottom: '20px'
};

const itemCard: React.CSSProperties = {
  backgroundColor: 'white',
  border: 'none',
  borderRadius: '10px',
  padding: '12px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease',
  minHeight: '80px'
};

const itemInfo: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
  padding: '8px'
};

const itemName: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center'
};

const itemPrice: React.CSSProperties = {
  fontSize: '14px',
  color: '#1976d2',
  fontWeight: 'bold'
};

const instructionsContainer: React.CSSProperties = {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const instructionBox: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '12px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
};

const instructionIcon: React.CSSProperties = {
  fontSize: '20px'
};

const instructionText: React.CSSProperties = {
  fontSize: '14px',
  color: '#333'
};

const cartOverlay: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
  boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
  zIndex: 1000
};

export default ProductChoice;