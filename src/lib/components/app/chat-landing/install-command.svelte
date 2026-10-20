<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import { onDestroy } from 'svelte';
  import { Button } from '#lib/components/ui/button/index.js';

  let { command }: { command: string } = $props();

  let isCopied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onDestroy(() => clearTimeout(timer));

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      isCopied = true;
      clearTimeout(timer);
      timer = setTimeout(() => (isCopied = false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<Button
  class="max-w-full justify-between gap-3 font-normal text-muted-foreground"
  variant="outline"
  aria-label={isCopied ? 'Install command copied' : 'Copy install command'}
  onclick={copy}
>
  <code class="truncate text-xs">
    <span aria-hidden="true" class="me-2 opacity-50">$</span>{command}
  </code>
  {#if isCopied}
    <CheckIcon aria-hidden="true" />
  {:else}
    <CopyIcon aria-hidden="true" />
  {/if}
</Button>
