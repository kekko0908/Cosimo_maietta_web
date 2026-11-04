import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import sharp from 'sharp';

const collections = JSON.parse(await readFile('src/versione2/collections-data.json', 'utf8'));
const manifest = JSON.parse(await readFile('src/versione2/image-manifest.json', 'utf8'));
const sources = JSON.parse(await readFile('src/assets/versione2/flickr-selection.json', 'utf8'));
assert.deepEqual(
  collections.map((c) => c.slug),
  ['primi-piani', 'sala-posa', 'in-esterna', 'bianco-e-nero', 'paesaggi', 'cantieri'],
);
assert.equal(new Set(collections.map((c) => c.path)).size, 6);
const referenced = new Set();
for (const collection of collections) {
  assert.ok(
    collection.photoIds.length >= 8 && collection.photoIds.length <= 15,
    `${collection.slug}: curate 8–15 photographs`,
  );
  assert.equal(
    new Set(collection.photoIds).size,
    collection.photoIds.length,
    `${collection.slug}: duplicate photograph`,
  );
  for (const id of collection.photoIds) {
    assert.ok(
      sources.some((source) => source.id === id && source.sourceUrl && source.rightsStatus),
      `${id}: missing provenance`,
    );
    referenced.add(id);
  }
}
for (const id of referenced) {
  const entry = manifest[id];
  assert.ok(
    entry && entry.width && entry.height && entry.widths.length,
    `${id}: incomplete dimensions`,
  );
  const source = await sharp(`src/assets/versione2/source/${id}.jpg`).metadata();
  assert.equal(entry.width, source.width, `${id}: wrong width`);
  assert.equal(entry.height, source.height, `${id}: wrong height`);
  for (const width of entry.widths)
    for (const extension of ['avif', 'webp', 'jpg']) {
      await access(`public/media/cosimo/${id}-${width}.${extension}`);
    }
}
await access('public/media/video/sguardi-anteprima.mp4');
assert.match(await readFile('public/media/video/sguardi-anteprima.vtt', 'utf8'), /03:20\.000/);
console.log(
  `Verified 6 collections, ${referenced.size} unique photographs, responsive sources, provenance and preview video.`,
);
