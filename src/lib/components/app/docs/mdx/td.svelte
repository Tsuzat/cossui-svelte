<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<td class={cn('whitespace-nowrap px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right', className)} {...restProps}>
  {@render children?.()}
</td>
