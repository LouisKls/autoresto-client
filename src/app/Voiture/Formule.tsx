'use client';

import React from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';

export enum FORMULES {
  EPD, // Entrée, plat, dessert
  EP, // Entrée, plat
  PD // Plat, dessert
}

export enum PRODUCT_TYPE {
  ENTREE,
  PLAT,
  DESSERT
}

const Formule = () => {

  //const navigate = useNavigate(); // Hook pour la navigation

  const handleOrder = (route: string) => {
    // Navigue vers la page de commande
    //navigate(route);
    console.log(route);
  };

  return (
    <div style={container}>
      <div style={userTalk}> {/* TODO : style this to display conditionally a wave effect when user is talking */}
        <span style={barcode}></span>
      </div>
      <ExitCarModeComponent />
      <div style={containerContent}> { /* TODO : PROBLEME AVEC LES DIV QUI NE PRENNENT PAS 100% EN HEIGHT */}
        <h1>Formule</h1>
        <div style={options}>
          {formuleOptions.map((option, index) => (
            <buttton key={index} style={card} onClick={() => handleOrder(option.navigateTo)}>
              <div style={cardContent}>
                <div style={emojiRow}>
                  {option.items.map((item, idx) => (
                    <span key={idx} style={emoji}>
                  {item}
                </span>
                  ))}
                </div>
                <p style={description}>{option.description}</p>
                <p style={price}>{option.price} €</p>
              </div>
            </buttton>
          ))}
        </div>
      </div>
      <button style={backButton}>RETOUR</button>
    </div>
  );
};

const formuleOptions = [
  {
    items: ['🥗', '🍔', '🍰'],
    description: 'Entrée / Plat / Dessert',
    price: 20,
    navigateTo: '/orderEntree'
  },
  {
    items: ['🥗', '🍔'],
    description: 'Entrée / Plat',
    price: 17,
    navigateTo: '/orderEntree'
  },
  {
    items: ['🍔', '🍰'],
    description: 'Plat / Dessert',
    price: 15,
    navigateTo: '/orderPlat'
  }
];

const emojiRow: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
};

const container: React.CSSProperties = {
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  height: '100%'
};

const containerContent: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px'
};

const userTalk: React.CSSProperties = {
  backgroundColor: '#d32f2f',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10px'
};

const barcode: React.CSSProperties = {
  width: '100px',
  height: '10px',
  backgroundColor: '#fff',
  borderRadius: '4px'
};

const options: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  marginBottom: '20px',
  height: '100%'
};

const card: React.CSSProperties = {
  backgroundColor: '#1976d2',
  borderRadius: '8px',
  padding: '10px',
  color: '#ffffff',
  cursor: 'pointer'
};

const cardContent: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const emoji: React.CSSProperties = {
  fontSize: '24px',
  margin: '5px'
};

const description: React.CSSProperties = {
  fontSize: '18px',
  margin: '5px 0'
};

const price: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold'
};

const backButton: React.CSSProperties = {
  backgroundColor: '#d32f2f',
  color: '#ffffff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  width: '100%'
};

export default Formule;
