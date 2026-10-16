<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import type { Snippet } from 'svelte';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import { cn } from '#lib/utils.js';
  import { splitChatMessagePreview } from './split-chat-message-preview.js';

  type Props = {
    text: string;
    showMoreLabel: string;
    showLessLabel: string;
    side: 'incoming' | 'outgoing';
    maxPreviewLength?: number;
    open?: boolean;
    /** Initial state when `open` is not controlled. */
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Render a chunk of the text; defaults to a plain paragraph. */
    renderText?: Snippet<[string]>;
    class?: string;
  };

  let {
    text,
    showMoreLabel,
    showLessLabel,
    side,
    maxPreviewLength,
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    renderText,
    class: className
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let internalOpen = $state(defaultOpen);
  const isOpen = $derived(open ?? internalOpen);
  const split = $derived(splitChatMessagePreview(text, maxPreviewLength));

  function setOpen(next: boolean) {
    internalOpen = next;
    if (open !== undefined) open = next;
    onOpenChange?.(next);
  }
</script>

{#snippet plain(value: string)}
  <p class="m-0 whitespace-pre-wrap break-words text-sm leading-[1.55]">{value}</p>
{/snippet}

{#snippet content(value: string)}
  {#if renderText}{@render renderText(value)}{:else}{@render plain(value)}{/if}
{/snippet}

{#if !split.remainder}
  <div class={cn('min-w-0', className)}>{@render content(text)}</div>
{:else}
  <Collapsible open={isOpen} onOpenChange={setOpen} class={cn('flex min-w-0 flex-col', className)}>
    <div class="grid">
      <div
        data-slot="chat-collapsible-preview"
        aria-hidden={isOpen || undefined}
        class={cn(
          'mask-[linear-gradient(to_bottom,black_calc(100%-3rem),transparent)] col-start-1 row-start-1 self-start',
          isOpen && 'invisible'
        )}
      >
        {@render content(split.preview)}
      </div>
      <CollapsiblePanel class="col-start-1 row-start-1 min-w-0 motion-reduce:transition-none">
        <div aria-hidden={!isOpen || undefined} class={isOpen ? undefined : 'invisible'}>
          {@render content(text)}
        </div>
      </CollapsiblePanel>
    </div>
    <CollapsibleTrigger
      type="button"
      class={cn(
        'mt-2 flex w-fit items-center gap-1 text-start text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
        side === 'outgoing'
          ? 'text-foreground/80 hover:text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {isOpen ? showLessLabel : showMoreLabel}
      {#if isOpen}
        <ChevronUpIcon aria-hidden="true" class="size-3.5 shrink-0" />
      {:else}
        <ChevronDownIcon aria-hidden="true" class="size-3.5 shrink-0" />
      {/if}
    </CollapsibleTrigger>
  </Collapsible>
{/if}
