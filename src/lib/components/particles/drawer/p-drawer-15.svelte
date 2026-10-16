<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerItem,
    ComposerList,
    ComposerPopup,
    ComposerSubmit,
    type ComposerTrigger,
    type ComposerValue
  } from '#lib/components/ui/composer/index.js';
  import {
    Drawer,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '#lib/components/ui/drawer/index.js';

  const blocks = Array.from({ length: 32 }, (_, index) => `block-${index}`);

  const people = [
    { id: 'alex', label: 'Alex Morgan' },
    { id: 'sam', label: 'Sam Rivera' }
  ];

  const actions = [
    { id: 'summarize', label: 'Summarize', type: 'action' as const },
    { id: 'rewrite', label: 'Rewrite', type: 'action' as const }
  ];

  const triggers: ComposerTrigger[] = [
    { character: '@', items: people },
    { character: '/', items: actions }
  ];

  let value = $state<ComposerValue>([]);
</script>

<Drawer>
  <DrawerTrigger class={buttonVariants({ variant: 'outline' })}>Open chat drawer</DrawerTrigger>
  <DrawerPopup class="[--drawer-height:calc(100dvh-3rem)]" showBar>
    <DrawerHeader>
      <DrawerTitle>Chat</DrawerTitle>
    </DrawerHeader>
    <div class="min-h-0 flex-1">
      <DrawerPanel>
        <div aria-hidden="true" class="flex flex-col gap-2">
          {#each blocks as key (key)}
            <div class="h-12 shrink-0 rounded-xl bg-muted"></div>
          {/each}
        </div>
      </DrawerPanel>
    </div>
    <Composer class="mx-3 mb-3" bind:value {triggers} onSubmit={() => (value = [])}>
      <ComposerInput aria-label="Message" placeholder="Write a message…" />
      <ComposerPopup>
        <ComposerList>
          {#snippet children(item)}
            <ComposerItem value={item}>{item.label}</ComposerItem>
          {/snippet}
        </ComposerList>
      </ComposerPopup>
      <ComposerActions>
        <ComposerActionGroup align="end">
          <ComposerSubmit aria-label="Send message" size="icon">
            <ArrowUp aria-hidden="true" />
          </ComposerSubmit>
        </ComposerActionGroup>
      </ComposerActions>
    </Composer>
  </DrawerPopup>
</Drawer>
