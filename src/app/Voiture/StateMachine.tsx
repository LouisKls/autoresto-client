import { useState } from 'react';

// Liste des états possibles
export enum States {
  ACCUEIL = 'Accueil',
  ENTREES = 'Entrées',
  PLATS = 'Plats',
  DESSERTS = 'Desserts',
}

const StateMachine = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Index de l'état actuel

  // Passer à l'état suivant
  const goNext = () => {
    if (currentIndex < States.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Retourner à l'état précédent
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    state: States[currentIndex], // L'état actuel
    goNext,
    goPrev
  };
};

export default StateMachine;
