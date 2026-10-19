# coss Autocomplete

## When to use

- Search-driven suggestion pickers with free typing.
- Assisted text entry over a known option space with keyboard navigation.

## When NOT to use

- If options are predefined and don't need search -> use Select instead.
- If the user must pick from a strict set (no free text) -> use Combobox instead.
- If you need action commands, not data selection -> use Command instead.
- If you need address suggestions from Google Places -> use Places Autocomplete instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/autocomplete.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Autocomplete,
    AutocompleteCollection,
    AutocompleteEmpty,
    AutocompleteGroup,
    AutocompleteGroupLabel,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
    AutocompleteSeparator,
    AutocompleteStatus
  } from '#lib/components/ui/autocomplete/index.js';
</script>
```

Also exported: `AutocompleteTrigger`, `AutocompleteClear`, `AutocompleteRow`, `AutocompleteValue`. There is no `useAutocompleteFilter` hook in this port.

## Minimal pattern

```svelte
<script lang="ts">
  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ];
</script>

<Autocomplete {items}>
  <AutocompleteInput aria-label="Search items" placeholder="Search items…" />
  <AutocompletePopup>
    <AutocompleteEmpty>No items found.</AutocompleteEmpty>
    <AutocompleteList>
      <AutocompleteCollection>
        {#snippet children(item: { label: string; value: string })}
          <AutocompleteItem value={item}>{item.label}</AutocompleteItem>
        {/snippet}
      </AutocompleteCollection>
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>
```

Items are rendered through `AutocompleteCollection`, whose `children` snippet receives each (already filtered) item. `value` on `Autocomplete` is the input **text** (a `string`, bindable).

For form-bound autocomplete controls, prefer `Field` wrappers so label, required state, and error output remain tied to the same control.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `AutocompletePopup` → ShardsUI `Autocomplete.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Positioning**: `AutocompletePopup` takes `side`, `align` (default `start`), `sideOffset` (default `4`), `alignOffset`.

### Key patterns

Input affordances — `startAddon` is a **snippet**, `showTrigger`/`showClear` are booleans, `size` is `sm | default | lg`:

```svelte
<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
</script>

<Autocomplete {items}>
  <AutocompleteInput aria-label="Search frameworks" placeholder="Search..." showClear showTrigger>
    {#snippet startAddon()}
      <SearchIcon aria-hidden="true" />
    {/snippet}
  </AutocompleteInput>
  <AutocompletePopup>
    <AutocompleteEmpty>No results found.</AutocompleteEmpty>
    <AutocompleteList>
      <AutocompleteCollection>
        {#snippet children(item: Item)}
          <AutocompleteItem value={item}>{item.label}</AutocompleteItem>
        {/snippet}
      </AutocompleteCollection>
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>
```

Grouped lists — pass `items` as `{ value, items }[]` groups and nest a second `AutocompleteCollection` inside each group:

```svelte
<Autocomplete items={groupedTags}>
  <AutocompleteInput aria-label="Search tags" />
  <AutocompletePopup>
    <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
    <AutocompleteList>
      <AutocompleteCollection>
        {#snippet children(group: { value: string; items: Tag[] })}
          <AutocompleteGroup>
            <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
            <AutocompleteCollection>
              {#snippet children(tag: Tag)}
                <AutocompleteItem value={tag}>{tag.label}</AutocompleteItem>
              {/snippet}
            </AutocompleteCollection>
          </AutocompleteGroup>
          <AutocompleteSeparator />
        {/snippet}
      </AutocompleteCollection>
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>
```

Matching behavior: `autoHighlight` highlights the first match; `mode="both"` (or `"inline"`) autofills the input with the highlighted item; `limit={7}` caps rendered results (pair with `AutocompleteStatus` to show "+N more").

Async search: `filter={null}`, `bind:value` for the query, `items={results}`, and `itemToStringValue` for object results. Debounce and cancel stale requests in an `$effect` cleanup; render loading/error/count text in `AutocompleteStatus`:

```svelte
<script lang="ts">
  let query = $state('');
  let results = $state<Movie[]>([]);
  let loading = $state(false);

  $effect(() => {
    const q = query;
    if (!q) {
      results = [];
      return;
    }
    loading = true;
    let cancelled = false;
    const id = setTimeout(async () => {
      const next = await searchMovies(q);
      if (!cancelled) {
        results = next;
        loading = false;
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  });
</script>

<Autocomplete bind:value={query} filter={null} items={results} itemToStringValue={(m: Movie) => m.title}>
  <AutocompleteInput aria-label="Search movies" />
  <AutocompletePopup aria-busy={loading || undefined}>
    <AutocompleteStatus>{loading ? 'Searching…' : `${results.length} results`}</AutocompleteStatus>
    <AutocompleteList>
      <AutocompleteCollection>
        {#snippet children(movie: Movie)}
          <AutocompleteItem value={movie}>{movie.title}</AutocompleteItem>
        {/snippet}
      </AutocompleteCollection>
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>
```

Form integration: place `Autocomplete` inside `Field name="..."` with `FieldLabel`/`FieldError`.

## Common pitfalls

- Omitting `AutocompleteEmpty`, leaving blank popups with no user feedback.
- Rendering items with `{#each}` directly in `AutocompleteList` instead of `AutocompleteCollection` — filtering happens through the collection.
- React habits: function-as-child (`{(item) => …}`), `startAddon={<Icon />}`, `key` props. Use `{#snippet children(item)}` and `{#snippet startAddon()}`.
- Using object items in async/custom flows without `itemToStringValue`, which breaks stable string mapping.
- Missing explicit labels (`FieldLabel` or `aria-label`) on the input.
- Not handling async race/error states (loading, error, stale response cancellation).

## Useful particle references

- baseline + disabled + sizes: `p-autocomplete-1`, `p-autocomplete-2`, `p-autocomplete-3`, `p-autocomplete-4`
- label + input affordances (`showClear`, `showTrigger`, `startAddon`): `p-autocomplete-5`, `p-autocomplete-8`, `p-autocomplete-9`, `p-autocomplete-14`
- trigger-only / auto highlight: `p-autocomplete-6`, `p-autocomplete-7`
- grouped options: `p-autocomplete-10`
- limited results with status message: `p-autocomplete-11`
- async search with loading/error status: `p-autocomplete-12`
- form integration: `p-autocomplete-13`
- pill input: `p-autocomplete-15`
- Google Places address suggestions: see [places-autocomplete.md](places-autocomplete.md)
