import Fuse from 'fuse.js';
import { Item } from './types';

export const chooseAnItem = async (
  response: string,
  data: any,
  items: Item[],
  itemOrder: string[],
  handleClickSpeak: (text: string) => Promise<void>,
  continueOrder: () => Promise<void>,
  answer: () => Promise<string | undefined>,
  setSelectedItems: (items: Item[]) => void
): Promise<void> => {
  // Définition des catégories disponibles
  const categories = {
    entree: data.items.entrees,
    plat: data.items.plats,
    dessert: data.items.desserts,
    boisson: data.items.boissons
  };

  // Détermination de la catégorie choisie
  let chosenCategory: Item[] | undefined;
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
    // Sélection de 4 éléments aléatoires
    const randomItems = getRandomItems(chosenCategory, 4);

    // Mise à jour du context avec les nouveaux items
    setSelectedItems(randomItems);

    // Lecture vocale des choix
    await itemChoice(randomItems, handleClickSpeak, setSelectedItems);

    // Attente de la réponse de l'utilisateur
    const userResponse = await answer();

    if (userResponse) {
      // Normalisation des textes pour la recherche
      const removeAccents = (str: string) =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const sanitizeString = (str: string) =>
        removeAccents(str.trim().toLowerCase());

      // Préparation des items pour la recherche fuzzy
      const cleanedItems = randomItems.map((item) => ({
        ...item,
        name: sanitizeString(item.name)
      }));

      // Configuration de Fuse.js pour la recherche approximative
      const fuse = new Fuse(cleanedItems, {
        keys: ['name'],
        threshold: 0.5
      });

      const sanitizedUserResponse = sanitizeString(userResponse);
      const results = fuse.search(sanitizedUserResponse);

      // Traitement du résultat de la recherche
      if (results.length > 0) {
        const matchedKeyword = results[0].item;
        console.log(`Matched item: ${matchedKeyword.name}`);
        itemOrder.push(matchedKeyword.name);
        await handleClickSpeak('Parfait ! C\'est enregistré !');
        await continueOrder();
      } else {
        console.log('No match found');
        // Vous pouvez ajouter ici une gestion des cas où aucune correspondance n'est trouvée
      }

      // Gestion de la demande "autres choix"
      if (userResponse.toLowerCase().includes('autre')) {
        await chooseAnItem(
          response,
          data,
          randomItems,
          itemOrder,
          handleClickSpeak,
          continueOrder,
          answer,
          setSelectedItems
        );
      }
    }
  }
};

// Fonction utilitaire pour obtenir des éléments aléatoires
const getRandomItems = (category: Item[], count: number): Item[] => {
  const shuffled = [...category].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Fonction pour la lecture vocale des choix
const itemChoice = async (
  items: Item[],
  handleClickSpeak: (text: string) => Promise<void>,
  setSelectedItems: (items: Item[]) => void
): Promise<void> => {
  try {
    setSelectedItems(items);
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