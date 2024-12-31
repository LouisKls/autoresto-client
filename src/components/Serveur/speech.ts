import React from 'react';

export const stopTalking = (isSpeaking: boolean, setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (window.speechSynthesis && isSpeaking) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }
};
