import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';

const Accueil: React.FC = () => {

  const navigate = useNavigate(); // Hook pour la navigation

  const handleOrder = () => {
    // Navigue vers la page de commande
    navigate('/order');
  };

  return (
    <div style={containerStyle}>
      <ExitCarModeComponent />
      <button style={orderButtonStyle} onClick={handleOrder}>COMMANDER</button>
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
  flex: '1 1 auto'
};

export default Accueil;
