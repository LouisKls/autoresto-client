import Fuse from 'fuse.js';
import { Item } from './types';

export const itemChoice = async (
  items: Item[],
  handleClickSpeak: (text: string) => Promise<void>
) => {
  try {
    await handleClickSpeak('Parfait ! J\'ai 4 choix à te proposer :');
    for (const item of items) {
      await handleClickSpeak(item.name);
    }
    await handleClickSpeak('Autres choix');
    await handleClickSpeak('Lequel veux-tu ?');
  } catch (error) {
    console.error('Error during speaking:', error);
  }
};


export const chooseAnItem = async (
  response: string,
  data: any,
  items: any[],
  itemOrder: string[],
  handleClickSpeak: (text: string) => Promise<void>,
  continueOrder: () => Promise<void>,
  answer: () => Promise<string | undefined>
) => {
  const categories = {
    entree: data.items.entrees,
    plat: data.items.plats,
    dessert: data.items.desserts,
    boisson: data.items.boissons
  };

  let chosenCategory;
  if (response.includes('entrée')) {
    chosenCategory = categories.entree;
  } else if (response.includes('plat')) {
    chosenCategory = categories.plat;
  } else if (response.includes('dessert')) {
    chosenCategory = categories.dessert;
  } else if (response.includes('boi')) {
    chosenCategory = categories.boisson;
  }

  if (chosenCategory) {
    // Sélectionner 4 éléments aléatoires de la catégorie choisie
    const randomItems = getRandomItems(chosenCategory, 4); // Assurez-vous que cette fonction est définie ailleurs
    await itemChoice(randomItems, handleClickSpeak); // Assurez-vous que cette fonction est définie ailleurs
    const userResponse = await answer();

    if (userResponse) {
      // Fonction de normalisation et de suppression des accents
      const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const sanitizeString = (str: string) => removeAccents(str.trim().toLowerCase());

      const cleanedItems = items.map((item) => ({
        ...item,
        name: sanitizeString(item.name)
      }));

      const fuse = new Fuse(cleanedItems, {
        keys: ['name'],
        threshold: 0.5
      });

      const sanitizedUserResponse = sanitizeString(userResponse);

      const results = fuse.search(sanitizedUserResponse);

      let matchedKeyword = null;
      if (results.length > 0) {
        matchedKeyword = results[0].item;
        console.log(`Matched item: ${matchedKeyword.name}`);
      } else {
        console.log('No match found');
      }

      if (matchedKeyword) {
        console.log(`Matched item: ${matchedKeyword.name}`);
        itemOrder.push(matchedKeyword.name);
        await handleClickSpeak('Parfait ! C\'est enregistré !');
        await continueOrder();
      } else {
        console.log('No match found');
      }

      if (userResponse.toLowerCase().includes('autre')) {
        await chooseAnItem(response, data, items, itemOrder, handleClickSpeak, continueOrder, answer); // Passer à nouveau la même catégorie
      }
    }
  }
};

// Fonction pour obtenir des éléments aléatoires
const getRandomItems = (category: any[], count: number) => {
  const shuffled = [...category].sort(() => 0.5 - Math.random()); // Mélange les éléments
  return shuffled.slice(0, count); // Prend les "count" premiers éléments
};
