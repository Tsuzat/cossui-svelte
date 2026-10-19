# coss Select

## When to use

- Single- or multi-choice selection from a predefined list.
- Select-style triggers with popup options.

## When NOT to use

- If the user needs to type/filter options -> use Combobox instead.
- If the list is very short (2-3 items) with visible options -> consider RadioGroup.
- If the selection drives complex search/autocomplete -> use Autocomplete instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/select.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Select,
    SelectGroup,
    SelectGroupLabel,
    SelectItem,
    SelectLabel,
    SelectPopup,
    SelectSeparator,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';
</script>
```

Also exported: `SelectContent` (alias of `SelectPopup`), `SelectButton`, `selectTriggerVariants`, `SelectScrollUpButton`/`SelectScrollDownButton` (rendered automatically), `SelectPrimitive`.

## Minimal pattern

```svelte
<script lang="ts">
  const items = [
    { label: 'Next.js', value: 'next' },
    { label: 'Vite', value: 'vite' },
    { label: 'Astro', value: 'astro' }
  ];
  let value = $state<string>();
</script>

<Select bind:value {items}>
  <SelectTrigger aria-label="Select framework">
    <SelectValue placeholder="Select framework" />
  </SelectTrigger>
  <SelectPopup>
    {#each items as item (item.value)}
      <SelectItem value={item.value}>{item.label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
```

Values are **strings** (`string[]` with `multiple`); `value` is bindable. Pass `items` (`{ label, value }[]`) so `SelectValue` can show the label for the selected value — keep options known up front, which also avoids SSR mismatches. Alternatively render your own label inside `SelectTrigger`:

```svelte
<SelectTrigger aria-label="Select framework">
  <span class="flex-1 truncate">{items.find((i) => i.value === value)?.label}</span>
</SelectTrigger>
```

For form-bound selects, wrap with `Field` + `FieldLabel` + `FieldError` and give the `Select` a `name`.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `SelectPopup` → ShardsUI `Select.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Trigger size**: `size="sm" | "default" | "lg"` on `SelectTrigger`.
- **Grouped options**: `SelectGroup` + `SelectGroupLabel`, `SelectSeparator` between groups. `SelectLabel` labels the whole list.
- **Disabled options**: `disabled` on individual `SelectItem`s; `disabled` on `Select` for the whole control.
- **Item text**: `SelectItem` shows its children, else its `label` prop, else `String(value)`. Its `children` snippet receives `{ highlighted, selected }`.
- **Rich rows/trigger**: render icons, avatars, flags or secondary text in both `SelectItem` children and the trigger content.
- **Multiple selection**: add `multiple` and bind a `string[]`; summarize the selection in the trigger yourself.
- **Select look-alikes**: `SelectButton` (standalone button) or `class={selectTriggerVariants()}` on another trigger, e.g. `ComboboxTrigger` (`p-combobox-18`).

### Key patterns

Multiple selection:

```svelte
<script lang="ts">
  let selected = $state<string[]>(['javascript']);
  const summary = $derived(
    selected.length === 0 ? 'Select languages…' : selected.map((v) => labels[v]).join(', ')
  );
</script>

<Select multiple bind:value={selected} {items}>
  <SelectTrigger aria-label="Select languages">
    <span class="flex-1 truncate">{summary}</span>
  </SelectTrigger>
  <SelectPopup>
    {#each items as item (item.value)}
      <SelectItem value={item.value}>{item.label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
```

## Common pitfalls

- React coss habits: object values (`SelectItem value={item}` + `itemToStringValue`), `defaultValue={[…]}`, render-function `SelectValue`, `alignItemWithTrigger`. The coss wrapper types values as strings and `items` as `{ label, value }[]` (ShardsUI's `itemToStringValue` object mode isn't part of its contract), use `bind:value`, and `SelectValue` only takes `placeholder`; `alignItemWithTrigger` is not supported.
- Forgetting `items` on `Select` while using `SelectValue` (the trigger then can't resolve a label).
- Treating `multiple` values as scalars instead of arrays.
- Mixing select and combobox APIs without validating docs.

## Useful particle references

- basic / small / large / disabled: `p-select-1`, `p-select-2`, `p-select-3`, `p-select-4`
- `SelectValue` placeholder: `p-select-5`
- groups: `p-select-6`
- languages select (single value summary): `p-select-7`
- icon trigger / options with icons: `p-select-8`, `p-select-9`
- rich rows with description: `p-select-10`, `p-select-18`
- form integration / with label: `p-select-11`, `p-select-23`
- disabled items: `p-select-12`
- timezone / status dot / pill / left text label: `p-select-13`, `p-select-14`, `p-select-15`, `p-select-16`
- country flags / avatars / avatars + usernames: `p-select-17`, `p-select-19`, `p-select-20`
- auto width / custom border: `p-select-21`, `p-select-22`
- color palette swatches: `p-select-24`
- select-style combobox: `p-combobox-18`
