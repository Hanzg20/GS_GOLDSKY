'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Apex's beaver (GS-SSP docs/mascot, the same character as in Ourea and Iris)
// acting out one question: idle, listening, thinking, done. Loops while on
// screen; under reduced motion it stays on the answer. The exchange is an
// example of the kind of question Apex takes, not a real store's numbers.
const STEPS = [
  { state: 'idle', ms: 1600 },
  { state: 'listening', ms: 2000 },
  { state: 'thinking', ms: 1800 },
  { state: 'done', ms: 4200 },
] as const;
type State = (typeof STEPS)[number]['state'];

const ALT: Record<State, string> = {
  idle: 'Apex, a beaver with a headset, waving',
  listening: 'Apex listening, one paw on the headset',
  thinking: 'Apex thinking',
  done: 'Apex giving a thumbs up',
};

export function ApexBeaver({ className }: { className?: string }) {
  const [step, setStep] = useState(3);
  const [play, setPlay] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => setPlay(e.isIntersecting), { threshold: 0.4 });
    if (root.current) io.observe(root.current);
    setStep(0);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step].ms);
    return () => clearTimeout(t);
  }, [play, step]);

  const state = STEPS[step].state;
  const asked = step >= 1;
  const answered = step === 3;

  return (
    <div ref={root} className={cn('flex flex-col', className)}>
      <div className="flex flex-col gap-2" aria-live="off">
        <p
          className={cn(
            'body-6 max-w-[85%] self-end rounded-2xl rounded-br-md bg-cream/10 px-4 py-2 text-cream transition-[opacity,transform] duration-500 ease-gs',
            asked ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          How much did we sell today?
        </p>
        <p
          className={cn(
            'body-6 max-w-[85%] self-start rounded-2xl rounded-bl-md bg-brand px-4 py-2 text-cream transition-[opacity,transform] duration-500 ease-gs',
            answered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          {step === 2 ? '…' : 'Here is today, with last Tuesday beside it, and where each number comes from.'}
        </p>
      </div>
      <div className="relative mx-auto mt-4 aspect-square w-full max-w-[300px]">
        {STEPS.map((s) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.state}
            src={`/images/apex/beaver-${s.state}.webp`}
            width={480}
            height={480}
            alt={s.state === state ? ALT[s.state] : ''}
            aria-hidden={s.state !== state}
            loading="lazy"
            decoding="async"
            className={cn(
              'absolute inset-0 h-full w-full object-contain transition-opacity duration-300',
              s.state === state ? 'opacity-100' : 'opacity-0',
              s.state === state && s.state === 'idle' && 'motion-safe:animate-[beaver-bob_1.6s_ease-in-out_infinite]',
            )}
          />
        ))}
      </div>
      <p className="caption-5 mt-2 text-center text-cream/50">Example question</p>
    </div>
  );
}
