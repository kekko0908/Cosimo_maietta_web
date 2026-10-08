import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  description: string;
  year: number;
  medium: string;
  dimensions: string;
  collectionId?: string;
}

export interface Artist {
  id: string;
  name: string;
  location: string;
  category: string;
  avatar: string;
  coverImage: string;
  bio: string;
  collections?: Collection[];
}

export const ARTISTS: Artist[] = [
  {
    id: "elena-vance",
    name: "Elena Vance",
    location: "Italia",
    category: "Pittura",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=1000&auto=format&fit=crop",
    bio: "Elena Vance è una pittrice contemporanea nota per il suo uso evocativo del colore e della luce. Le sue opere esplorano la quiete nel caos moderno.",
    collections: [
      {
        id: "silent-spaces",
        title: "Silent Spaces",
        description: "Una serie dedicata alla ricerca del silenzio interiore attraverso paesaggi astratti.",
        coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: "blue-period",
        title: "Blue Period",
        description: "Esplorazioni monocromatiche sulle sfumature della malinconia e della profondità.",
        coverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    location: "Regno Unito",
    category: "Scultura",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop",
    bio: "Marcus Thorne trasforma materiali industriali in forme organiche, sfidando la percezione dello spazio urbano e della decadenza.",
    collections: [
      {
        id: "urban-geometry",
        title: "Urban Geometry",
        description: "Forme rigide che incontrano il caos della città.",
        coverImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    location: "Stati Uniti",
    category: "Mixed Media",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop",
    bio: "Sarah Jenkins combina fotografia, pittura e collage per creare narrazioni visive complesse che indagano la memoria e l'identità.",
    collections: [
      {
        id: "memory-fragments",
        title: "Memory Fragments",
        description: "Frammenti di ricordi ricomposti in nuove narrazioni visive.",
        coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "david-chen",
    name: "David Chen",
    location: "Cina",
    category: "Pittura",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop",
    bio: "David Chen è maestro nel catturare la luce effimera. I suoi paesaggi ad olio sono meditazioni sulla transitorietà della natura.",
    collections: [
      {
        id: "luminous-landscapes",
        title: "Luminous Landscapes",
        description: "Paesaggi che catturano la luce in momenti di transizione.",
        coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  }
];

export const ARTWORKS: Artwork[] = [
  {
    id: "1",
    title: "Ethereal Silence",
    artist: "Elena Vance",
    price: 1200,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=1000&auto=format&fit=crop",
    description: "A study of quiet moments in a chaotic world, rendered in oil on canvas.",
    year: 2023,
    medium: "Oil on Canvas",
    dimensions: "120x100 cm",
    collectionId: "silent-spaces"
  },
  {
    id: "1b",
    title: "Whispering Winds",
    artist: "Elena Vance",
    price: 1100,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    description: "Soft strokes capturing the movement of wind.",
    year: 2023,
    medium: "Oil on Canvas",
    dimensions: "100x80 cm",
    collectionId: "silent-spaces"
  },
  {
    id: "2",
    title: "Urban Decay",
    artist: "Marcus Thorne",
    price: 850,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop",
    description: "The beauty found in the forgotten corners of the city.",
    year: 2022,
    medium: "Acrylic on Wood",
    dimensions: "80x60 cm",
    collectionId: "urban-geometry"
  },
  {
    id: "3",
    title: "Abstract Thoughts",
    artist: "Sarah Jenkins",
    price: 2100,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop",
    description: "An exploration of the subconscious mind through color and form.",
    year: 2024,
    medium: "Mixed Media",
    dimensions: "150x150 cm",
    collectionId: "memory-fragments"
  },
  {
    id: "3b",
    title: "Layered Memories",
    artist: "Sarah Jenkins",
    price: 1900,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
    description: "Collage of textures representing fading memories.",
    year: 2023,
    medium: "Mixed Media",
    dimensions: "120x120 cm",
    collectionId: "memory-fragments"
  },
  {
    id: "4",
    title: "Golden Hour",
    artist: "David Chen",
    price: 1500,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop",
    description: "Capturing the fleeting moment of perfect light.",
    year: 2023,
    medium: "Oil on Linen",
    dimensions: "100x80 cm",
    collectionId: "luminous-landscapes"
  },
  {
    id: "4b",
    title: "Morning Mist",
    artist: "David Chen",
    price: 1600,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop",
    description: "The serenity of a misty morning landscape.",
    year: 2023,
    medium: "Oil on Linen",
    dimensions: "110x90 cm",
    collectionId: "luminous-landscapes"
  },
  {
    id: "5",
    title: "Midnight Blue",
    artist: "Elena Vance",
    price: 1800,
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    description: "Deep, resonant blues that evoke the mystery of the night sky.",
    year: 2021,
    medium: "Acrylic on Canvas",
    dimensions: "120x120 cm",
    collectionId: "blue-period"
  },
  {
    id: "6",
    title: "Fragmented Reality",
    artist: "Marcus Thorne",
    price: 950,
    image: "https://images.unsplash.com/photo-1515405295579-ba7b454989ab?q=80&w=1000&auto=format&fit=crop",
    description: "Breaking down perception into geometric forms.",
    year: 2023,
    medium: "Digital Print",
    dimensions: "60x90 cm",
    collectionId: "urban-geometry"
  }
];

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    lat: number;
    lng: number;
    address: string;
  };
  image: string;
  artistIds: string[];
  artworkIds: string[];
}

export const EXHIBITIONS: Exhibition[] = [
  {
    id: "modern-silence",
    title: "Modern Silence",
    description: "Un'esplorazione del silenzio nell'arte contemporanea, dove l'assenza di rumore diventa presenza visiva.",
    startDate: "2026-04-01",
    endDate: "2026-05-15",
    location: {
      name: "Museo Madre",
      lat: 40.8541,
      lng: 14.2592,
      address: "Via Settembrini, 79, Napoli"
    },
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1000&auto=format&fit=crop",
    artistIds: ["elena-vance", "david-chen"],
    artworkIds: ["1", "1b", "4", "4b"]
  },
  {
    id: "urban-decay-exhibit",
    title: "Urban Decay & Rebirth",
    description: "Come la città muore e rinasce attraverso le forme geometriche e i materiali industriali.",
    startDate: "2026-04-20",
    endDate: "2026-06-10",
    location: {
      name: "PAN - Palazzo delle Arti",
      lat: 40.8363,
      lng: 14.2335,
      address: "Via dei Mille, 60, Napoli"
    },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    artistIds: ["marcus-thorne"],
    artworkIds: ["2", "6"]
  },
  {
    id: "memory-lanes",
    title: "Memory Lanes",
    description: "Un viaggio attraverso i frammenti della memoria collettiva e individuale.",
    startDate: "2026-11-01",
    endDate: "2026-12-31",
    location: {
      name: "Maschio Angioino",
      lat: 40.8384,
      lng: 14.2536,
      address: "Piazza Municipio, Napoli"
    },
    image: "https://images.unsplash.com/photo-1507643179173-39db4f92b816?q=80&w=1000&auto=format&fit=crop",
    artistIds: ["sarah-jenkins"],
    artworkIds: ["3", "3b"]
  }
];
