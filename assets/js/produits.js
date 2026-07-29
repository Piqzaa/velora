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
      'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80'
    ],
    stripePriceId: null,
    related: ['coussin', 'jeu']
  },
  coussin: {
    id: 'coussin',
    name: 'Coussin premium Velora',
    slug: 'coussin-premium-velora',
    price: 14.90,
    oldPrice: null,
    rating: 4.7,
    reviews: 89,
    badge: null,
    shortDesc: 'Mousse à mémoire de forme et housse lavable pour un confort absolu.',
    longDesc: 'Parfait complément du hamac, ce coussin à mémoire de forme épouse la morphologie de votre chat pour un confort optimal. Sa housse amovible se lave en machine à 30°C.',
    features: [
      'Mousse à mémoire de forme',
      'Housse amovible et lavable',
      'Anti-dérapant',
      'Dimensions 40×30 cm'
    ],
    images: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543852786-1cf6534b7f7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80'
    ],
    stripePriceId: null,
    related: ['hamac', 'panier']
  },
  jeu: {
    id: 'jeu',
    name: 'Jouet intelligent Velora',
    slug: 'jouet-intelligent-velora',
    price: 17.90,
    oldPrice: null,
    rating: 4.5,
    reviews: 56,
    badge: null,
    shortDesc: 'Stimulation et jeu en autonomie pour votre chat.',
    longDesc: 'Ce jouet interactif stimule l\'instinct de chasse de votre chat grâce à ses mouvements aléatoires et sa plume amovible. Idéal pour les moments de jeu en autonomie.',
    features: [
      'Mouvements aléatoires',
      'Plume amovible et remplaçable',
      'Rechargeable (USB-C)',
      'Autonomie 6 heures'
    ],
    images: [
      'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571566882372-1598d8abd90c?auto=format&fit=crop&w=800&q=80'
    ],
    stripePriceId: null,
    related: ['hamac', 'panier']
  },
  panier: {
    id: 'panier',
    name: 'Panier rotin Velora',
    slug: 'panier-rotin-velora',
    price: 35.90,
    oldPrice: null,
    rating: 4.6,
    reviews: 112,
    badge: null,
    shortDesc: 'Un lit rond en rotin tressé à la main, pour des nuits paisibles.',
    longDesc: 'Tressé à la main par des artisans, ce panier en rotin naturel offre à votre chat un cocon douillet et élégant. Son coussin amovible se lave en machine, et sa structure robuste s\'intègre parfaitement à tous les intérieurs.',
    features: [
      'Rotin tressé à la main, robuste et durable',
      'Coussin amovible et lavable en machine',
      'Design naturel, adapté à tous les intérieurs',
      'Structure stable et sécurisée'
    ],
    images: [
      'assets/images/panier-chat.avif',
      'https://images.unsplash.com/photo-1543852786-1cf6534b7f7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80'
    ],
    stripePriceId: null,
    related: ['hamac', 'coussin']
  }
};

function getProduit(id) {
  return produits[id] || null;
}

function getAllProduits() {
  return Object.values(produits);
}