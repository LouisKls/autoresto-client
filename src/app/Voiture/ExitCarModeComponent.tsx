import React from 'react';
import { useRouter } from 'next/navigation';

interface ExitCarModeProps {
  containerWidth: string;
}

const ExitCarModeComponent: React.FC<ExitCarModeProps> = ({ containerWidth }) => {
  const router = useRouter();

  const handleExitCarMode = () => {
    router.push('/');
  };

  const containerStyle: React.CSSProperties = {
    width: containerWidth
  };

  return (
    <div style={containerStyle}>
      <button style={exitCarModeButtonStyle} onClick={handleExitCarMode}>
        QUITTER LE MODE VOITURE
      </button>
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