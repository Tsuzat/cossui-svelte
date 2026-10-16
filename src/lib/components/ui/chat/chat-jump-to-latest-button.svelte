<script lang="ts">
  import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Button } from '#lib/components/ui/button/index.js';
  import { cn } from '#lib/utils.js';

  let {
    class: className,
    children,
    ...restProps
  }: Omit<HTMLButtonAttributes, 'class' | 'children'> & {
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<div data-slot="chat-jump-to-latest" class="rounded-full bg-popover/90 backdrop-blur-xs">
  <Button
    variant="outline"
    size="xs"
    class={cn('pointer-events-auto gap-2 rounded-full before:rounded-full', className)}
    {...restProps}
  >
    <ArrowDownIcon aria-hidden="true" />
    {@render children?.()}
  </Button>
</div>
