// ============================================================
// Catalogue de produits pour les suggestions
// Chaque entrée : { id, name, emoji, category }
// ============================================================

const PRODUCTS = [
    // Fruits
    { id: 'pomme',       name: 'Pomme',       emoji: '🍎', category: 'fruits' },
    { id: 'banane',      name: 'Banane',      emoji: '🍌', category: 'fruits' },
    { id: 'orange',      name: 'Orange',      emoji: '🍊', category: 'fruits' },
    { id: 'fraise',      name: 'Fraise',      emoji: '🍓', category: 'fruits' },
    { id: 'raisin',      name: 'Raisin',      emoji: '🍇', category: 'fruits' },
    { id: 'citron',      name: 'Citron',      emoji: '🍋', category: 'fruits' },
    { id: 'kiwi',        name: 'Kiwi',        emoji: '🥝', category: 'fruits' },
    { id: 'peche',       name: 'Pêche',       emoji: '🍑', category: 'fruits' },
    { id: 'ananas',      name: 'Ananas',      emoji: '🍍', category: 'fruits' },
    { id: 'poire',       name: 'Poire',       emoji: '🍐', category: 'fruits' },
    { id: 'melon',       name: 'Melon',       emoji: '🍈', category: 'fruits' },
    { id: 'cerise',      name: 'Cerise',      emoji: '🍒', category: 'fruits' },
    { id: 'avocat',      name: 'Avocat',      emoji: '🥑', category: 'fruits' },

    // Légumes
    { id: 'carotte',     name: 'Carotte',       emoji: '🥕', category: 'legumes' },
    { id: 'patate',      name: 'Pomme de terre', emoji: '🥔', category: 'legumes' },
    { id: 'tomate',      name: 'Tomate',         emoji: '🍅', category: 'legumes' },
    { id: 'concombre',   name: 'Concombre',      emoji: '🥒', category: 'legumes' },
    { id: 'salade',      name: 'Salade',         emoji: '🥬', category: 'legumes' },
    { id: 'mais',        name: 'Maïs',           emoji: '🌽', category: 'legumes' },
    { id: 'brocoli',     name: 'Brocoli',        emoji: '🥦', category: 'legumes' },
    { id: 'poivron',     name: 'Poivron',        emoji: '🫑', category: 'legumes' },
    { id: 'oignon',      name: 'Oignon',         emoji: '🧅', category: 'legumes' },
    { id: 'ail',         name: 'Ail',            emoji: '🧄', category: 'legumes' },
    { id: 'champignon',  name: 'Champignon',     emoji: '🍄', category: 'legumes' },
    { id: 'aubergine',   name: 'Aubergine',      emoji: '🍆', category: 'legumes' },

    // Boulangerie
    { id: 'baguette',    name: 'Baguette',   emoji: '🥖', category: 'boulangerie' },
    { id: 'croissant',   name: 'Croissant',  emoji: '🥐', category: 'boulangerie' },
    { id: 'pain',        name: 'Pain',       emoji: '🍞', category: 'boulangerie' },

    // Produits laitiers & œufs
    { id: 'lait',        name: 'Lait',       emoji: '🥛', category: 'laitier' },
    { id: 'fromage',     name: 'Fromage',    emoji: '🧀', category: 'laitier' },
    { id: 'beurre',      name: 'Beurre',     emoji: '🧈', category: 'laitier' },
    { id: 'yaourt',      name: 'Yaourt',     emoji: '🍶', category: 'laitier' },
    { id: 'oeufs',       name: 'Œufs',       emoji: '🥚', category: 'laitier' },

    // Viandes & poissons
    { id: 'poulet',      name: 'Poulet',     emoji: '🍗', category: 'viande' },
    { id: 'steak',       name: 'Steak',      emoji: '🥩', category: 'viande' },
    { id: 'bacon',       name: 'Bacon',      emoji: '🥓', category: 'viande' },
    { id: 'poisson',     name: 'Poisson',    emoji: '🐟', category: 'viande' },
    { id: 'crevettes',   name: 'Crevettes',  emoji: '🦐', category: 'viande' },

    // Épicerie
    { id: 'pates',       name: 'Pâtes',      emoji: '🍝', category: 'epicerie' },
    { id: 'riz',         name: 'Riz',        emoji: '🍚', category: 'epicerie' },
    { id: 'chocolat',    name: 'Chocolat',   emoji: '🍫', category: 'epicerie' },
    { id: 'miel',        name: 'Miel',       emoji: '🍯', category: 'epicerie' },
    { id: 'biscuits',    name: 'Biscuits',   emoji: '🍪', category: 'epicerie' },
    { id: 'sel',         name: 'Sel',        emoji: '🧂', category: 'epicerie' },
    { id: 'conserve',    name: 'Conserve',   emoji: '🥫', category: 'epicerie' },

    // Boissons
    { id: 'cafe',        name: 'Café',       emoji: '☕', category: 'boissons' },
    { id: 'the',        name: 'Thé',        emoji: '🍵', category: 'boissons' },
    { id: 'vin',         name: 'Vin',        emoji: '🍷', category: 'boissons' },
    { id: 'biere',       name: 'Bière',      emoji: '🍺', category: 'boissons' },
    { id: 'jus',         name: 'Jus',        emoji: '🧃', category: 'boissons' },
    { id: 'eau',         name: 'Eau',        emoji: '💧', category: 'boissons' },
];
