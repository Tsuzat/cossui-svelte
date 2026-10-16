<script lang="ts">
  import { ScrollArea as ScrollAreaPrimitive } from '@shardsui/svelte/scroll-area';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { Scrollbar } from '#lib/components/ui/scroll-area/index.js';
  import { cn } from '#lib/utils.js';
  import ChatJumpToLatestButton from './chat-jump-to-latest-button.svelte';
  import type { ChatScroll } from './use-chat-scroll.svelte.js';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    scroll: ChatScroll;
    label: string;
    jumpLabel: Snippet | string;
    contentClass?: string;
    overlay?: Snippet;
    inactive?: boolean;
    /** "off" when the caller announces arrivals itself, e.g. so paged-in history isn't read out. */
    live?: 'polite' | 'off';
    children?: Snippet;
  };

  let {
    scroll,
    label,
    jumpLabel,
    contentClass,
    children,
    overlay,
    inactive = false,
    live,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div
  data-slot="chat-conversation"
  class={cn('relative isolate flex min-h-0 flex-1 flex-col', className)}
  {...restProps}
>
  <ScrollAreaPrimitive.Root
    inert={inactive}
    class="size-full min-h-0 touch-auto before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-6 before:bg-linear-to-b before:from-popover before:to-transparent before:opacity-0 before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-6 after:bg-linear-to-t after:from-popover after:to-transparent after:opacity-0 after:content-[''] data-overflow-y-end:after:opacity-100 data-overflow-y-start:before:opacity-100"
  >
    <ScrollAreaPrimitive.Viewport
      bind:ref={scroll.viewport}
      role="log"
      aria-label={label}
      aria-live={live}
      aria-relevant="additions text"
      data-slot="scroll-area-viewport"
      class="h-full rounded-[inherit] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-has-overflow-y:overscroll-y-contain data-has-overflow-x:overscroll-x-contain"
      onscroll={scroll.onScroll}
    >
      <ScrollAreaPrimitive.Content
        data-slot="scroll-area-content"
        class={cn('px-4 pb-4', contentClass)}
        style="min-width: 0"
      >
        {@render children?.()}
      </ScrollAreaPrimitive.Content>
    </ScrollAreaPrimitive.Viewport>
    <Scrollbar orientation="vertical" />
    <Scrollbar orientation="horizontal" />
    <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
  </ScrollAreaPrimitive.Root>
  {#if scroll.showJump && !inactive}
    <div class="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center">
      <ChatJumpToLatestButton onclick={scroll.scrollToLatest}>
        {#if typeof jumpLabel === 'string'}{jumpLabel}{:else}{@render jumpLabel()}{/if}
      </ChatJumpToLatestButton>
    </div>
  {/if}
  {@render overlay?.()}
</div>
