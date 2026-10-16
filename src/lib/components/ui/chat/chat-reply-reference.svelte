<script lang="ts">
  import CornerDownRightIcon from '@lucide/svelte/icons/corner-down-right';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    author,
    preview,
    class: className,
    ...restProps
  }: Omit<HTMLButtonAttributes, 'children'> & { author: string; preview: string } = $props();
</script>

<button
  type="button"
  data-slot="chat-reply-reference"
  class={cn(
    'group/reply-reference flex min-w-0 items-start gap-1.5 text-start text-xs outline-none transition-colors focus-visible:rounded-sm focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-current enabled:hover:text-primary motion-reduce:transition-none',
    className
  )}
  {...restProps}
>
  <CornerDownRightIcon
    aria-hidden="true"
    class="mt-0.5 size-3.5 shrink-0 opacity-64 transition-opacity group-hover/reply-reference:opacity-100 group-focus-visible/reply-reference:opacity-100"
  />
  <span class="flex min-w-0 flex-col gap-0.5">
    <span class="font-medium">{author}</span>
    <span class="line-clamp-2 text-foreground/80">{preview}</span>
  </span>
</button>
