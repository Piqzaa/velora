const produits = {
  hamac: {
    id: 'hamac',
    name: 'Hamac fenêtre Velora',
    slug: 'hamac-fenetre-velora',
    price: 39.90,
    oldPrice: 49.90,
    rating: 4.9,
    reviews: 214,
    badge: 'Promo -20%',
    shortDesc: 'Un hamac de fenêtre pensé pour transformer n\'importe quelle vitre en poste d\'observation, de sieste et de soleil.',
    longDesc: 'Conçu pour les chats qui aiment la hauteur et la lumière, le hamac Velora se fixe en 30 secondes sans perçage. Ses ventouses renforcées assurent une tenue parfaite jusqu\'à 15 kg, et son tissu déhoussable passe en machine pour un entretien sans effort.',
    features: [
      'Ventouses renforcées, tenue jusqu\'à 15 kg',
      'Tissu déhoussable et lavable en machine',
      'Installation sans perçage en 30 secondes',
      'Structure acier résistante aux griffures',
      'Design adapté à toutes les fenêtres'
    ],
    images: [
      'assets/images/frame1.jpg',
      'assets/images/hamac-fenetre1.avif',
      'assets/images/hamac-fenetre2.avif',
      'assets/images/hamac-fenetre1.avif'
    ],
    stripePriceId: null,
    related: ['panier', 'griffoir', 'hamac-sol']
  },
  panier: {
    id: 'panier',
    name: 'Tipi Velora',
    slug: 'tipi-velora',
    price: 35.90,
    oldPrice: null,
    rating: 4.6,
    reviews: 112,
    badge: null,
    shortDesc: 'Un tipi en rotin tressé à la main, pour des nuits paisibles.',
    longDesc: 'Tressé à la main par des artisans, ce tipi en rotin naturel offre à votre chat un cocon douillet et élégant. Son coussin amovible se lave en machine, et sa structure robuste s\'intègre parfaitement à tous les intérieurs.',
    features: [
      'Rotin tressé à la main, robuste et durable',
      'Coussin amovible et lavable en machine',
      'Design naturel, adapté à tous les intérieurs',
      'Structure stable et sécurisée'
    ],
    images: [
      'assets/images/tipie-avec-chat.png',
      'assets/images/tipie.avif',
      'assets/images/tipi.jpg',
      'assets/images/tipie.avif'
    ],
    stripePriceId: null,
    related: ['hamac', 'griffoir', 'hamac-sol']
  },
  griffoir: {
    id: 'griffoir',
    name: 'Panier griffoir Velora',
    slug: 'panier-griffoir-velora',
    price: 29.90,
    oldPrice: null,
    rating: 4.5,
    reviews: 48,
    badge: null,
    shortDesc: 'Un panier en rotin que votre chat peut griffer et où il peut dormir.',
    longDesc: 'Tressé dans un rotin naturel résistant aux griffures, ce panier fait office de couchage et de griffoir. Votre chat peut y faire ses griffes sans abîmer vos meubles, puis s\'y rouler en boule pour une sieste.',
    features: [
      'Rotin naturel résistant aux griffures',
      'Design 2-en-1 : couchage + griffoir',
      'Léger et facile à déplacer',
      'S\'intègre à tous les intérieurs'
    ],
    images: [
      'assets/images/panier-avec-chat.jpg',
      'assets/images/panier.avif',
      'assets/images/panier-avec-chat.avif',
      'assets/images/panier.avif'
    ],
    stripePriceId: null,
    related: ['hamac', 'panier', 'hamac-sol']
  },
  transat: {
    id: 'transat',
    name: 'Hamac transat Velora',
    slug: 'hamac-transat-velora',
    price: 29.90,
    oldPrice: null,
    rating: 4.4,
    reviews: 36,
    badge: null,
    shortDesc: 'Un transat griffable pour siestes et moments de détente.',
    longDesc: 'Posé au sol, ce transat en rotin offre un couchage surélevé que votre chat peut également griffer. Sa structure basse est idéale pour les chats âgés ou ceux qui préfèrent rester près du sol. Son rotin résistant supporte les griffures du quotidien.',
    features: [
      'Structure basse, idéale pour tous les chats',
      'Rotin griffable anti-usure',
      'Design transat confortable',
      'Léger et déplaçable'
    ],
    images: [
      'assets/images/hamac-sol-chat.png',
      'assets/images/hamac-sol.avif',
      'assets/images/hamac-sol.avif',
      'assets/images/hamac-sol.avif'
    ],
    stripePriceId: null,
    related: ['hamac', 'panier', 'griffoir']
  }
};

function getProduit(id) {
  return produits[id] || null;
}

function getAllProduits() {
  return Object.values(produits);
}