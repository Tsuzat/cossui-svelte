<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { prefersReducedMotion } from 'svelte/motion';
  import { Popover, PopoverPopup } from '#lib/components/ui/popover/index.js';
  import { toggleVariants } from '#lib/components/ui/toggle/toggle-variants.js';
  import { cn } from '#lib/utils.js';
  import { useChatPopupDismissal } from './use-chat-popup-dismissal.svelte.js';

  type Props = {
    animateEntrance?: boolean;
    emoji: string;
    count: number;
    selected: boolean;
    label: string;
    onclick: () => void;
    /** Content of the "who reacted" popup. Opens on hover, keyboard focus, or a touch long-press. */
    reactorContent?: Snippet;
    reactorLabel?: string;
    popupAlign?: ComponentProps<typeof PopoverPopup>['align'];
    class?: string;
  };

  let {
    animateEntrance = false,
    emoji,
    count,
    selected,
    label,
    onclick,
    class: className,
    reactorContent,
    reactorLabel,
    popupAlign
  }: Props = $props();

  const reduceMotion = () => prefersReducedMotion.current;

  let open = $state(false);
  let chip = $state<HTMLElement | null>(null);
  let popup = $state<HTMLElement | null>(null);
  let holdTimer: ReturnType<typeof setTimeout> | null = null;
  let hoverTimer: ReturnType<typeof setTimeout> | null = null;
  let touchOrigin: { x: number; y: number } | null = null;
  let suppressClick = false;

  // Bounce the emoji when the viewer newly reacts.
  let emojiElement = $state<HTMLElement | null>(null);
  // svelte-ignore state_referenced_locally
  let previouslySelected = selected;
  $effect(() => {
    const isSelected = selected;
    if (isSelected && !previouslySelected && emojiElement && !reduceMotion()) {
      emojiElement.animate(
        [
          { transform: 'scale(1) rotate(0deg)' },
          { transform: 'scale(1.55) rotate(-12deg)', offset: 0.35 },
          { transform: 'scale(1.12) rotate(6deg)', offset: 0.65 },
          { transform: 'scale(1) rotate(0deg)' }
        ],
        { duration: 440, easing: 'ease-out' }
      );
    }
    previouslySelected = isSelected;
  });

  function entrance(node: HTMLElement) {
    if (!animateEntrance || reduceMotion()) return;
    node.animate(
      [
        { opacity: 0, transform: 'scale(0.55)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      { duration: 440, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
    );
  }

  function clearHold() {
    if (holdTimer !== null) clearTimeout(holdTimer);
    holdTimer = null;
  }
  function clearHover() {
    if (hoverTimer !== null) clearTimeout(hoverTimer);
    hoverTimer = null;
  }
  $effect(() => () => {
    clearHold();
    clearHover();
  });

  useChatPopupDismissal(
    () => open,
    () => chip,
    () => {
      clearHold();
      if (touchOrigin) suppressClick = true;
      touchOrigin = null;
      open = false;
    }
  );

  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasReactors = $derived(Boolean(reactorContent));
</script>

<span {@attach entrance} class="inline-flex origin-top">
  <span class="inline-flex">
    <button
      bind:this={chip}
      type="button"
      data-slot="chat-reaction-chip"
      aria-label={label}
      aria-pressed={selected}
      data-pressed={selected ? '' : undefined}
      class={cn(
        toggleVariants({ variant: 'outline', size: 'sm' }),
        'h-6 min-w-0 gap-1 rounded-full px-2 text-xs shadow-none transition-transform duration-150 [-webkit-touch-callout:none] before:rounded-full active:scale-95 data-pressed:border-primary/48 data-pressed:bg-primary/12 motion-reduce:scale-100 motion-reduce:transition-none sm:h-6 sm:min-w-0 sm:text-xs dark:data-pressed:bg-primary/8',
        className
      )}
      onclick={() => {
        if (suppressClick) {
          suppressClick = false;
          return;
        }
        onclick();
      }}
      onpointerenter={(event) => {
        if (!hasReactors || event.pointerType === 'touch' || !finePointer()) return;
        clearHover();
        hoverTimer = setTimeout(() => (open = true), 300);
      }}
      onpointerleave={(event) => {
        if (!hasReactors || event.pointerType === 'touch') return;
        clearHover();
        hoverTimer = setTimeout(() => (open = false), 150);
      }}
      onfocus={(event) => {
        if (hasReactors && event.currentTarget.matches(':focus-visible') && !touchOrigin)
          open = true;
      }}
      onblur={(event) => {
        if (hasReactors && !popup?.contains(event.relatedTarget as Node | null)) open = false;
      }}
      onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') suppressClick = false;
      }}
      onpointerdown={(event) => {
        suppressClick = false;
        if (!hasReactors || event.pointerType !== 'touch' || !event.isPrimary) return;
        touchOrigin = { x: event.clientX, y: event.clientY };
        clearHold();
        holdTimer = setTimeout(() => {
          holdTimer = null;
          suppressClick = true;
          open = true;
        }, 500);
      }}
      onpointermove={(event) => {
        const origin = touchOrigin;
        if (!origin || Math.hypot(event.clientX - origin.x, event.clientY - origin.y) <= 8) return;
        clearHold();
        suppressClick = true;
        touchOrigin = null;
        open = false;
      }}
      onpointerup={() => {
        clearHold();
        touchOrigin = null;
      }}
      onpointercancel={() => {
        clearHold();
        touchOrigin = null;
        suppressClick = true;
        open = false;
      }}
      oncontextmenu={(event) => {
        if (touchOrigin || suppressClick) event.preventDefault();
      }}
    >
      <span bind:this={emojiElement} class="inline-flex">{emoji}</span>
      <span class="tabular-nums">{count}</span>
    </button>
  </span>
  {#if reactorContent}
    <Popover
      {open}
      onOpenChange={(next) => {
        if (!next) open = false;
      }}
    >
      <PopoverPopup
        bind:ref={popup}
        customAnchor={chip}
        align={popupAlign}
        initialFocus={false}
        finalFocus={false}
        aria-label={reactorLabel}
        class="w-52 **:data-[slot=popover-viewport]:p-1.5"
        onpointerenter={clearHover}
        onpointerleave={() => {
          clearHover();
          hoverTimer = setTimeout(() => (open = false), 150);
        }}
      >
        {@render reactorContent()}
      </PopoverPopup>
    </Popover>
  {/if}
</span>
