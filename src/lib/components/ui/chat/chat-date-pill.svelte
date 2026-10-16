<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="chat-date-pill"
  class={cn(
    'pointer-events-none sticky top-4 z-20 mx-auto flex h-6 w-fit items-center justify-center rounded-full border bg-popover/90 px-2 font-medium text-foreground text-xs backdrop-blur-xs',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
