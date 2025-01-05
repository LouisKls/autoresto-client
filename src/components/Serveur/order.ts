import { Product } from '@/data/types';

export const startOrder = async (
  handleClickSpeak: (text: string) => void
) => {
  try {
    await handleClickSpeak('Salut Chef! Si tu veux commencer une commande, dis, Commander!');
  } catch (error) {
    console.error('Error during speaking:', error);
  }
};

export const restartOrder = async (
  handleClickSpeak: (text: string) => void,
  answer: () => Promise<string | undefined>,
  handleOrderAnswer: (response: string) => Promise<void>
): Promise<void> => {
  try {
    await handleClickSpeak('Désolé Chef mais j\'ai pas compris! Si tu veux commencer une commande, dis, Commander!');
  } catch (error) {
    console.error('Error during speaking:', error);
  }

  const userResponse = await answer();
  if (userResponse) {
    await handleOrderAnswer(userResponse.toLowerCase());
  } else {
    await restartOrder(handleClickSpeak, answer, handleOrderAnswer);
  }
};

export const quitOrder = async (
  handleClickSpeak: (text: string) => void
): Promise<void> => {
  try {
    await handleClickSpeak('Pas de soucis Chef ! A la prochaine !');
  } catch (error) {
    console.error('Error during speaking:', error);
  }
};

// orderHandling.ts
export const continueOrder = async (
  itemOrder: Product[],
  handleClickSpeak: (text: string) => Promise<void>,
  answer: () => Promise<string | null>,
  handleContinueOrderAnswer: (response: string) => Promise<void>
) => {
  try {
    // Informer des articles déjà commandés
    if (itemOrder.length > 0) {
      await handleClickSpeak('Actuellement dans ta commande il y a ces articles :');
      for (const item of itemOrder) {
        await handleClickSpeak(item.name);
      }
    }

    // Demander l'étape suivante
    if (itemOrder.length > 0) {
      await handleClickSpeak('Veux-tu commander quelque chose ? Annuler le dernier article ? Ou passer à la réservation ?');
    } else {
      await handleClickSpeak('Veux-tu commander quelque chose ? Ou stopper la commande ?');
    }

    // Attendre la réponse de l'utilisateur
    const userResponse = await answer();
    if (userResponse) {
      await handleContinueOrderAnswer(userResponse.toLowerCase());
    } else {
      await continueOrder(itemOrder, handleClickSpeak, answer, handleContinueOrderAnswer); // Relancer si aucune réponse
    }
  } catch (error) {
    console.error('Error in continueOrder:', error);
  }
};

export const handleContinueOrderAnswer = async (
  textAnswer: string,
  startCourses: () => Promise<void>,
  answer: () => Promise<string | null>,
  handleCoursesAnswer: (response: string) => Promise<void>,
  handleRestartOrder: () => Promise<void>,
  handleClickSpeak: (text: string) => Promise<void>,
  reservation: () => Promise<void>,
  continueOrder: () => Promise<void>,
  itemOrder: Product[]
) => {
  try {
    if (textAnswer.includes('commander')) {
      await startCourses();
      const userResponse = await answer();
      if (userResponse) {
        await handleCoursesAnswer(userResponse.toLowerCase());
      } else {
        await handleRestartOrder();
      }
    } else if (textAnswer.includes('réser')) {
      await handleClickSpeak('Super, passons à la réservation');
      await reservation();
    } else if (textAnswer.includes('annuler')) {
      await handleClickSpeak('D\'accord, j\'annule ton dernier article');
      itemOrder.pop();
      await continueOrder();
    } else if (textAnswer.includes('stop')) {
      await handleClickSpeak('D\'accord, je stoppe la commande, à la prochaine !');
    } else {
      await continueOrder();
    }
  } catch (error) {
    console.error('Error in handleContinueOrderAnswer:', error);
  }
};

export const order = async (
  handleStartOrder: () => Promise<void>,
  answer: () => Promise<string | null>,
  handleAnswer: (response: string) => Promise<void>,
  handleRestartOrder: () => Promise<void>
): Promise<void> => {
  try {
    await handleStartOrder();
    const userResponse = await answer();

    if (userResponse) {
      await handleAnswer(userResponse.toLowerCase());
    } else {
      await handleRestartOrder();
    }
  } catch (error) {
    console.error('Error in order process:', error);
  }
};


