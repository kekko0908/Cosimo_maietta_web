import { writeFile, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ids = ['23206334480', '55308600189', '32589307800', '36923130525', '51891431956'];
await mkdir('output/video', { recursive: true });
await mkdir('public/media/video', { recursive: true });
for (const id of ids) {
  const segment = spawnSync(
    'ffmpeg',
    [
      '-hide_banner',
      '-loglevel',
      'error',
      '-y',
      '-loop',
      '1',
      '-i',
      `src/assets/versione2/source/${id}.jpg`,
      '-vf',
      'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p',
      '-t',
      '40',
      '-r',
      '12',
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-crf',
      '24',
      '-an',
      `output/video/${id}.mp4`,
    ],
    { stdio: 'inherit' },
  );
  if (segment.status !== 0) throw new Error(`FFmpeg failed for ${id}`);
}
await writeFile(
  'output/video/preview.ffconcat',
  'ffconcat version 1.0\n' +
    ids
      .map((id) => `file '${path.resolve(`output/video/${id}.mp4`).replaceAll('\\', '/')}'`)
      .join('\n') +
    '\n',
);
const result = spawnSync(
  'ffmpeg',
  [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    'output/video/preview.ffconcat',
    '-c',
    'copy',
    '-movflags',
    '+faststart',
    'public/media/video/sguardi-anteprima.mp4',
  ],
  { stdio: 'inherit' },
);
if (result.status !== 0) throw new Error('FFmpeg did not create the preview');
