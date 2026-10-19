# coss Table

## When to use

- Structured tabular datasets.
- Sortable/filterable/selectable row and column displays.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/table.json
```

Manual deps: none for basic tables (styled native table elements). For headless data-grid logic you may add `@tanstack/svelte-table`, but the particles implement sorting/pagination/selection with plain runes.

## Canonical imports

```svelte
<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
  } from '#lib/components/ui/table/index.js';
</script>
```

The `TableVariant` type is also exported.

## Minimal pattern

```svelte
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each people as person (person.id)}
      <TableRow>
        <TableCell>{person.name}</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
```

## Patterns from coss particles

- **Semantic baseline**: `TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell`, then `TableCaption` and `TableFooter` as needed.
- **Card variant**: `variant="card"` on `Table` for rounded, card-like rows (`p-table-5`). Combine with `Frame` for app-surface framing (`p-table-2`), or render it as a direct child of `CardFrame` for a card shell (`p-table-7`, `p-table-6`, `p-table-8`).
- **Status-rich rows**: `Badge` plus decorative dots/icons for state columns, text stays primary.
- **Interactive grids**: keep sort/page/selection in `$state` and derive the visible rows with `$derived` (or use `@tanstack/svelte-table`):

```svelte
<script lang="ts">
  let sort = $state<{ id: keyof Flight; desc: boolean }>({ id: 'destination', desc: false });
  let pageIndex = $state(0);
  const pageSize = 5;
  const sorted = $derived(
    [...flights].sort((a, b) => (a[sort.id] > b[sort.id] ? 1 : -1) * (sort.desc ? -1 : 1))
  );
  const rows = $derived(sorted.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize));
</script>
```

- **Row selection**: a header `Checkbox` with `checked`/`indeterminate` derived from the selected set, and one `Checkbox aria-label="Select row"` per row.
- **No-results state**: render an explicit empty row with `colspan` matching visible columns.
- **Fixed layout**: `class="table-fixed"` plus column widths for predictable sizing.
- **Sticky header / vertical (key-value) table**: `p-table-10`, `p-table-9`.

## Common pitfalls

- Assuming `Table` provides sorting/filter/pagination state — that comes from your data layer.
- Mixing header/body cell semantics (`TableHead` in body rows or `TableCell` in headers).
- Forgetting to align `colspan` with actual visible columns in footer/empty rows.
- React habits: `className`, `colSpan`, `@tanstack/react-table` + `flexRender`. Use `class`, `colspan`, and runes or `@tanstack/svelte-table`.
- Omitting `aria-label` for row-selection checkboxes.

## Useful particle references

- basic semantic table: `p-table-1`
- `Frame` + card variant: `p-table-2`
- checkboxes + `Frame`: `p-table-3`
- sorting + pagination + `Frame`: `p-table-4`
- card variant only: `p-table-5`
- `CardFrame` + checkboxes: `p-table-6`
- `CardFrame` + static table: `p-table-7`
- `CardFrame` + sort + pagination: `p-table-8`
- vertical table: `p-table-9`
- sticky header: `p-table-10`
