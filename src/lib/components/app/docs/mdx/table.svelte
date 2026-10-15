<script lang="ts">
  import type { HTMLTableAttributes } from 'svelte/elements';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { cn } from '#lib/utils.js';

  let { class: className, children, ...restProps }: HTMLTableAttributes = $props();
</script>

<ScrollArea class="my-6" scrollbarGutter>
  <table class={cn('relative w-full border-none text-sm', className)} {...restProps}>
    {@render children?.()}
  </table>
</ScrollArea>
