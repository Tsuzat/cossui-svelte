<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    align = 'start',
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & { align?: 'start' | 'end' } = $props();
</script>

<div
  bind:this={ref}
  class={cn(
    'in-[[data-layout=adaptive]:not([data-multiline])]:row-start-1 flex min-w-0 flex-wrap items-center gap-1',
    align === 'start'
      ? 'in-[[data-layout=adaptive]:not([data-multiline])]:col-start-1 in-[[data-layout=adaptive]:not([data-multiline])]:me-2'
      : 'in-[[data-layout=adaptive]:not([data-multiline])]:col-start-3 in-[[data-layout=adaptive]:not([data-multiline])]:ms-2 ms-auto justify-end',
    className
  )}
  data-align={align}
  data-slot="composer-action-group"
  {...restProps}
>
  {@render children?.()}
</div>
