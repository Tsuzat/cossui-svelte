<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<th class={cn('px-4 py-2 text-left font-medium [[align=center]]:text-center [[align=right]]:text-right', className)} {...restProps}>
  {@render children?.()}
</th>
