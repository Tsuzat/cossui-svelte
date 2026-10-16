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
  role="status"
  data-slot="composer-status"
  class={cn('px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0', className)}
  {...restProps}
>
  {@render children?.()}
</div>
