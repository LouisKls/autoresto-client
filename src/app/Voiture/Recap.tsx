import React from 'react';
import ExitCarModeComponent from '@/app/Voiture/ExitCarModeComponent';
import { useServer } from '@/app/Voiture/ServerContext';
import { useReservation } from '@/app/Voiture/ReservationHourContext';

const Recap: React.FC = () => {
  const { handleOrder, itemOrder } = useServer();

  const handleClick = () => {
    handleOrder();
  };

  const { hour, minute } = useReservation();

  const getPriceToPay = (): number => {
    let price: number = 0;
    for(const item of itemOrder){
      price += item.price;
    }
    return price;
  }

  return (
    <div style={containerStyle}>
      <ExitCarModeComponent containerWidth="90%" />
      <button style={orderButtonStyle} onClick={handleClick}>COMMANDER</button>

      <div style={infoBox}>
        <span style={products}>🍙 Entrée / 🍕 Plat / 🍏 Dessert</span>
        <span style={price}>{getPriceToPay} €</span>
      </div>

      <h1 style={reservationHour}>{hour}:{minute}</h1>

      <div style={actions}>
        <button style={deleteButton}>SUPPRIMER</button>
      </div>
    </div>
  );
};

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
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8
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

const products: React.CSSProperties = {
  fontSize: 20
}

const price: React.CSSProperties = {
  fontSize: 44,
  fontWeight: 'bold',
}

export default Recap;
