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
  data-slot="chat-message-footer"
  class={cn(
    'flex items-center gap-1.5 px-1 pt-0.5 text-[.625rem] text-muted-foreground',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
