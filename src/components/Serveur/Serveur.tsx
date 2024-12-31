import React, { useEffect, useState } from 'react';
import { loadVoices } from './loadVoices';
import { fetchItems } from './fetchItems';
import { handleSpeak } from '@components/Serveur/handleSpeak';
import { listenResponse } from '@components/Serveur/listenResponse';
import {
  continueOrder,
  handleContinueOrderAnswer,
  order,
  quitOrder,
  restartOrder,
  startOrder
} from '@components/Serveur/order';
import { handleOrderAnswer } from '@components/Serveur/handleOrderAnswer';
import { courses, restartCourses } from '@components/Serveur/courses';
import { chooseAnItem } from '@components/Serveur/chooseAnItem';
import { reservation } from '@components/Serveur/reservation';
import { Item } from '@components/Serveur/types';

const Serveur: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState<string>('');

  const [error, setError] = useState<string>('');

  const [itemOrder, setItemOrder] = useState<string[]>([]);

  const [items, setItems] = useState<Item[]>([]);
  const [data, setData] = useState({
    items: {
      entrees: [],
      plats: [],
      desserts: [],
      boissons: []
    }
  });

  useEffect(() => {
    loadVoices(setVoices, setSelectedVoice); // Utiliser la fonction importée
  }, []);

  useEffect(() => {
    fetchItems(setData, setItems); // Appeler fetchItems avec les setState
  }, []); // L'effet ne s'exécute qu'une seule fois après le montage


/*
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#f4f4f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Auto Resto !</h1>
      <button
        onClick={handleOrder}
        style={{
          display: 'block',
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          boxSizing: 'border-box'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
      >
        Commander
      </button>

      {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

      {isListening &&
        <p style={{ color: '#555', textAlign: 'center', fontSize: '16px', marginTop: '15px' }}>Écoute en cours...</p>}
    </div>
  );
  */
  return (<div></div>);

};

export default Serveur;