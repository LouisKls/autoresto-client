import { Category, Subcategory, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: 'entrees', label: 'Entrées' },
  { id: 'plats', label: 'Plats' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'boissons', label: 'Boissons' },
];

export const SUBCATEGORIES: Record<string, Subcategory[]> = {
  plats: [
    { id: 'burgers', label: 'Burgers', icon: '/icons/viande.png' },
    { id: 'pizzas', label: 'Pizzas', icon: '/icons/viande.png' },
    { id: 'poissons', label: 'Poissons', icon: '/icons/viande.png' },
    { id: 'vegetarien', label: 'Végétarien', icon: '/icons/viande.png' },
    { id: 'viandes', label: 'Viandes', icon: '/icons/viande.png' },
    { id: 'viandes2', label: 'Viandes', icon: '/icons/viande.png' },
    { id: 'viandes3', label: 'Viandes', icon: '/icons/viande.png' },
    { id: 'viandes4', label: 'Viandes', icon: '/icons/viande.png' },
    { id: 'viandes5', label: 'Viandes', icon: '/icons/viande.png' },
    { id: 'viandes6', label: 'Viandes', icon: '/icons/viande.png' },
    { id: 'viandes7', label: 'Viandes', icon: '/icons/viande.png' },
    { id: 'viandes8', label: 'Viandes', icon: '/icons/viande.png' },
  ],
  entrees: [],
  desserts: [],
  boissons: [],
};

export const PRODUCTS: Record<string, Record<string, Product[]>> = {
  plats: {
    viandes: [
      {
        id: 1,
        name: 'Côte de boeuf',
        description: 'Gluten - Arachides',
        price: 4.5,
        image: '/images/viande.png',
      },
      {
        id: 2,
        name: 'Steak grillé',
        description: 'Gluten - Arachides',
        price: 4.5,
        image: '/images/viande.png',
      },
    ],
    burgers: [
      {
        id: 3,
        name: 'Burger classique',
        description: 'Gluten - Arachides',
        price: 5,
        image: '/images/viande.png',
      },
    ],
    pizzas: [],
    vegetarien: [],
    poissons: [],
  },
  entrees: {},
  desserts: {},
  boissons: {},
};
