<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import type { HTMLAttributes } from 'svelte/elements';
  import { slide } from 'svelte/transition';
  import { cn } from '#lib/utils.js';

  let {
    label,
    visible = true,
    class: className,
    ...restProps
  }: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    label: string;
    visible?: boolean;
  } = $props();

  const dots = [0, 1, 2];
</script>

{#if visible}
  <div class="overflow-hidden" transition:slide={{ duration: 200, easing: cubicOut }}>
    <div
      role="status"
      data-slot="chat-typing-indicator"
      class={cn('flex items-center gap-2.5', className)}
      {...restProps}
    >
      <div
        aria-hidden="true"
        class="flex origin-bottom-left items-center gap-1 rounded-2xl rounded-es-md bg-muted/72 px-3 py-3.5 rtl:origin-bottom-right"
      >
        {#each dots as dot (dot)}
          <span
            class="chat-typing-dot block size-1.5 rounded-full bg-muted-foreground"
            style:animation-delay="{dot * 0.16}s"
          ></span>
        {/each}
      </div>
      <span class="min-w-0 text-muted-foreground text-xs">{label}</span>
    </div>
  </div>
{/if}

<style>
  .chat-typing-dot {
    animation: chat-typing-bounce 1.4s ease-in-out infinite;
  }
  @keyframes chat-typing-bounce {
    0%,
    44%,
    100% {
      transform: translateY(0) scale(0.8);
      opacity: 0.4;
    }
    22% {
      transform: translateY(-2px) scale(1.1);
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .chat-typing-dot {
      animation: none;
      transform: none;
      opacity: 1;
    }
  }
</style>
