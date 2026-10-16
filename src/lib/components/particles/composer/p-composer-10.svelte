<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import AtSign from '@lucide/svelte/icons/at-sign';
  import SquareSlash from '@lucide/svelte/icons/square-slash';
  import { Button } from '#lib/components/ui/button/index.js';
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

  const triggers: ComposerTrigger[] = [
    {
      character: '@',
      items: [
        { id: 'alex', label: 'Alex Morgan' },
        { id: 'sam', label: 'Sam Rivera' }
      ]
    },
    {
      character: '/',
      items: [
        { id: 'summarize', label: 'Summarize', type: 'action' },
        { id: 'rewrite', label: 'Rewrite', type: 'action' }
      ]
    }
  ];

  let value = $state<ComposerValue>([]);
</script>

<Composer class="w-full max-w-xl" bind:value onSubmit={() => (value = [])} {triggers}>
  {#snippet children(composer)}
    <ComposerInput aria-label="Message" placeholder="Write a message…" />
    <ComposerPopup>
      <ComposerList>
        {#snippet children(item)}
          <ComposerItem value={item}>{item.label}</ComposerItem>
        {/snippet}
      </ComposerList>
    </ComposerPopup>
    <ComposerActions>
      <ComposerActionGroup>
        <Button
          aria-label="Mention someone"
          disabled={composer.disabled || composer.readOnly}
          size="icon"
          type="button"
          variant="ghost"
          onclick={() => composer.insertTrigger('@')}
        >
          <AtSign aria-hidden="true" />
        </Button>
        <Button
          aria-label="Insert an action"
          disabled={composer.disabled || composer.readOnly}
          size="icon"
          type="button"
          variant="ghost"
          onclick={() => composer.insertTrigger('/')}
        >
          <SquareSlash aria-hidden="true" />
        </Button>
      </ComposerActionGroup>
      <ComposerActionGroup align="end">
        <ComposerSubmit aria-label="Send message" size="icon">
          <ArrowUp aria-hidden="true" />
        </ComposerSubmit>
      </ComposerActionGroup>
    </ComposerActions>
  {/snippet}
</Composer>
