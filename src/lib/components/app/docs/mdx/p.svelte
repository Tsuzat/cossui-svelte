<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<p class={cn('not-first:mt-6 text-muted-foreground leading-relaxed', className)} {...restProps}>
  {@render children?.()}
</p>
