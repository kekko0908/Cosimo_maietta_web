import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDirectory = path.resolve('src/assets/versione2/source');
const outputDirectory = path.resolve('public/media/cosimo');
const requestedWidths = [480, 768, 1080, 1440, 1920];
const manifest = {};

await mkdir(outputDirectory, { recursive: true });

const sourceFiles = (await readdir(sourceDirectory))
  .filter((file) => /\.(jpe?g|png|tiff?)$/i.test(file))
  .sort();

for (const sourceFile of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, sourceFile);
  const image = sharp(sourcePath, { failOn: 'warning' }).rotate();
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Dimensioni non leggibili per ${sourceFile}`);
  }

  const basename = path.parse(sourceFile).name;
  const widths = [...new Set([
    ...requestedWidths.filter((width) => width < metadata.width),
    metadata.width,
  ])].sort((a, b) => a - b);
  manifest[basename] = { width: metadata.width, height: metadata.height, widths };

  for (const width of widths) {
    const pipeline = image
      .clone()
      .resize({ width, withoutEnlargement: true, fit: 'inside' })
      .withMetadata({ orientation: undefined });

    await Promise.all([
      pipeline
        .clone()
        .avif({ quality: 60, effort: 6, chromaSubsampling: '4:4:4' })
        .toFile(path.join(outputDirectory, `${basename}-${width}.avif`)),
      pipeline
        .clone()
        .webp({ quality: 82, effort: 5, smartSubsample: true })
        .toFile(path.join(outputDirectory, `${basename}-${width}.webp`)),
      pipeline
        .clone()
        .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toFile(path.join(outputDirectory, `${basename}-${width}.jpg`)),
    ]);
  }

  console.log(`${sourceFile}: ${metadata.width}x${metadata.height} -> ${widths.join(', ')}w`);
}

await writeFile('src/versione2/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
