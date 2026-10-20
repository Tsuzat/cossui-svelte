<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils.js';

  let {
    title = 'Design review',
    subtitle = 'Maya, Jordan, Alex, and you',
    class: className,
    children
  }: {
    title?: string;
    subtitle?: string;
    class?: string;
    children: Snippet;
  } = $props();
</script>

<section
  aria-label={title}
  class={cn('flex min-h-0 min-w-0 flex-col overflow-hidden bg-popover', className)}
>
  <div class="shrink-0 px-4 py-3">
    <h3 class="text-sm font-medium">{title}</h3>
    <p class="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
  </div>
  {@render children()}
</section>
