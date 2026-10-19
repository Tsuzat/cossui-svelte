# coss Progress

## When to use

- Task completion and async operation progress bars.
- Indeterminate or determinate status during loading pipelines.

## When NOT to use

- If displaying a bounded measurement (not task completion) -> use Meter instead.
- If the loading state is indeterminate with no percentage -> consider Spinner.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/progress.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Progress,
    ProgressIndicator,
    ProgressLabel,
    ProgressTrack,
    ProgressValue
  } from '#lib/components/ui/progress/index.js';
</script>
```

`ProgressPrimitive` is re-exported.

## Minimal pattern

```svelte
<Progress aria-label="Upload progress" value={40} />
```

`Progress` takes `value` (default `0`; `null` = indeterminate), `min` (default `0`), `max` (default `100`), and ShardsUI `format` (`Intl.NumberFormatOptions`).

## Patterns from coss particles

### Key patterns

Label and value display:

```svelte
<Progress value={60}>
  <div class="flex items-center justify-between gap-2">
    <ProgressLabel>Uploading…</ProgressLabel>
    <ProgressValue />
  </div>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>
```

When you pass children (even just a label or value), include `ProgressTrack` + `ProgressIndicator` — the default bar renders only when there are no children.

Custom value text with a custom `max`:

```svelte
<Progress max={12} value={done}>
  <div class="flex items-center justify-between gap-2">
    <ProgressLabel>Upload</ProgressLabel>
    <span class="text-sm tabular-nums">{done} / 12</span>
  </div>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>
```

Animated value: drive `value` from `$state` (e.g. updated in an `$effect` interval with cleanup), as in `p-progress-1`.

Indeterminate: pass `value={null}` when progress cannot be measured; `ProgressValue` shows an em dash.

## Common pitfalls

- Passing a label/value as children and losing the bar (forgot `ProgressTrack` + `ProgressIndicator`).
- Using progress without text/context for what operation is progressing.
- Using determinate values when state is actually unknown/indeterminate.
- Using progress for static score displays that should use `Meter`.

## Useful particle references

- animated basic bar: `p-progress-1`
- label and value: `p-progress-2`
- formatted value: `p-progress-3`
- download button with progress: `p-button-40`
