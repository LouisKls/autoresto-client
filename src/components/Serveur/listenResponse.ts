import { stopTalking } from './speech';
import React from 'react';

export const listenResponse = (
  setResponse: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  isSpeaking: boolean,
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const currentTranscript = event.results[event.resultIndex][0].transcript;
          setResponse(currentTranscript);
          recognition.stop();
          stopTalking(isSpeaking, setIsSpeaking); // Appeler stopTalking pour arrêter la lecture
          resolve(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          setError('Erreur : ' + event.error);
          reject(event.error);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        setIsListening(true);
      } else {
        setError('La reconnaissance vocale n\'est pas disponible dans cet environnement.');
        reject('Speech recognition not available.');
      }
    }
  });
};