<script lang="ts">
  import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
  import { onDestroy, type Snippet } from 'svelte';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    ChatEmptyState,
    ChatLoadingState,
    ChatStatusBar
  } from '#lib/components/ui/chat/index.js';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '#lib/components/ui/tabs/index.js';
  import ChatDemoComposer from '#lib/components/blocs/chat-01/components/chat-demo-composer.svelte';
  import ChatDemoTimelineState from '#lib/components/blocs/chat-01/components/chat-demo-timeline-state.svelte';
  import ChatWindow from './chat-window.svelte';
  import SampleConversation from './sample-conversation.svelte';

  const STATES = [
    { value: 'loading', label: 'Loading' },
    { value: 'empty', label: 'Empty' },
    { value: 'reconnecting', label: 'Reconnecting' },
    { value: 'error', label: 'Error' },
    { value: 'no-access', label: 'No access' }
  ] as const;

  let timer: number | undefined;
  function later(callback: () => void, delay: number) {
    window.clearTimeout(timer);
    timer = window.setTimeout(callback, delay);
  }
  onDestroy(() => clearTimeout(timer));

  let loaded = $state(false);
  let joined = $state(false);
  let connection = $state<'offline' | 'retrying' | 'online'>('offline');
  let loadError = $state<'error' | 'retrying' | 'loaded'>('error');
  let restored = $state(false);
</script>

{#snippet frame(content: Snippet)}
  <ChatWindow class="h-128 rounded-2xl border shadow-lg/5">
    {@render content()}
  </ChatWindow>
{/snippet}

{#snippet loadingState()}
  {#if loaded}
    <SampleConversation focusComposer />
  {:else}
    <div class="min-h-0 flex-1">
      <ScrollArea overscrollContain>
        <div class="px-4">
          <ChatLoadingState label="Loading conversation">
            <Button variant="outline" size="sm" onclick={() => (loaded = true)}>
              Finish loading preview
            </Button>
          </ChatLoadingState>
        </div>
      </ScrollArea>
    </div>
    <ChatDemoComposer
      mentionMembers={['maya', 'jordan', 'alex']}
      notice=""
      disabled
      value={[]}
      onSend={() => {}}
    />
  {/if}
{/snippet}

{#snippet emptyState()}
  {#if joined}
    <SampleConversation empty focusComposer />
  {:else}
    <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <ChatDemoTimelineState
        scenario="empty"
        joined={false}
        memberCount={3}
        onRecover={() => {}}
        onJoin={() => (joined = true)}
      />
    </div>
  {/if}
{/snippet}

{#snippet offlineBanner()}
  <ChatStatusBar
    title={connection === 'offline' ? 'You’re offline' : 'Reconnecting…'}
    description="Your draft is saved here. Sending will resume when connected."
  >
    {#snippet action()}
      <Button
        variant="outline"
        size="xs"
        loading={connection === 'retrying'}
        onclick={() => {
          connection = 'retrying';
          later(() => (connection = 'online'), 1200);
        }}
      >
        Reconnect
      </Button>
    {/snippet}
  </ChatStatusBar>
{/snippet}

{#snippet reconnectingState()}
  <SampleConversation
    disabled={connection !== 'online'}
    focusComposer={connection === 'online'}
    notice={connection === 'online' ? 'Connected' : ''}
    banner={connection !== 'online' ? offlineBanner : undefined}
  />
{/snippet}

{#snippet errorState()}
  {#if loadError === 'loaded'}
    <SampleConversation focusComposer />
  {:else}
    <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <ChatEmptyState
        title="Couldn’t load the conversation"
        description="Your draft is safe. Try loading the messages again."
      >
        {#snippet icon()}
          <CircleAlertIcon aria-hidden="true" />
        {/snippet}
        <Button
          variant="outline"
          size="sm"
          loading={loadError === 'retrying'}
          onclick={() => {
            loadError = 'retrying';
            later(() => (loadError = 'loaded'), 1000);
          }}
        >
          Try again
        </Button>
      </ChatEmptyState>
    </div>
  {/if}
{/snippet}

{#snippet noAccessState()}
  {#if restored}
    <SampleConversation focusComposer />
  {:else}
    <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <ChatDemoTimelineState
        scenario="removed"
        onRecover={() => (restored = true)}
        joined={false}
        memberCount={3}
        onJoin={() => {}}
      />
    </div>
  {/if}
{/snippet}

<Tabs value="loading" class="items-center gap-6">
  <TabsList aria-label="Conversation states" class="max-w-full overflow-x-auto">
    {#each STATES as state (state.value)}
      <TabsTab value={state.value}>{state.label}</TabsTab>
    {/each}
  </TabsList>
  <div class="w-full max-w-md">
    <TabsPanel value="loading">{@render frame(loadingState)}</TabsPanel>
    <TabsPanel value="empty">{@render frame(emptyState)}</TabsPanel>
    <TabsPanel value="reconnecting">{@render frame(reconnectingState)}</TabsPanel>
    <TabsPanel value="error">{@render frame(errorState)}</TabsPanel>
    <TabsPanel value="no-access">{@render frame(noAccessState)}</TabsPanel>
  </div>
</Tabs>
