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
  data-slot="chat-message-header"
  class={cn(
    'col-start-1 in-[[data-slot=chat-message]:has(>[data-slot=chat-message-avatar])]:col-start-2 row-start-1 px-1 font-medium text-muted-foreground text-xs group-data-[align=end]/message:justify-self-end',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
