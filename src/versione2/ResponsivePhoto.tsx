import { useState, type CSSProperties } from 'react';
import type { Versione2Photo } from './content';

interface ResponsivePhotoProps {
  photo: Versione2Photo;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
}

const sourceSet = (photo: Versione2Photo, extension: 'avif' | 'webp' | 'jpg') =>
  photo.widths
    .map((width) => `/media/cosimo/${photo.id}-${width}.${extension} ${width}w`)
    .join(', ');

export function ResponsivePhoto({
  photo,
  className = '',
  imageClassName = '',
  sizes,
  priority = false,
}: ResponsivePhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const largestWidth = photo.widths.at(-1) ?? photo.width;
  const style = { '--photo-position': photo.focalPoint } as CSSProperties;

  return (
    <picture
      className={`v2-photo ${loaded ? 'is-loaded' : ''} ${className}`}
      style={style}
    >
      <source srcSet={sourceSet(photo, 'avif')} sizes={sizes} type="image/avif" />
      <source srcSet={sourceSet(photo, 'webp')} sizes={sizes} type="image/webp" />
      <img
        src={`/media/cosimo/${photo.id}-${largestWidth}.jpg`}
        srcSet={sourceSet(photo, 'jpg')}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        className={imageClassName}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
      />
    </picture>
  );
}
