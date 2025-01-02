'use client';

import React from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { useServer } from '@/app/Voiture/ServerContext';
import { useRouter } from 'next/navigation';

const Accueil: React.FC = () => {
  const { handleOrder } = useServer();
  const router = useRouter();

  const handleClick = () => {
    handleOrder();
    router.push('/order');
  };

  return (
    <div style={containerStyle}>
      <ExitCarModeComponent containerWidth="90%" />
      <button style={orderButtonStyle} onClick={handleClick}>COMMANDER</button>
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
  height: '400px'
};

export default Accueil;
