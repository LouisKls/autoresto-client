'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

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
import { useRouter } from 'next/navigation';
import { Product } from '@/data/types';

interface ServerContextType {
  // États
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: string;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  response: string;
  setResponse: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  itemOrder: string[];
  setItemOrder: (value: string[]) => void;
  items: Product[];
  setItems: (value: Product[]) => void;
  selectedItems: Product[];
  setSelectedItems: (items: Product[]) => void;
  data: {
    entrees: {
      salades: [],
      soupes: [],
      tapas: [],
    },
    plats: {
      viandes: [],
      poissons: [],
      pates: [],
      burgers: [],
      pizzas: [],
      vegetarien: [],
      risottos: [],
      woks: [],
      tacos: [],
    },
    desserts: {
      gateaux: [],
      glaces: [],
      fruits: [],
    },
    boissons: {
      softs: [],
      alcools: [],
      cafe_the: [],
    },
  };
  setData: (value: any) => void;

  // Fonctions
  handleClickSpeak: (text: string) => Promise<void>;
  answer: () => Promise<string | undefined>;
  handleStartOrder: () => Promise<void>;
  handleRestartOrder: () => Promise<void>;
  handleQuitOrder: () => Promise<void>;
  handleOrder: () => Promise<void>;
  handleReservation: () => Promise<void>;
  handleItemChoice: (response: string) => Promise<void>;
  startContinueOrder: () => Promise<void>;
  startCourses: () => Promise<void>;
  handleRestartCourses: () => Promise<void>;
  handleCoursesAnswer: (respond: string) => Promise<void>;
  continueOrderAnswer: (textAnswer: string) => Promise<void>;
  handleAnswer: (textAnswer: string) => Promise<void>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // États
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [itemOrder, setItemOrder] = useState<string[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [data, setData] = useState({
    entrees: {
      salades: [],
      soupes: [],
      tapas: [],
    },
    plats: {
      viandes: [],
      poissons: [],
      pates: [],
      burgers: [],
      pizzas: [],
      vegetarien: [],
      risottos: [],
      woks: [],
      tacos: [],
    },
    desserts: {
      gateaux: [],
      glaces: [],
      fruits: [],
    },
    boissons: {
      softs: [],
      alcools: [],
      cafe_the: [],
    },
  });

  // Effets
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

  const handleQuitOrder = () => {
    return quitOrder(handleClickSpeak);
  };

  const handleAnswer = async (textAnswer: string) => {
    return handleOrderAnswer(
      textAnswer,
      startCourses,
      answer,
      handleCoursesAnswer,
      handleRestartOrder,
      handleQuitOrder
    );
  };

  const router = useRouter();

  const startCourses = () => {
    router.push('/productChoice');
    return courses(handleClickSpeak);
  };

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
    return chooseAnItem(
      response,
      data,
      items,
      itemOrder,
      handleClickSpeak,
      startContinueOrder,
      answer,
      setSelectedItems
    );
  };

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
    setIsListening,
    response,
    setResponse,
    error,
    setError,
    itemOrder,
    setItemOrder,
    items,
    setItems,
    data,
    setData,
    selectedItems,
    setSelectedItems,

    // Fonctions
    handleClickSpeak,
    answer,
    handleStartOrder,
    handleRestartOrder,
    handleQuitOrder,
    handleOrder,
    handleReservation,
    handleItemChoice,
    startContinueOrder,
    startCourses,
    handleRestartCourses,
    handleCoursesAnswer,
    continueOrderAnswer,
    handleAnswer
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

export default ServerProvider;