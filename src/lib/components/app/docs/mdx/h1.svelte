<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<h1 class={cn('mt-2 scroll-m-20 font-heading font-semibold text-3xl', className)} {...restProps}>
  {@render children?.()}
</h1>
