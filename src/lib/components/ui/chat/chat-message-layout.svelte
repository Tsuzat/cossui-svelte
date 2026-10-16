<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    align = 'start',
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & { align?: 'start' | 'end' } = $props();
</script>

<article
  bind:this={ref}
  data-slot="chat-message"
  data-align={align}
  class={cn(
    'group/message relative grid scroll-m-8 grid-cols-1 items-start rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring has-[>[data-slot=chat-message-avatar]]:grid-cols-[auto_minmax(0,1fr)] has-[>[data-slot=chat-message-avatar]]:gap-x-2 has-[>[data-slot=chat-message-header]]:gap-y-1',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</article>
