<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<a class={cn('font-medium text-foreground underline underline-offset-4', className)} {...restProps}>
  {@render children?.()}
</a>
