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
  class={cn(
    'in-data-[layout=adaptive]:col-span-full in-data-[layout=adaptive]:row-start-2 mx-[calc(--spacing(2)-1px)] flex in-[[data-layout=adaptive]:not([data-multiline])]:contents shrink-0 items-center justify-between gap-2',
    className
  )}
  data-slot="composer-actions"
  {...restProps}
>
  {@render children?.()}
</div>
