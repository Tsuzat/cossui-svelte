<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<!-- Inline code only: fenced blocks are rendered by the highlighter in mdsvex.config.js. -->
<code
  class={cn(
    'relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[.8125rem] text-muted-foreground outline-none',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</code>
