<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from '#lib/components/ui/button/button.svelte';
  import Separator from '#lib/components/ui/separator/separator.svelte';
  import { cn } from '#lib/utils.js';

  let {
    class: className,
    children,
    ...restProps
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();

  let isOpened = $state(false);
</script>

<!--
  Not built on the Collapsible primitive: a closed Base UI panel is hidden entirely,
  whereas this needs the closed state to show a clipped preview of the code.
-->
<div
  class={cn('group/collapsible relative md:-mx-1', className)}
  data-slot="code-collapsible"
  data-state={isOpened ? 'open' : 'closed'}
  {...restProps}
>
  <div class="absolute top-1.5 right-10 z-10 flex items-center">
    <Button
      aria-expanded={isOpened}
      class="text-muted-foreground"
      onclick={() => (isOpened = !isOpened)}
      variant="ghost"
    >
      {isOpened ? 'Collapse' : 'Expand'}
    </Button>
    <Separator class="mx-1.5 h-5" orientation="vertical" />
  </div>
  <div
    class="[&>figure]:md:mx-0! relative mt-6 h-full overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0"
    data-state={isOpened ? 'open' : 'closed'}
  >
    {@render children?.()}
  </div>
  {#if !isOpened}
    <button
      class="absolute inset-x-0 -bottom-2 flex h-20 cursor-pointer items-center justify-center rounded-b-lg bg-linear-to-b from-transparent via-50% via-background to-background font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
      onclick={() => (isOpened = true)}
      type="button"
    >
      Expand
    </button>
  {/if}
</div>
