// Public Flickr metadata only; never execute scripts returned by the page.
import { mkdir, writeFile } from 'node:fs/promises';

const base = 'https://www.flickr.com/photos/cosimomaietta/';
const paths = [
  '',
  'page2/',
  'page3/',
  'page4/',
  'page5/',
  'page6/',
  'page7/',
  'page8/',
  'page9/',
  'page10/',
  'albums/72157681201543756/',
  'albums/72157676889648504/',
  'albums/72157636840450715/',
];

function exportedModel(html) {
  const start = html.indexOf('modelExport: ') + 'modelExport: '.length;
  if (start < 'modelExport: '.length) throw new Error('Flickr metadata not found');
  let depth = 0,
    quoted = false,
    escaped = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') quoted = false;
    } else if (c === '"') quoted = true;
    else if (c === '{' || c === '[') depth++;
    else if ((c === '}' || c === ']') && --depth === 0) return JSON.parse(html.slice(start, i + 1));
  }
  throw new Error('Incomplete Flickr metadata');
}

const photos = new Map();
function collect(node, origin) {
  if (!node || typeof node !== 'object') return;
  if (node._flickrModelRegistry === 'photo-models' && node.sizes?.data) {
    const sizes = Object.values(node.sizes.data)
      .map((s) => s.data)
      .filter(Boolean);
    photos.set(node.id, {
      id: node.id,
      title: node.title,
      license: node.license,
      source: origin,
      sizes: sizes.map((s) => ({
        width: s.width,
        height: s.height,
        url: `https:${s.url ?? s.displayUrl}`,
      })),
    });
  }
  for (const value of Object.values(node)) collect(value, origin);
}

await mkdir('output/flickr', { recursive: true });
for (const part of paths) {
  const url = base + part;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  collect(exportedModel(await response.text()).main, url);
  console.log(`${part || 'photostream'}: ${photos.size} photos collected`);
}
await writeFile('output/flickr/catalog.json', JSON.stringify([...photos.values()], null, 2) + '\n');
