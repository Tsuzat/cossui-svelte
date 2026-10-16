<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerItem,
    ComposerList,
    ComposerPopup,
    ComposerSubmit,
    useComposerFilter,
    type ComposerValue
  } from '#lib/components/ui/composer/index.js';

  const people = [
    { id: 'alex', label: 'Álex Morgan', description: 'Design' },
    { id: 'sam', label: 'Sam Rivera', description: 'Engineering' },
    { id: 'taylor', label: 'Taylor Kim', description: 'Product' },
    { id: 'jordan', label: 'Jordan Lee', description: 'Marketing' },
    { id: 'casey', label: 'Casey Chen', description: 'Support' },
    { id: 'morgan', label: 'Morgan Davis', description: 'Operations' },
    { id: 'jamie', label: 'Jamie Wilson', description: 'Finance' },
    { id: 'riley', label: 'Riley Patel', description: 'Research' }
  ];

  let value = $state<ComposerValue>([]);
  const { startsWith } = useComposerFilter();
</script>

<Composer
  class="w-full max-w-xl"
  bind:value
  onSubmit={() => (value = [])}
  triggers={[
    {
      character: '@',
      items: people,
      filter: (item, query) => startsWith(item.label, query)
    }
  ]}
>
  <ComposerInput aria-label="Team message" placeholder="Mention a teammate…" />
  <ComposerPopup>
    <ComposerList>
      {#snippet children(item)}
        <ComposerItem value={item}>
          <span class="flex min-w-0 flex-col">
            <span class="truncate">{item.label}</span>
            <span class="truncate text-muted-foreground text-xs">{item.description}</span>
          </span>
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
