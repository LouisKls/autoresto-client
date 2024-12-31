import React, { SetStateAction } from 'react';

export const loadVoices = (
  setVoices: React.Dispatch<SetStateAction<SpeechSynthesisVoice[]>>,
  setSelectedVoice: React.Dispatch<SetStateAction<string>>
) => {
  const availableVoices = window.speechSynthesis.getVoices();
  setVoices(availableVoices);

  const googleFrenchVoice = availableVoices.find(
    (voice) => voice.lang === 'fr-FR' && voice.name.toLowerCase().includes('google')
  );

  if (googleFrenchVoice) {
    setSelectedVoice(googleFrenchVoice.name);
  } else if (availableVoices.length > 0) {
    setSelectedVoice(availableVoices[0].name);
  }
};