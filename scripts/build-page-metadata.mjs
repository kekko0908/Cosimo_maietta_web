import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from 'vite';

const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env };
const preview = env.VERCEL_ENV === 'preview' || env.VITE_PREVIEW_MODE !== 'false';
const origin =
  env.VERCEL_ENV === 'preview' && env.VERCEL_URL
    ? `https://${env.VERCEL_URL}`
    : env.VITE_SITE_URL || 'https://photographer.cosimomaietta.example';
const site = new URL(origin);
if (!preview && site.hostname.endsWith('.example'))
  throw new Error('Set VITE_SITE_URL before enabling public indexing.');
const collections = JSON.parse(await readFile('src/versione2/collections-data.json', 'utf8'));
const routes = [
  {
    path: '/',
    title: 'Portrait & Editorial Photographer',
    description:
      'Cosimo Maietta: ritratti, sala posa, storie in esterna, bianco e nero, paesaggi e uno sguardo sulla professione da geometra.',
    image: '55308600189',
  },
  {
    path: '/archivio',
    title: 'Archivio fotografico',
    description:
      'Esplora tutte le fotografie di Cosimo Maietta per primi piani, sala posa, esterna, bianco e nero, paesaggi e architetture.',
    image: '55308531498',
  },
  ...collections.map((collection) => ({
    path: collection.path,
    title: collection.title,
    description: collection.description,
    image: collection.photoIds[0],
  })),
  { path: '/chi-sono', title: 'Chi sono', description: 'Fotografia e professione da geometra: uno sguardo sul volto, sulla luce e sui luoghi, con base a Napoli.', image: '23475988346' },
  {
    path: '/privacy',
    title: 'Privacy e contatti',
    description: 'Come funzionano i contatti e i servizi esterni nel portfolio di Cosimo Maietta.',
    image: '55308600189',
  },
];
const template = await readFile('dist/index.html', 'utf8');
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
for (const route of routes) {
  const title = `${route.title} — Cosimo Maietta`;
  const url = new URL(route.path, site).href;
  const image = new URL(`/media/cosimo/${route.image}-1080.jpg`, site).href;
  const extra =
    `<meta name="robots" content="${preview ? 'noindex, nofollow' : 'index, follow'}" />\n` +
    `<link rel="canonical" href="${escape(url)}" />\n` +
    `<meta property="og:title" content="${escape(title)}" />\n` +
    `<meta property="og:description" content="${escape(route.description)}" />\n` +
    `<meta property="og:type" content="website" />\n` +
    `<meta property="og:url" content="${escape(url)}" />\n` +
    `<meta property="og:image" content="${escape(image)}" />\n` +
    `<meta name="twitter:card" content="summary_large_image" />\n`;
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(route.description)}" />`,
    )
    .replace('</head>', extra + '</head>');
  const directory = path.join('dist', route.path);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
}
await writeFile(
  'dist/robots.txt',
  preview
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site).href}\n`,
);
if (!preview)
  await writeFile(
    'dist/sitemap.xml',
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      routes
        .map((r) => `  <url><loc>${escape(new URL(r.path, site).href)}</loc></url>`)
        .join('\n') +
      '\n</urlset>\n',
  );
console.log(
  `Prepared metadata for ${routes.length} routes (${preview ? 'preview, noindex' : 'public'}).`,
);
