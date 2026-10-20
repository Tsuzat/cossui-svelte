<script lang="ts">
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
  import type { Snippet } from 'svelte';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { DrawerTrigger } from '#lib/components/ui/drawer/index.js';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '#lib/components/ui/tabs/index.js';
  import ChatWindow from './chat-window.svelte';
  import SampleConversation from './sample-conversation.svelte';

  let { onOpenDrawer }: { onOpenDrawer: () => void } = $props();

  const SIDEBAR_WIDTHS = ['w-24', 'w-20', 'w-28', 'w-16', 'w-22'];
</script>

{#snippet appSidebar()}
  <div aria-hidden="true" class="hidden w-40 shrink-0 flex-col gap-3 border-e p-4 sm:flex">
    <div class="mb-3 h-2.5 w-16 rounded-full bg-foreground/16"></div>
    {#each SIDEBAR_WIDTHS as width (width)}
      <div class="h-2 rounded-full bg-muted {width}"></div>
    {/each}
  </div>
{/snippet}

{#snippet appContent()}
  <div aria-hidden="true" class="flex min-w-0 flex-1 flex-col gap-4 p-6">
    <div class="h-3 w-40 rounded-full bg-foreground/16"></div>
    <div class="h-2 w-64 max-w-full rounded-full bg-muted"></div>
    <div class="mt-2 grid flex-1 grid-cols-2 gap-3">
      <div class="rounded-xl bg-muted/72"></div>
      <div class="rounded-xl bg-muted/72"></div>
      <div class="col-span-2 rounded-xl bg-muted/72"></div>
    </div>
  </div>
{/snippet}

{#snippet appFrame(content: Snippet)}
  <div class="relative flex h-128 overflow-hidden rounded-2xl border bg-background shadow-lg/5">
    {@render content()}
  </div>
{/snippet}

{#snippet drawerLayout()}
  {@render appSidebar()}
  {@render appContent()}
  <div aria-hidden="true" class="absolute inset-0 bg-foreground/4"></div>
  <ChatWindow class="absolute inset-3 rounded-xl border shadow-lg sm:start-auto sm:w-80">
    <SampleConversation />
  </ChatWindow>
{/snippet}

{#snippet panelLayout()}
  {@render appSidebar()}
  <div class="hidden min-w-0 flex-1 md:flex">
    {@render appContent()}
  </div>
  <ChatWindow class="w-full border-s md:w-80">
    <SampleConversation />
  </ChatWindow>
{/snippet}

{#snippet pageLayout()}
  {@render appSidebar()}
  <ChatWindow class="flex-1">
    <div class="mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col">
      <SampleConversation />
    </div>
  </ChatWindow>
{/snippet}

<Tabs value="drawer" class="gap-6">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <TabsList aria-label="Layouts">
      <TabsTab value="drawer">Drawer</TabsTab>
      <TabsTab value="panel">Side panel</TabsTab>
      <TabsTab value="page">Full page</TabsTab>
    </TabsList>
    <DrawerTrigger class={buttonVariants({ variant: 'outline' })} onclick={onOpenDrawer}>
      Open a real drawer
      <ArrowUpRightIcon aria-hidden="true" />
    </DrawerTrigger>
  </div>
  <TabsPanel value="drawer">{@render appFrame(drawerLayout)}</TabsPanel>
  <TabsPanel value="panel">{@render appFrame(panelLayout)}</TabsPanel>
  <TabsPanel value="page">{@render appFrame(pageLayout)}</TabsPanel>
</Tabs>
