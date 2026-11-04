import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// An original, quiet synthesized chord. No third-party music or network request.
export function AmbientSound() {
  const context = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const [active, setActive] = useState(false);
  const [volume, setVolume] = useState(25);
  const [error, setError] = useState('');
  const stop = () => {
    const previous = context.current;
    context.current = null;
    master.current = null;
    if (previous && previous.state !== 'closed') void previous.close();
    setActive(false);
  };
  useEffect(() => {
    const onPlay = (event: Event) => {
      if (event.target instanceof HTMLMediaElement) stop();
    };
    document.addEventListener('play', onPlay, true);
    return () => {
      document.removeEventListener('play', onPlay, true);
      const previous = context.current;
      if (previous && previous.state !== 'closed') void previous.close();
    };
  }, []);
  const start = async () => {
    try {
      document.querySelectorAll<HTMLMediaElement>('video, audio').forEach((media) => media.pause());
      const audio = new AudioContext();
      context.current = audio;
      const gain = audio.createGain();
      gain.gain.value = 0;
      gain.connect(audio.destination);
      master.current = gain;
      [130.81, 196, 261.63].forEach((frequency, index) => {
        const oscillator = audio.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        oscillator.detune.value = index === 1 ? -3 : 3;
        oscillator.connect(gain);
        oscillator.start();
      });
      await audio.resume();
      gain.gain.linearRampToValueAtTime(volume / 2500, audio.currentTime + 2);
      setActive(true);
      setError('');
    } catch {
      stop();
      setError('Audio non disponibile in questo browser.');
    }
  };
  return (
    <div className="v2-ambient">
      <button type="button" aria-pressed={active} onClick={active ? stop : start}>
        {active ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}Suono ambientale /{' '}
        {active ? 'On' : 'Off'}
      </button>
      {active && (
        <label>
          Volume
          <input
            aria-label="Volume del suono ambientale"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => {
              const next = Number(event.target.value);
              setVolume(next);
              if (master.current && context.current)
                master.current.gain.setTargetAtTime(next / 2500, context.current.currentTime, 0.1);
            }}
          />
        </label>
      )}
      {error && <span role="status">{error}</span>}
    </div>
  );
}
