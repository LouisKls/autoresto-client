import Fuse from 'fuse.js';
import { Item } from './types';
import { Product } from '@/data/types';

export const chooseAnItem = async (
  response: string,
  data: Record<string, Record<string, Product[]>>,
  items: Product[],
  itemOrder: string[],
  handleClickSpeak: (text: string) => Promise<void>,
  continueOrder: () => Promise<void>,
  answer: () => Promise<string | undefined>,
  setSelectedItems: (items: Product[]) => void
): Promise<void> => {
  // Définition des catégories disponibles
  const categories = {
    entree: data['entrees'],
    plat: data['plats'],
    dessert: data['desserts'],
    boisson: data['boissons']
  };

  // Détermination de la catégorie choisie
  let chosenCategory: Product[] | undefined;
  if (response.includes('entrée')) {
    chosenCategory = Object.values(categories.entree).flatMap((subcategories) =>
      Object.values(subcategories).flat()
    );
  } else if (response.includes('plat')) {
    chosenCategory = Object.values(categories.plat).flatMap((subcategories) =>
      Object.values(subcategories).flat()
    );
  } else if (response.includes('dessert')) {
    chosenCategory = Object.values(categories.dessert).flatMap((subcategories) =>
      Object.values(subcategories).flat()
    );
  } else if (response.includes('boi')) {
    chosenCategory = Object.values(categories.boisson).flatMap((subcategories) =>
      Object.values(subcategories).flat()
    );
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
const getRandomItems = (category: Product[], count: number): Product[] => {
  const shuffled = [...category].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Fonction pour la lecture vocale des choix
const itemChoice = async (
  items: Product[],
  handleClickSpeak: (text: string) => Promise<void>,
  setSelectedItems: (items: Product[]) => void
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