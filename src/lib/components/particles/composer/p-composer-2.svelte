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
    ComposerStatus,
    ComposerSubmit,
    useComposerFilter,
    type ComposerQuery,
    type ComposerValue
  } from '#lib/components/ui/composer/index.js';
  import { Spinner } from '#lib/components/ui/spinner/index.js';

  const people = [
    { id: 'alex', label: 'Alex Morgan', description: 'Design' },
    { id: 'sam', label: 'Sam Rivera', description: 'Engineering' },
    { id: 'taylor', label: 'Taylor Kim', description: 'Product' }
  ];

  let value = $state<ComposerValue>([]);
  let queryText = $state<string | null>(null);
  let resultsFor = $state<string>();
  let items = $state<typeof people>([]);
  let status = $state<'ready' | 'loading'>('ready');
  const { contains } = useComposerFilter();

  $effect(() => {
    const text = queryText;
    if (text === null) return;
    const timer = window.setTimeout(() => {
      items = people.filter(
        (person) => contains(person.label, text) || contains(person.description, text)
      );
      resultsFor = text;
      status = 'ready';
    }, 500);
    return () => window.clearTimeout(timer);
  });

  function onQueryChange(query: ComposerQuery | null) {
    queryText = query?.text ?? null;
    status = query ? 'loading' : 'ready';
  }
</script>

<div class="flex w-full max-w-xl flex-col gap-3">
  <Composer
    bind:value
    onSubmit={() => (value = [])}
    {onQueryChange}
    triggers={[{ character: '@', items, itemsFor: resultsFor, filter: null, status }]}
  >
    <ComposerInput aria-label="Message" placeholder="Mention someone…" />
    <ComposerPopup aria-busy={status === 'loading' || undefined}>
      {#if status === 'loading'}
        <ComposerStatus>
          <span class="flex items-center justify-between gap-2 text-muted-foreground">
            Searching...
            <Spinner class="size-4.5 sm:size-4" />
          </span>
        </ComposerStatus>
      {/if}
      <ComposerList>
        {#snippet children(item)}
          <ComposerItem value={item}>
            <span class="min-w-0">
              <span class="block truncate">{item.label}</span>
              {#if item.description}
                <span class="block truncate text-muted-foreground text-xs">{item.description}</span>
              {/if}
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

  <p class="text-muted-foreground text-sm">
    Search by name or team. Try @design, or @zz for no menu.
  </p>
</div>
