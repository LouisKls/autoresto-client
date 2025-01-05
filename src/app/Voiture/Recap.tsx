import React from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { useServer } from '@/app/Voiture/ServerContext';

const Recap: React.FC = () => {
  const { handleOrder } = useServer();

  const handleClick = () => {
    handleOrder();
  };

  return (

    <div style={containerStyle}>
      <ExitCarModeComponent containerWidth="90%" />
      <button style={orderButtonStyle} onClick={handleClick}>COMMANDER</button>

      <div style={infoBox}>
        🍙 Entrée / 🍕 Plat / 🍏 Dessert
      </div>

      <h1 style={reservationHour}>12:30</h1>

      <div style={actions}>
        <button style={deleteButton}>SUPPRIMER</button>
      </div>
    </div>
  );
};

// Styles en tant qu'objets séparés, typés avec React.CSSProperties
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  backgroundColor: '#f5f5f5'
};

const orderButtonStyle: React.CSSProperties = {
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '20px 40px',
  fontSize: '24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  flex: '1 1 auto',
  width: '90%',
  height: '400px',
  marginBottom: 28
};

const infoBox: React.CSSProperties = {
  backgroundColor: '#3B82F6',
  color: 'white',
  padding: '12px',
  borderRadius: '4px',
  marginBottom: '24px',
  fontSize: '18px',
  textAlign: 'center',
  width: '90%'
};

const reservationHour: React.CSSProperties = {
  fontSize: 56,
  marginBottom: 16
};

const actions: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: '90%'
};

const deleteButton: React.CSSProperties = {
  backgroundColor: '#d9534f',
  color: '#fff',
  border: 'none',
  padding: '30px 40px',
  fontSize: '28px',
  borderRadius: '5px',
  cursor: 'pointer',
  flex: 1
};

export default Recap;
