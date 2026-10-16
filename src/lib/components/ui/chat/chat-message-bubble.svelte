<script lang="ts">
  import { untrack } from 'svelte';
  import type { ComponentProps } from 'svelte';
  import { prefersReducedMotion } from 'svelte/motion';
  import { cn } from '#lib/utils.js';
  import ChatBubble from './chat-bubble.svelte';

  type Props = Omit<ComponentProps<typeof ChatBubble>, 'align' | 'variant' | 'grouped'> & {
    side: 'incoming' | 'outgoing';
    firstInGroup?: boolean;
    animateEntrance?: boolean;
    highlighted?: boolean;
    onAnimationComplete?: () => void;
  };

  let {
    ref = $bindable(null),
    side,
    firstInGroup = true,
    animateEntrance = false,
    highlighted = false,
    onAnimationComplete,
    class: className,
    children,
    ...restProps
  }: Props = $props();

  const entranceOrigin = $derived(
    side === 'outgoing'
      ? 'origin-top-right rtl:origin-top-left'
      : 'origin-top-left rtl:origin-top-right'
  );

  const reduceMotion = () => prefersReducedMotion.current;

  // Spring-like pop when a message first appears.
  function entrance(node: HTMLElement) {
    untrack(() => {
      if (!animateEntrance) return;
      if (reduceMotion()) {
        onAnimationComplete?.();
        return;
      }
      const animation = node.animate([{ transform: 'scale(0.92)' }, { transform: 'scale(1)' }], {
        duration: 350,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      });
      animation.onfinish = () => onAnimationComplete?.();
    });
  }

  // Brief attention pulse when the message is jumped to.
  function attention(node: HTMLElement) {
    if (!highlighted || reduceMotion()) return;
    const animation = node.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)', offset: 0.28 },
        { transform: 'scale(1)' }
      ],
      { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
    return () => animation.cancel();
  }

  function ring(node: HTMLElement) {
    if (reduceMotion()) return;
    node.animate([{ opacity: 0 }, { opacity: 1, offset: 0.28 }, { opacity: 0 }], {
      duration: 420,
      easing: 'ease-out'
    });
  }
</script>

<ChatBubble
  bind:ref
  {...restProps}
  align={side === 'outgoing' ? 'end' : 'start'}
  variant={side === 'outgoing' ? 'default' : 'muted'}
  grouped={!firstInGroup}
  data-slot="chat-message-bubble"
  class={cn(highlighted ? 'origin-center' : entranceOrigin, className)}
  {@attach entrance}
  {@attach attention}
>
  {@render children?.()}
  {#if highlighted}
    <div
      {@attach ring}
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 ring-2 ring-foreground/25 ring-offset-2 ring-offset-background"
    ></div>
  {/if}
</ChatBubble>
