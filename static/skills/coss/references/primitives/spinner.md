# coss Spinner

## When to use

- Indeterminate loading indicator for ongoing work.
- Inline pending state in buttons, inputs, and async panels.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/spinner.json
```

Manual deps from docs:

```bash
npm install @lucide/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Spinner } from '#lib/components/ui/spinner/index.js';
</script>
```

## Minimal pattern

```svelte
<div class="flex items-center gap-2">
  <Spinner />
  <span class="text-muted-foreground text-sm">Loading data…</span>
</div>
```

`Spinner` is an animated Lucide `LoaderCircle` with `role="status"` and `aria-label="Loading"` by default; it accepts Lucide icon props (`size`, `class`, …). Override `aria-label` for context, or pass `aria-hidden="true"` when adjacent text already announces the state.

## Patterns from coss particles

### Key patterns

Prefer `Button`'s built-in `loading` prop; compose manually only for custom placement:

```svelte
<Button loading={saving} type="submit">Save</Button>

<Button disabled>
  <Spinner aria-hidden="true" />
  Loading...
</Button>
```

In an input group:

```svelte
<InputGroup>
  <InputGroupInput aria-label="Search" type="search" />
  <InputGroupAddon>
    <Spinner />
  </InputGroupAddon>
</InputGroup>
```

## Common pitfalls

- Using spinner without accessible label/context for screen readers (or announcing twice next to visible text).
- Showing spinner with no cancel/retry pathway in long-running operations.
- Using spinner when a determinate progress value is available (use Progress).

## Useful particle references

- basic: `p-spinner-1`
- input group start/end: `p-input-12`, `p-input-16`
- button: `p-button-18`, `p-button-41`
- async autocomplete status: `p-autocomplete-12`
