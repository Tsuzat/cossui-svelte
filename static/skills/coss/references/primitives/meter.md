# coss Meter

## When to use

- Bounded scalar measurement display (not task progress).
- Quality/capacity indicators with min/max semantics.

## When NOT to use

- If displaying task completion or async progress -> use Progress instead.
- If the indicator is indeterminate -> use Spinner or Progress instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/meter.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Meter,
    MeterIndicator,
    MeterLabel,
    MeterTrack,
    MeterValue
  } from '#lib/components/ui/meter/index.js';
</script>
```

`MeterPrimitive` is re-exported.

## Minimal pattern

```svelte
<Meter value={40}>
  <div class="flex items-center justify-between gap-2">
    <MeterLabel>Storage usage</MeterLabel>
    <MeterValue />
  </div>
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>
```

`Meter` takes `value`, `min` (default `0`), `max` (default `100`), and ShardsUI `format` (`Intl.NumberFormatOptions`) / `locale`. When you pass children, include `MeterTrack` + `MeterIndicator` yourself — the default bar renders only when there are no children.

## Patterns from coss particles

### Key patterns

Custom value text — `MeterValue`'s `children` snippet receives `(formattedValue, value)`:

```svelte
<MeterValue>
  {#snippet children(formattedValue)}{formattedValue} used{/snippet}
</MeterValue>
```

Range display (e.g. `3 / 5`) with a custom `max`:

```svelte
<Meter max={5} value={3}>
  <div class="flex items-center justify-between gap-2">
    <MeterLabel>Rating</MeterLabel>
    <span class="text-sm tabular-nums">3 / 5</span>
  </div>
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>
```

Minimal meter without a visible label:

```svelte
<Meter value={40} aria-label="Storage usage" />
```

## Common pitfalls

- Using meter to represent completion tasks better suited for `Progress`.
- Passing a label/value as children and losing the bar (forgot `MeterTrack` + `MeterIndicator`).
- React habits: function-as-child for `MeterValue`. Use a `children` snippet.
- Treating meter as an interactive control rather than a read-only indicator.

## Useful particle references

- label + value: `p-meter-1`
- without label and value: `p-meter-2`
- formatted value: `p-meter-3`
- range: `p-meter-4`
