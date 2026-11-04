import imageManifest from './image-manifest.json';

export type Versione2Variant = 'rivista' | 'cinema' | 'archivio';

export interface Versione2Photo {
  id: string;
  title: string;
  alt: string;
  width: number;
  height: number;
  widths: number[];
  focalPoint?: string;
  sourceUrl: string;
}

export interface Versione2Project {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  description: string;
  photos: Versione2Photo[];
}

const flickr = (id: string) => `https://www.flickr.com/photos/cosimomaietta/${id}/`;

const photo = (
  id: string,
  title: string,
  alt: string,
  width = 680,
  height = 1024,
  focalPoint = '50% 50%',
): Versione2Photo => ({
  id,
  title,
  alt,
  width: imageManifest[id as keyof typeof imageManifest]?.width ?? width,
  height: imageManifest[id as keyof typeof imageManifest]?.height ?? height,
  widths: imageManifest[id as keyof typeof imageManifest]?.widths ?? (width > 800 ? [480, 768, width] : [480, width]),
  focalPoint,
  sourceUrl: flickr(id),
});

export const versione2Photos = {
  zai: photo('55308371026', 'Zai', 'Ritratto editoriale della serie Zai', 680, 1024, '50% 34%'),
  ann01: photo('55308370996', 'Ann I', 'Ritratto in bianco e nero della serie Ann', 680, 1024, '50% 32%'),
  ann02: photo('55308371021', 'Ann II', 'Ritratto ravvicinato della serie Ann', 680, 1024, '50% 30%'),
  ann03: photo('55308531498', 'Ann III', 'Studio di luce sul volto della serie Ann', 680, 1024, '50% 30%'),
  ann04: photo('55308371061', 'Ann IV', 'Ritratto editoriale in luce radente della serie Ann', 680, 1024, '50% 32%'),
  sea: photo('55308363656', 'Sea', 'Ritratto ambientato della serie Sea', 692, 1024, '50% 40%'),
  eyes01: photo('55308363611', 'Eyes I', 'Primo piano fotografico della serie Eyes', 680, 1024, '50% 28%'),
  eyes02: photo('55308600189', 'Eyes II', 'Ritratto orizzontale della serie Eyes', 1024, 680, '50% 42%'),
  cricri01: photo('55308524578', 'CriCri I', 'Ritratto beauty della serie CriCri', 680, 1024, '50% 32%'),
  cri: photo('55305149439', 'Cri', 'Ritratto editoriale della serie Cri', 680, 1024, '50% 34%'),
  cricri02: photo('55304911276', 'CriCri II', 'Studio di posa della serie CriCri', 681, 1024, '50% 30%'),
  cricri03: photo('55304008347', 'CriCri III', 'Ritratto fotografico della serie CriCri', 680, 1024, '50% 35%'),
  cricri04: photo('55303998932', 'CriCri IV', 'Ritratto editoriale della serie CriCri', 680, 1024, '50% 32%'),
  kikka01: photo('55305313455', 'Kikka I', 'Ritratto fashion della serie Kikka', 680, 1024, '50% 34%'),
  kikka02: photo('55303998927', 'Kikka II', 'Ritratto in luce naturale della serie Kikka', 680, 1024, '50% 32%'),
  patrik: photo('54475975706', 'Patrik', 'Ritratto ambientato della serie Patrik', 680, 1024, '50% 38%'),
} as const;

export const versione2Projects: Versione2Project[] = [
  {
    slug: 'volti-monochrome',
    index: '01',
    title: 'Volti / Monochrome',
    eyebrow: 'Ritratto · Bianco e nero',
    description: 'Una ricerca sul volto, sul contrasto e sulla presenza. La luce riduce la scena all’essenziale e lascia parlare lo sguardo.',
    photos: [
      versione2Photos.ann02,
      versione2Photos.ann01,
      versione2Photos.ann03,
      versione2Photos.ann04,
      versione2Photos.zai,
    ],
  },
  {
    slug: 'editorial-portraits',
    index: '02',
    title: 'Editorial Portraits',
    eyebrow: 'Beauty · Fashion',
    description: 'Ritratti costruiti attraverso gesto, styling e prossimità. Ogni immagine cerca un equilibrio tra precisione e spontaneità.',
    photos: [
      versione2Photos.eyes02,
      versione2Photos.eyes01,
      versione2Photos.cricri01,
      versione2Photos.cri,
      versione2Photos.cricri02,
      versione2Photos.cricri03,
    ],
  },
  {
    slug: 'light-outside',
    index: '03',
    title: 'Light / Outside',
    eyebrow: 'On location · Story',
    description: 'Figure, materia e paesaggio entrano nella stessa inquadratura. Un racconto più aperto, guidato dalla luce disponibile.',
    photos: [
      versione2Photos.sea,
      versione2Photos.kikka01,
      versione2Photos.cricri04,
      versione2Photos.kikka02,
      versione2Photos.patrik,
    ],
  },
];

export const versione2Services = [
  {
    index: '01',
    title: 'Portrait',
    copy: 'Ritratti personali, editoriali e professionali con una direzione visiva costruita sul soggetto.',
    details: ['Editoriale', 'Personal branding', 'Talent'],
  },
  {
    index: '02',
    title: 'Fashion & Beauty',
    copy: 'Immagini per lookbook, campagne leggere, talent e contenuti di marca.',
    details: ['Lookbook', 'Beauty', 'Campaign'],
  },
  {
    index: '03',
    title: 'On location',
    copy: 'Produzioni in esterna, backstage e storie visive tra persone e luoghi.',
    details: ['Backstage', 'Evento', 'Visual story'],
  },
];

export const versione2Socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/photographer.cosimomaietta/' },
  { label: 'Flickr', href: 'https://www.flickr.com/photos/cosimomaietta/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@digyminox?lang=it-IT' },
];
