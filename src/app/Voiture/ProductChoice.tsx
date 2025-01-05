import React from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { useItems } from './ItemsContext';
import { Product } from '@/data/types';
import { useServer } from '@/app/Voiture/ServerContext';

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

const defaultSelectedItems: Product[] = [
  {
    id: 1,
    name: 'Salade César',
    description: 'Salade romaine, poulet, croûtons, sauce César',
    price: 8.5,
    image: '/images/viande.png'
  },
  {
    id: 1,
    name: 'Salade César',
    description: 'Salade romaine, poulet, croûtons, sauce César',
    price: 8.5,
    image: '/images/viande.png'
  },
  {
    id: 2,
    name: 'Côte de boeuf',
    description: 'Côte de boeuf grillée, sauce au poivre',
    price: 18,
    image: '/images/cote-boeuf.png'
  },
  {
    id: 3,
    name: 'Fondant au chocolat',
    description: 'Cœur coulant, chocolat noir',
    price: 6,
    image: '/images/viande.png'
  }
];

const ProductChoice: React.FC<Props> = ({ productType }) => {

  const { selectedItems } = useServer();
  const { itemOrder, setItemOrder } = useServer();


  const handleAddToOrder = (item: Product) => {
    setItemOrder([...itemOrder, item]);
  };

  const handleCancel = () => {
    if (itemOrder.length > 0) {
      const updatedOrder = itemOrder.slice(0, -1);
      setItemOrder(updatedOrder);
      console.log(itemOrder);
    } else {
      console.log('La commande est déjà vide !');
    }
  };


  return (
    <div style={styles.container}>
      <ExitCarModeComponent />
      <h1 style={styles.title}>{getProductTypeString(productType)}</h1>

      <div style={styles.items}>
        {selectedItems.map((item, index) => (
          <button key={index} style={styles.item}>
            <img
              src={item.image || 'https://via.placeholder.com/50'}
              alt={item.name}
              style={styles.image}
              onClick={() => handleAddToOrder(item)}
            />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div style={styles.actions}>
        <button style={styles.actionButton}>AUTRES</button>
        <button style={styles.backButton} onClick={() => handleCancel()}>ANNULER DERNIER ARTICLE</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    textAlign: 'center',
    height: '100vh',
    width: '100%'
  },
  quitButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  category: {
    marginBottom: '20px',
    width: '100%'
  },
  categoryButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '15px 30px',
    fontSize: '16px',
    borderRadius: '5px',
    width: '100%'
  },
  items: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    //height: '100%',
    gap: '20px',
    marginBottom: '20px'
  },
  item: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '15px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: '50px',
    height: '50px',
    marginBottom: '10px'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '8px'
  },
  actionButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1
  },
  backButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1
  }
};

export default ProductChoice;