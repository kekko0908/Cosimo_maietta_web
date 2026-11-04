import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

// Run collect-flickr.mjs first. This selection excludes the image titled "Dile AI".
const ids = [
  '55308371026',
  '55308370996',
  '55308371021',
  '55308531498',
  '55308371061',
  '55308363656',
  '55308363611',
  '55308600189',
  '55308524578',
  '55305149439',
  '55304911276',
  '55304008347',
  '55303998932',
  '55305313455',
  '55303998927',
  '54475975706',
  '54475975711',
  '54287558454',
  '51892675726',
  '54231809030',
  '53579138809',
  '53575860532',
  '54476170594',
  '55629604522',
  '55630736283',
  '54286435092',
  '51891431956',
  '54287747455',
  '53577050404',
  '32589307800',
  '32816057272',
  '33341349306',
  '32845938781',
  '32845314431',
  '32815854362',
  '32929515476',
  '32155657223',
  '32589408170',
  '18245661161',
  '32845963731',
  '32845813191',
  '23475988346',
  '23206334480',
  '36115008293',
  '36526506550',
  '36923130525',
  '36114617263',
  '32589334430',
  '32156089163',
];
const catalog = JSON.parse(await readFile('output/flickr/catalog.json', 'utf8'));
const records = [];
await mkdir('src/assets/versione2/source', { recursive: true });
for (const id of ids) {
  const item = catalog.find((p) => p.id === id);
  if (!item) throw new Error(`Photo ${id} not in catalog`);
  const sizes = item.sizes
    .filter((s) => Math.max(s.width, s.height) <= 2048)
    .sort((a, b) => b.width - a.width);
  const chosen = sizes[0];
  if (!chosen) throw new Error(`Photo ${id} has no suitable size`);
  const response = await fetch(chosen.url);
  if (!response.ok) throw new Error(`${id}: ${response.status}`);
  await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .jpeg({ quality: 96 })
    .toFile(`src/assets/versione2/source/${id}.jpg`);
  records.push({
    id,
    title: item.title,
    sourceUrl: `https://www.flickr.com/photos/cosimomaietta/${id}/`,
    downloadUrl: chosen.url,
    license: item.license,
    rightsStatus: 'user-authorized-preview',
  });
  console.log(`${id}: ${chosen.width}x${chosen.height}`);
}
await writeFile(
  'src/assets/versione2/flickr-selection.json',
  JSON.stringify(records, null, 2) + '\n',
);
