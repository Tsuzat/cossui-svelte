<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<blockquote class={cn('mt-6 border-s-2 ps-6 italic', className)} {...restProps}>
  {@render children?.()}
</blockquote>
