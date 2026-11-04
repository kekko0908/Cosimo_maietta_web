import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ResponsivePhoto } from './ResponsivePhoto';
import type { Versione2Photo } from './content';

export function PhotoViewer({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Versione2Photo[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen || !dialog.current) return;
    opener.current = document.activeElement as HTMLElement;
    dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.current?.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const move = (direction: number) =>
    onChange(((index ?? 0) + direction + photos.length) % photos.length);
  return (
    <dialog
      ref={dialog}
      className="v2-viewer"
      aria-labelledby="viewer-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      {index !== null && photos[index] && (
        <div className="v2-viewer-inner">
          <div className="v2-viewer-top">
            <p id="viewer-title">{photos[index].title}</p>
            <button type="button" onClick={onClose} aria-label="Chiudi fotografia">
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="v2-viewer-photo" key={photos[index].id}>
            <ResponsivePhoto photo={photos[index]} sizes="95vw" priority />
          </div>
          <div className="v2-viewer-bottom">
            <button type="button" onClick={() => move(-1)} aria-label="Fotografia precedente">
              <ChevronLeft aria-hidden="true" />
            </button>
            <span aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <span className="v2-viewer-credit">© Fotografie dell’autore</span>
            <button type="button" onClick={() => move(1)} aria-label="Fotografia successiva">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
