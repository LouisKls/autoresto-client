import React from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { FORMULES, PRODUCT_TYPE } from '@/app/Voiture/Formule';

interface props {
  chosenFormule: FORMULES; // pour savoir quelle formule afficher en haut de la page
  productType: PRODUCT_TYPE; // va permettre de savoir le titre de la page + quels produits récupérer quand on clique sur "autres"
}

const ProductChoice: React.FC<props> = () => {
  return (
    <div style={styles.container}>
      <ExitCarModeComponent />
      <h1 style={styles.title}>Entrée</h1>

      <div style={styles.category}>
        <button style={styles.categoryButton}>Entrée / Plat / Dessert</button>
      </div>

      <div style={styles.items}>
        <button style={styles.item}>
          <img
            src="https://via.placeholder.com/50"
            alt="Salade Grec"
            style={styles.image}
          />
          <span>Salade Grec</span>
        </button>

        <button style={styles.item}>
          <img
            src="https://via.placeholder.com/50"
            alt="Falafels"
            style={styles.image}
          />
          <span>Falafels</span>
        </button>

        <button style={styles.item}>
          <img
            src="https://via.placeholder.com/50"
            alt="Soupe Turc"
            style={styles.image}
          />
          <span>Soupe Turc</span>
        </button>

        <button style={styles.item}>
          <img
            src="https://via.placeholder.com/50"
            alt="Onigiri"
            style={styles.image}
          />
          <span>Onigiri</span>
        </button>
      </div>

      <div style={styles.actions}>
        <button style={styles.actionButton}>AUTRES</button>
        <button style={styles.backButton}>RETOUR</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    textAlign: 'center',
    height: '100vh'
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
    marginBottom: '20px'
  },
  categoryButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '15px 30px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  items: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100%',
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
