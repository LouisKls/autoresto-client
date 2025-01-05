import React from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { useServer } from '@/app/Voiture/ServerContext';
import styles from './Accueil.module.scss';

const Accueil: React.FC = () => {
  const { handleOrder, isSpeaking, isListening } = useServer();

  const handleClick = () => {
    handleOrder();
  };

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

      <div style={welcomeContainer}>
        <h1 style={welcomeTitle}>Bienvenue au Restaurant</h1>
        <p style={welcomeText}>Pour commencer votre commande, appuyez sur le bouton ci-dessous</p>
      </div>

      <button 
        style={orderButtonStyle} 
        className={styles.orderButton}
        onClick={handleClick}
      >
        <span style={buttonIcon}>🎙️</span>
        <span style={buttonText}>COMMENCER LA COMMANDE</span>
      </button>

      <div style={instructionsContainer}>
        <div style={instructionBox} className={styles.instructionBox}>
          <span style={instructionIcon}>❌</span>
          <span style={instructionText}>Dites "Quitter" pour annuler</span>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: '20px'
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
  fontSize: '18px',
  animation: 'pulse 1.5s infinite'
};

const welcomeContainer: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '40px'
};

const welcomeTitle: React.CSSProperties = {
  fontSize: '32px',
  color: '#1976d2',
  marginBottom: '10px'
};

const welcomeText: React.CSSProperties = {
  fontSize: '18px',
  color: '#666'
};

const orderButtonStyle: React.CSSProperties = {
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  padding: '30px',
  width: '90%',
  height: '200px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease',
  marginBottom: '40px'
};

const buttonIcon: React.CSSProperties = {
  fontSize: '48px'
};

const buttonText: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold'
};

const instructionsContainer: React.CSSProperties = {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const instructionBox: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
};

const instructionIcon: React.CSSProperties = {
  fontSize: '24px'
};

const instructionText: React.CSSProperties = {
  fontSize: '16px',
  color: '#333'
};

export default Accueil;
