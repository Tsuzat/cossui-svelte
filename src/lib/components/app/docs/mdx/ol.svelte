<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<ol class={cn('my-6 ms-6 list-decimal text-muted-foreground', className)} {...restProps}>
  {@render children?.()}
</ol>
