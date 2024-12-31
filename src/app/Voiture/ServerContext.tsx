'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Item } from '@components/Serveur/types';
import { loadVoices } from '@components/Serveur/loadVoices';
import { fetchItems } from '@components/Serveur/fetchItems';
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

interface ServerContextType {
  // États
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: string;
  isListening: boolean;
  response: string;
  error: string;
  itemOrder: string[];
  items: Item[];
  data: {
    items: {
      entrees: any[];
      plats: any[];
      desserts: any[];
      boissons: any[];
    };
  };

  // Fonctions
  handleClickSpeak: (text: string) => Promise<void>;
  answer: () => Promise<string | undefined>;
  handleStartOrder: () => Promise<void>;
  handleRestartOrder: () => Promise<void>;
  handleQuitOrder: () => Promise<void>;
  handleOrder: () => Promise<void>;
  handleReservation: () => Promise<void>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    loadVoices(setVoices, setSelectedVoice);
  }, []);

  useEffect(() => {
    fetchItems(setData, setItems);
  }, []);

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

  const value = {
    // États
    isSpeaking,
    setIsSpeaking,
    voices,
    selectedVoice,
    isListening,
    response,
    error,
    itemOrder,
    items,
    data,

    // Fonctions
    handleClickSpeak,
    answer,
    handleStartOrder,
    handleRestartOrder,
    handleQuitOrder,
    handleOrder,
    handleReservation
  };

  return (
    <ServerContext.Provider value={value}>
      {children}
    </ServerContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useServer = () => {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
};