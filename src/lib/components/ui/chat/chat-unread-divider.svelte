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
  data-slot="chat-unread-divider"
  class={cn('my-4 flex items-center gap-3 font-medium text-foreground text-xs', className)}
  {...restProps}
>
  <span aria-hidden="true" class="h-px flex-1 bg-input"></span>
  {@render children?.()}
  <span aria-hidden="true" class="h-px flex-1 bg-input"></span>
</div>
