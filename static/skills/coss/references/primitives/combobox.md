# coss Combobox

## When to use

- Searchable selection combining text input and list selection.
- Rich option rows with filtering and custom trigger behavior.
- Multi-select with chips.

## When NOT to use

- If options are few and fixed (no search needed) -> use Select instead.
- If you need free-form text suggestions without strict selection -> use Autocomplete instead.
- If the user picks from a simple short list -> use RadioGroup or Select.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/combobox.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxGroupLabel,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxValue
  } from '#lib/components/ui/combobox/index.js';
</script>
```

Also exported: `ComboboxClear`, `ComboboxChipRemove`, `ComboboxRow`, `ComboboxStatus`, `ComboboxPrimitive`, and `useComboboxFilter` (ShardsUI `Combobox.createFilter`). There is no `createComboboxItems` in this port.

## Minimal pattern

```svelte
<script lang="ts">
  const items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
  ];
  let value = $state<string | undefined>();
</script>

<Combobox {items} bind:value>
  <ComboboxInput aria-label="Fruit" placeholder="Select an item..." />
  <ComboboxPopup>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
    <ComboboxList>
      <ComboboxCollection>
        {#snippet children(item: { value: string; label: string })}
          <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
        {/snippet}
      </ComboboxCollection>
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
```

Items are `{ value, label }` objects. Pass **both** `value` (a string) and `label` to `ComboboxItem`. Bind `value` to a `string` (or `string[]` with `multiple`); `inputValue` and `open` are bindable too. `defaultValue` seeds an unbound value.

For form-bound comboboxes, prefer `Field` composition (`Field` + `FieldLabel` + `FieldError`).

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `ComboboxPopup` → ShardsUI `Combobox.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).

### Key patterns

`ComboboxInput` options: `size` (`sm | default | lg`), `showTrigger` (default **true**), `showClear`, `startAddon` snippet, `triggerProps` / `clearProps`. Root options include `autoHighlight` and `disabled`.

Multiple selection with chips:

```svelte
<script lang="ts">
  let value = $state<string[]>([]);
  const getLabel = (v: string) => items.find((i) => i.value === v)?.label ?? v;
</script>

<Combobox {items} multiple bind:value>
  <ComboboxChips>
    {#each value as v (v)}
      <ComboboxChip aria-label={getLabel(v)}>{getLabel(v)}</ComboboxChip>
    {/each}
    <ComboboxChipsInput aria-label="Select items" placeholder={value.length ? undefined : 'Select…'} />
  </ComboboxChips>
  <ComboboxPopup>…same list as above…</ComboboxPopup>
</Combobox>
```

Groups — root `items` is the flat `{ value, label }` list; each `ComboboxGroup` gets its own `items` and a nested `ComboboxCollection`:

```svelte
<Combobox items={flatItems}>
  <ComboboxInput aria-label="Search tags" />
  <ComboboxPopup>
    <ComboboxEmpty>No tags found.</ComboboxEmpty>
    <ComboboxList>
      {#each groupedTags as group (group.value)}
        <ComboboxGroup items={group.items}>
          <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
          <ComboboxCollection>
            {#snippet children(tag: Tag)}
              <ComboboxItem value={tag.id} label={tag.label}>{tag.label}</ComboboxItem>
            {/snippet}
          </ComboboxCollection>
        </ComboboxGroup>
        <ComboboxSeparator />
      {/each}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
```

Button trigger with the search input inside the popup (select-like):

```svelte
<script lang="ts">
  import { selectTriggerVariants } from '#lib/components/ui/select/index.js';
</script>

<Combobox bind:value {items}>
  <ComboboxTrigger class={selectTriggerVariants()}>
    <ComboboxValue placeholder="Select a fruit" />
  </ComboboxTrigger>
  <ComboboxPopup aria-label="Select a fruit">
    <div class="border-b p-2">
      <ComboboxInput placeholder="Search fruits..." showTrigger={false} />
    </div>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>…</ComboboxList>
  </ComboboxPopup>
</Combobox>
```

## Common pitfalls

- Passing the whole item object as `ComboboxItem value` (React coss habit) — here `value` is the string and `label` is required for filtering/display.
- React habits: function-as-child in `ComboboxList`, `key` props, `startAddon={<Icon />}`, `onValueChange={setValue}`. Use `ComboboxCollection` with a `children` snippet, `{#snippet startAddon()}`, and `bind:value`.
- Using `ComboboxInput` inside `ComboboxChips` — use `ComboboxChipsInput` there.
- Forgetting `showTrigger={false}` on an input placed inside the popup.
- Missing empty/loading states for remote or filtered datasets.

## Useful particle references

- basic / disabled / sizes: `p-combobox-1`, `p-combobox-2`, `p-combobox-3`, `p-combobox-4`
- with label / auto highlight / clear button: `p-combobox-5`, `p-combobox-6`, `p-combobox-7`
- groups: `p-combobox-8`
- multiple selection: `p-combobox-9`; stacked chips: `p-combobox-19`, `p-combobox-20`
- input inside popup / select-like trigger: `p-combobox-10`, `p-combobox-18`
- form integration: `p-combobox-11` (single), `p-combobox-12` (multiple)
- start addon: `p-combobox-13`, `p-combobox-14` (multiple)
- pill-shaped: `p-combobox-15`
- timezone pickers: `p-combobox-16`, `p-combobox-17`
