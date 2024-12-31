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

  const handleClickSpeak = (text: string) => {
    return handleSpeak(text, voices, selectedVoice, setIsSpeaking);
  };

  const answer = async () => {
    try {
      // Wait for response to be captured
      return await listenResponse(setResponse, setError, setIsListening, isSpeaking, setIsSpeaking);
    } catch (error) {
      console.error('Error during speech recognition:', error);
    }
  };

  const handleStartOrder = () => {
    return startOrder(handleClickSpeak);
  };

  const handleRestartOrder = () => {
    return restartOrder(handleClickSpeak, answer, handleAnswer);
  };

  // Utilisation de quitOrder
  const handleQuitOrder = () => {
    return quitOrder(handleClickSpeak);
  };


  const handleAnswer = (textAnswer: string) => {
    return handleOrderAnswer(textAnswer, startCourses, answer, handleCoursesAnswer, handleRestartOrder, handleQuitOrder);
  };

  const startCourses = () => {
    return courses(handleClickSpeak);
  };

  // TODO : not used, but the function restartCourses wasn't used neither
  const handleRestartCourses = () => {
    return restartCourses(handleClickSpeak, answer, handleCoursesAnswer);
  };


  const handleCoursesAnswer = async (respond: string) => {
    if (respond.includes('entrée') || respond.includes('plat') || respond.includes('dessert') || respond.includes('boi')) {
      await handleItemChoice(respond);
    } else {
      await handleQuitOrder();
    }
  };

  const handleItemChoice = (response: string) => {
    return chooseAnItem(response, data, items, itemOrder, handleClickSpeak, startContinueOrder, answer);
  };

  // TODO : si ça pète c'est là je pense
  const startContinueOrder = async () => {
    await continueOrder(itemOrder, handleClickSpeak, answer, continueOrderAnswer);
  };

  const continueOrderAnswer = async (textAnswer: string) => {
    await handleContinueOrderAnswer(
      textAnswer,
      startCourses,
      answer,
      handleCoursesAnswer,
      handleRestartOrder,
      handleClickSpeak,
      handleReservation,
      startContinueOrder,
      itemOrder
    );
  };

  const handleReservation = () => {
    return reservation(handleClickSpeak, answer);
  };

  const handleOrder = () => {
    return order(handleStartOrder, answer, handleAnswer, handleRestartOrder);
  };

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

};

export default Serveur;