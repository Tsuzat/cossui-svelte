<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    align?: 'start' | 'end';
    variant?: 'default' | 'muted';
    grouped?: boolean;
  };

  let {
    ref = $bindable(null),
    align = 'start',
    variant = 'default',
    grouped = false,
    class: className,
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  bind:this={ref}
  data-slot="chat-bubble"
  data-align={align}
  data-variant={variant}
  data-grouped={grouped || undefined}
  class={cn(
    'relative flex min-w-0 flex-col gap-2 rounded-2xl px-3.5 py-2.5 text-foreground',
    variant === 'default' ? 'bg-foreground/12' : 'bg-foreground/4',
    !grouped && (align === 'end' ? 'rounded-se-md' : 'rounded-ss-md'),
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
