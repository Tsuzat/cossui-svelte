<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<h4 class={cn('mt-8 scroll-m-20 font-medium tracking-tight', className)} {...restProps}>
  {@render children?.()}
</h4>
