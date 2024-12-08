import React from "react";

const App: React.FC = () => {
  return (
    <div style={containerStyle}>
      <button style={exitCarModeButtonStyle}>QUITTER LE MODE VOITURE</button>
      <button style={orderButtonStyle}>COMMANDER</button>
    </div>
  );
};

// Styles en tant qu'objets séparés, typés avec React.CSSProperties
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
};

const exitCarModeButtonStyle: React.CSSProperties = {
  backgroundColor: "#d32f2f",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  fontSize: "16px",
  marginBottom: "20px",
  cursor: "pointer",
};

const orderButtonStyle: React.CSSProperties = {
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "20px 40px",
  fontSize: "24px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default App;
