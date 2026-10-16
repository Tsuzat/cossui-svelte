<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    description,
    action
  }: {
    title: Snippet | string;
    description: Snippet | string;
    action?: Snippet;
  } = $props();
</script>

<div
  role="status"
  class="flex shrink-0 items-center justify-between gap-3 border-border/60 border-y bg-muted/72 px-5 py-2.5"
>
  <div class="text-xs">
    <p class="m-0 font-medium">
      {#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
    </p>
    <p class="m-0 mt-1 text-muted-foreground">
      {#if typeof description === 'string'}{description}{:else}{@render description()}{/if}
    </p>
  </div>
  {@render action?.()}
</div>
