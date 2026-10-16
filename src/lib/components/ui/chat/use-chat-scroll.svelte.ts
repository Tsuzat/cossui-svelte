import { prefersReducedMotion } from 'svelte/motion';
export type ChatScrollOptions = {
  active?: boolean;
  paused?: boolean;
  itemCount: number;
  layoutKey?: string | number;
  onReachEnd?: () => void;
};

/**
 * Keeps a chat viewport pinned to the latest message and tracks whether the
 * reader scrolled away. Must be constructed during component initialisation.
 */
export class ChatScroll {
  #options: () => ChatScrollOptions;
  viewport = $state<HTMLElement | null>(null);
  showJump = $state(false);
  /** Whether the viewport is (close to) the bottom; read and written imperatively. */
  atBottom = true;

  constructor(options: () => ChatScrollOptions) {
    this.#options = options;

    // Follow content changes before scroll events can misinterpret the new height.
    $effect(() => {
      const { active = true, paused = false, itemCount, layoutKey } = this.#options();
      void itemCount;
      void layoutKey;
      const viewport = this.viewport;
      if (!active || paused || !viewport) return;
      if (this.atBottom) {
        viewport.scrollTop = viewport.scrollHeight;
        this.showJump = false;
      } else {
        this.showJump = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight > 64;
      }
    });

    $effect(() => {
      const { active = true, paused = false } = this.#options();
      const viewport = this.viewport;
      if (!active || paused || !viewport) return;
      let observer: ResizeObserver | undefined;
      const frame = requestAnimationFrame(() => {
        observer = new ResizeObserver(() => {
          if (this.atBottom) viewport.scrollTop = viewport.scrollHeight;
        });
        observer.observe(viewport);
        if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);
      });
      return () => {
        cancelAnimationFrame(frame);
        observer?.disconnect();
      };
    });
  }

  updatePosition = (): void => {
    const viewport = this.viewport;
    this.atBottom = Boolean(
      viewport && viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 64
    );
  };

  onScroll = (): void => {
    const { paused = false, onReachEnd } = this.#options();
    if (paused) return;
    this.updatePosition();
    this.showJump = !this.atBottom;
    if (this.atBottom) onReachEnd?.();
  };

  resetScroll = (atBottom = true): void => {
    this.atBottom = atBottom;
    this.showJump = !atBottom;
    requestAnimationFrame(() => {
      const viewport = this.viewport;
      if (viewport) viewport.scrollTop = atBottom ? viewport.scrollHeight : 0;
    });
  };

  scrollToLatest = (): void => {
    this.atBottom = true;
    this.viewport?.scrollTo({
      top: this.viewport.scrollHeight,
      behavior: prefersReducedMotion.current ? 'auto' : 'smooth'
    });
  };
}
