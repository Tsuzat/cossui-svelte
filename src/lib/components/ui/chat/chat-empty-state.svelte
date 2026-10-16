<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';

  let {
    title,
    description,
    icon,
    children
  }: {
    title: Snippet | string;
    description: Snippet | string;
    icon: Snippet;
    children?: Snippet;
  } = $props();
</script>

<Empty role="status" class="min-h-64 gap-4 py-10 md:py-10">
  <EmptyHeader>
    <EmptyMedia variant="icon" class="mb-2 bg-popover">{@render icon()}</EmptyMedia>
    <EmptyTitle
      >{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}</EmptyTitle
    >
    <EmptyDescription>
      {#if typeof description === 'string'}{description}{:else}{@render description()}{/if}
    </EmptyDescription>
  </EmptyHeader>
  {#if children}
    <EmptyContent>{@render children()}</EmptyContent>
  {/if}
</Empty>
