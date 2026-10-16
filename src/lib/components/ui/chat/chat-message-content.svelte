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
  data-slot="chat-message-content"
  class={cn(
    'col-start-1 in-[[data-slot=chat-message]:has(>[data-slot=chat-message-avatar])]:col-start-2 row-start-2 flex min-w-0 flex-col gap-1 group-data-[align=end]/message:items-end',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
