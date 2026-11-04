import definitions from './collections-data.json';
import manifest from './image-manifest.json';
import sourceRecords from '../assets/versione2/flickr-selection.json';
import { versione2Photos, type Versione2Photo, type Versione2Project } from './content';

export interface PortfolioPhoto extends Versione2Photo {
  themes: string[];
  monochrome: boolean;
  rightsStatus: string;
}

export interface PortfolioCollection extends Versione2Project {
  path: string;
  label: string;
  layout: string;
  previewNote?: string;
  photos: PortfolioPhoto[];
}

const captions: Record<string, [string, string]> = {
  '54475975711': ['Dile', 'Primo piano a colori, luce sul viso e sfondo scuro'],
  '54287558454': ['Dile / Luce naturale', 'Ritratto ravvicinato in luce naturale'],
  '51892675726': ['Simona', 'Primo piano con lo sguardo rivolto verso l’obiettivo'],
  '54231809030': ['Studio / Movimento', 'Ritratto in studio con i capelli in movimento'],
  '53579138809': ['Barby', 'Ritratto in studio su fondo scuro'],
  '53575860532': ['Ann / Studio', 'Ritratto in bianco e nero con le braccia sollevate'],
  '54476170594': ['Studio / Ombra', 'Primo piano in bianco e nero tra luce e ombra'],
  '55629604522': ['Flavia I', 'Ritratto ambientato tra il verde, in luce naturale'],
  '55630736283': ['Flavia II', 'Ritratto in esterna con il verde sullo sfondo'],
  '54286435092': ['Paola I', 'Figura in bianco e nero immersa nella vegetazione'],
  '51891431956': ['AnnaPia / Tramonto', 'Ritratto in riva al mare al tramonto'],
  '54287747455': ['Paola II', 'Ritratto in bianco e nero in un giardino'],
  '53577050404': ['Cry / Mare', 'Ritratto in acqua con cielo e mare sullo sfondo'],
  '32589307800': ['Salento / La costa', 'Costa del Salento e porto sotto un cielo azzurro'],
  '32816057272': ['Salento / Acqua', 'Scogli e acqua turchese sulla costa del Salento'],
  '33341349306': [
    'Costa tirrenica / Tramonto',
    'Tramonto arancione sul mare, alberatura in controluce',
  ],
  '32845938781': ['Salento / Il sentiero', 'Passerella in legno tra gli scogli e il mare'],
  '32845314431': ['Salento / Ultima luce', 'Riva rocciosa e mare in controluce'],
  '32815854362': ['Salento / Le barche', 'Barche ormeggiate nel porto sotto un cielo nuvoloso'],
  '32929515476': ['Salento / La baia', 'Scogliera e insenatura sul mare del Salento'],
  '32155657223': ['Salento / Sul mare', 'Edifici affacciati su una baia turchese'],
  '32589408170': ['Salento / La torre', 'Torre in pietra sulla scogliera'],
  '18245661161': ['Torre Lapillo', 'Pontile proteso sul mare sotto un cielo con nuvole'],
  '32845963731': ['Salento / La riva', 'Edifici lungo una riva rocciosa e mare azzurro'],
  '32845813191': ['Santa Maria di Leuca', 'Colonnato e lungomare sotto un cielo aperto'],
  '23206334480': ['Perugia / Corte', 'Corte interna tra facciate in pietra'],
  '23475988346': ['Perugia / Facciate', 'Facciate e scale in pietra nel centro di Perugia'],
  '36923130525': ['Alberobello / Pietra', 'Pietre e coperture di un trullo ad Alberobello'],
  '36526506550': ['Alberobello / Coperture', 'Successione di tetti in pietra ad Alberobello'],
  '36115008293': [
    'Alberobello / Soglie',
    'Ingresso di un trullo con pareti chiare e dettagli in pietra',
  ],
  '36114617263': [
    'Alberobello / Materia',
    'Facciata di un trullo, bicicletta e fiori davanti alla porta',
  ],
  '32589334430': ['Salento / Il vicolo', 'Vicolo lastricato tra edifici in pietra'],
  '32156089163': ['Salento / Prospettive', 'Strada tra edifici chiari in bianco e nero'],
};
const originals = new Map(Object.values(versione2Photos).map((p) => [p.id, p]));
const monochrome = new Set(definitions.find((c) => c.slug === 'bianco-e-nero')!.photoIds);
monochrome.add('32156089163');

const catalog = new Map<string, PortfolioPhoto>(
  sourceRecords.map((record) => {
    const dimensions = manifest[record.id as keyof typeof manifest];
    if (!dimensions) throw new Error(`Missing image metadata: ${record.id}`);
    const original = originals.get(record.id);
    const [title, alt] = captions[record.id] ?? [
      original?.title ?? record.title,
      original?.alt ?? record.title,
    ];
    return [
      record.id,
      {
        ...dimensions,
        id: record.id,
        title,
        alt,
        focalPoint: original?.focalPoint ?? '50% 42%',
        sourceUrl: record.sourceUrl,
        themes: definitions.filter((c) => c.photoIds.includes(record.id)).map((c) => c.slug),
        monochrome: monochrome.has(record.id),
        rightsStatus: record.rightsStatus,
      },
    ];
  }),
);

export const portfolioCollections: PortfolioCollection[] = definitions.map(
  ({ photoIds, ...definition }) => ({
    ...definition,
    photos: photoIds.map((id) => {
      const photo = catalog.get(id);
      if (!photo) throw new Error(`Missing photograph: ${id}`);
      return photo;
    }),
  }),
);
export const portfolioPhotos = [...catalog.values()].filter((p) => p.themes.length > 0);
export const collectionPath = (project: Versione2Project) =>
  'path' in project ? String(project.path) : `/progetti/${project.slug}`;
