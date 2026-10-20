export type PlaybackStep =
  | { type: 'draft' | 'send' | 'reply'; text: string }
  | { type: 'delivered' | 'typing' };

const EXCHANGES = [
  ['Can we simplify the first step?', 'Absolutely. Just a name and email to get started.'],
  [
    'Nice. And keep the invite optional?',
    'Yes! They can invite their team whenever they’re ready.'
  ],
  ['I’ll give it one more pass on mobile.', 'Thanks. I’ve just updated the prototype for you.'],
  ['Looks good. Let’s ship it!', 'Perfect. I’ll get the release ready 🎉']
] as const;

const STEPS: { delay: number; event: PlaybackStep }[] = EXCHANGES.flatMap(([message, reply]) => {
  const letters = Array.from(message);
  return [
    ...letters.map((_, index) => ({
      delay: index === 0 ? 1600 : 45,
      event: { type: 'draft' as const, text: letters.slice(0, index + 1).join('') }
    })),
    { delay: 650, event: { type: 'send' as const, text: message } },
    { delay: 500, event: { type: 'delivered' as const } },
    { delay: 600, event: { type: 'typing' as const } },
    { delay: 1500, event: { type: 'reply' as const, text: reply } }
  ];
});

/**
 * Plays a scripted exchange into the hero preview while it is at least half
 * visible, the tab is in the foreground and reduced motion is off. Must be
 * constructed during component initialisation (it registers effects).
 */
export class ChatPreviewPlayback {
  /** Bind to the element whose visibility gates playback. */
  element = $state<HTMLElement | null>(null);
  #available = $state(false);
  #visible = $state(false);
  #status = $state<'playing' | 'complete' | 'stopped'>('playing');
  #nextStep = 0;
  #stopped = false;

  constructor(onStep: (step: PlaybackStep) => void) {
    $effect(() => {
      const element = this.element;
      if (!element) return;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updateMotion = () => (this.#available = !motion.matches);
      let inView = false;
      const updateVisibility = () => (this.#visible = inView && !document.hidden);
      const observer = new IntersectionObserver(
        ([entry]) => {
          inView = (entry?.intersectionRatio ?? 0) >= 0.5;
          updateVisibility();
        },
        { threshold: 0.5 }
      );
      observer.observe(element);
      updateMotion();
      motion.addEventListener('change', updateMotion);
      document.addEventListener('visibilitychange', updateVisibility);
      return () => {
        observer.disconnect();
        motion.removeEventListener('change', updateMotion);
        document.removeEventListener('visibilitychange', updateVisibility);
      };
    });

    $effect(() => {
      if (!this.#available || !this.#visible || this.#status !== 'playing') return;
      let timer: number;
      const schedule = () => {
        const step = STEPS[this.#nextStep];
        if (!step) {
          this.#status = 'complete';
          return;
        }
        timer = window.setTimeout(() => {
          if (this.#stopped) return;
          this.#nextStep += 1;
          onStep(step.event);
          schedule();
        }, step.delay);
      };
      schedule();
      return () => window.clearTimeout(timer);
    });
  }

  get active(): boolean {
    return this.#available && this.#status === 'playing';
  }

  /** Stops playback for good. Returns whether it was still mid-script. */
  stop(): boolean {
    if (this.#stopped) return false;
    this.#stopped = true;
    const wasPlaying = this.#status !== 'complete';
    this.#status = 'stopped';
    return wasPlaying;
  }
}
