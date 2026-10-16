<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import UserRound from '@lucide/svelte/icons/user-round';
  import UsersRound from '@lucide/svelte/icons/users-round';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerItem,
    ComposerList,
    ComposerPopup,
    ComposerSubmit,
    getComposerText,
    type ComposerTrigger,
    type ComposerValue
  } from '#lib/components/ui/composer/index.js';

  const people = [
    { id: 'alex', label: 'Alex Morgan', kind: 'person' },
    { id: 'sam', label: 'Sam Rivera', kind: 'person' }
  ];

  const teams = [
    { id: 'design', label: 'Design team', kind: 'team' },
    { id: 'engineering', label: 'Engineering team', kind: 'team' }
  ];

  const actions = [
    { id: 'summarize', label: 'Summarize', type: 'action' as const },
    { id: 'rewrite', label: 'Rewrite', type: 'action' as const }
  ];

  const triggers: ComposerTrigger[] = [
    { character: '@', items: [...people, ...teams] },
    { character: '/', items: actions }
  ];

  let value = $state<ComposerValue>([]);
  let notice = $state('');
</script>

<div class="flex w-full max-w-xl flex-col gap-3">
  <Composer
    bind:value
    {triggers}
    onSubmit={(draft) => {
      notice = `Sent: ${getComposerText(draft)}`;
      value = [];
    }}
  >
    <ComposerInput aria-label="Message" placeholder="Write a message…" />
    <ComposerPopup>
      <ComposerList>
        {#snippet children(item)}
          <ComposerItem value={item}>
            {#if item.type === 'action'}
              <Sparkles aria-hidden="true" class="size-4 opacity-80" />
            {:else if item.kind === 'team'}
              <UsersRound aria-hidden="true" class="size-4 opacity-80" />
            {:else}
              <UserRound aria-hidden="true" class="size-4 opacity-80" />
            {/if}
            <span class="truncate">{item.label}</span>
          </ComposerItem>
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
  <p class="min-h-5 text-muted-foreground text-sm" role="status">{notice}</p>
</div>
