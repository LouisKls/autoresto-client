import React, { useState } from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { useServer } from '@/app/Voiture/ServerContext';
import { useReservation } from '@/app/Voiture/ReservationHourContext';
import styles from '@/app/Voiture/Accueil.module.scss';
import { router } from 'next/client';

const Recap: React.FC = () => {
  const { handleOrder, itemOrder, setItemOrder, isSpeaking, isListening } = useServer();

  const { hour, minute } = useReservation();
  const [showReservationHour, setShowReservationHour] = useState(true);

  const getPriceToPay = (): number => {
    let price: number = 0;
    for (const item of itemOrder) {
      price += item.price;
    }
    return price;
  };

  const handleDeletion = () => {
    setShowReservationHour(false);
    setItemOrder([]);
  };

  const handleClick = () => {
    handleDeletion();
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
        <p style={welcomeText}>Pour recommencer votre commande, appuyez sur le bouton ci-dessous</p>
      </div>

      <button
        style={orderButtonStyle}
        className={styles.orderButton}
        onClick={handleClick}
      >
        <span style={buttonIcon}>🎙️</span>
        <span style={buttonText}>COMMENCER LA COMMANDE</span>
      </button>

      {showReservationHour && (
        <div style={infoBox}>
          <span style={products}>A PAYER SUR PLACE</span>
          <span style={price}>{getPriceToPay()} €</span>
        </div>)}

      {showReservationHour && (
        <h1 style={reservationHour}>{hour}:{minute}</h1>
      )}

      {showReservationHour && (
        <div style={actions}>
          <button style={deleteButton} onClick={handleDeletion}>ANNULER</button>
        </div>)}
    </div>
  )
    ;
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

const infoBox: React.CSSProperties = {
  backgroundColor: '#3B82F6',
  color: 'white',
  padding: '12px',
  borderRadius: '4px',
  marginBottom: '12px',
  fontSize: '18px',
  textAlign: 'center',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8
};

const reservationHour: React.CSSProperties = {
  fontSize: 56,
  marginBottom: 8
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

const products: React.CSSProperties = {
  fontSize: 16
};

const price: React.CSSProperties = {
  fontSize: 44,
  fontWeight: 'bold'
};

const statusContainer: React.CSSProperties = {
  width: '90%',
  marginBottom: '12px',
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
  marginBottom: '24px'
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
  marginBottom: '24px'
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

export default Recap;
