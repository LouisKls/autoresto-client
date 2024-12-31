import React from 'react';

export const handleSpeak = (
  text: string,
  voices: SpeechSynthesisVoice[],
  selectedVoice: string,
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (!text) {
      alert('Aucun texte à lire.');
      reject('No text to speak.');
    }

    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Chercher la voix sélectionnée
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = (e) => {
        console.error('Une erreur s\'est produite :', e);
        setIsSpeaking(false);
        reject(e);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Votre navigateur ne supporte pas l\'API Web Speech.');
      reject('Speech synthesis not supported.');
    }
  });
};