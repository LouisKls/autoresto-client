import React from 'react';

const ExitCarModeComponent: React.FC = () => {
  return (
    <div>
      <button style={exitCarModeButtonStyle}>QUITTER LE MODE VOITURE</button>
    </div>
  );
};

const exitCarModeButtonStyle: React.CSSProperties = {
  backgroundColor: '#d32f2f',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  fontSize: '16px',
  marginBottom: '20px',
  cursor: 'pointer',
  width: '100%'
};

export default ExitCarModeComponent;