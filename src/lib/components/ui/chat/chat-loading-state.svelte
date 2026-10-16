<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils.js';
  import ChatMessageAvatar from './chat-message-avatar.svelte';
  import ChatMessageContent from './chat-message-content.svelte';
  import ChatMessageHeader from './chat-message-header.svelte';
  import ChatMessageLayout from './chat-message-layout.svelte';

  let { label, children }: { label: string; children?: Snippet } = $props();

  const rows = [
    { id: 'first', side: 'incoming' },
    { id: 'second', side: 'outgoing' },
    { id: 'third', side: 'incoming' },
    { id: 'fourth', side: 'outgoing' }
  ] as const;
</script>

<div role="status" class="flex flex-col gap-5 py-4">
  <span class="sr-only">{label}</span>
  {#each rows as { id, side } (id)}
    <ChatMessageLayout align={side === 'outgoing' ? 'end' : 'start'} aria-hidden="true">
      {#if side === 'incoming'}
        <ChatMessageHeader>
          <div class="h-3 w-20 animate-pulse rounded-sm bg-muted motion-reduce:animate-none"></div>
        </ChatMessageHeader>
        <ChatMessageAvatar>
          <div class="size-7 animate-pulse rounded-full bg-muted motion-reduce:animate-none"></div>
        </ChatMessageAvatar>
      {/if}
      <ChatMessageContent>
        <div
          class={cn(
            'h-11 w-56 max-w-[83%] animate-pulse rounded-2xl bg-muted motion-reduce:animate-none',
            side === 'incoming' ? 'rounded-ss-md' : 'rounded-se-md'
          )}
        ></div>
        <div
          class="mx-1 h-2 w-9 animate-pulse rounded-sm bg-muted motion-reduce:animate-none"
        ></div>
      </ChatMessageContent>
    </ChatMessageLayout>
  {/each}
  {@render children?.()}
</div>
