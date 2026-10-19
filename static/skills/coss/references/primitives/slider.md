# coss Slider

## When to use

- Continuous or ranged numeric tuning interactions.
- Volume/brightness/threshold controls with immediate feedback.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/slider.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Slider } from '#lib/components/ui/slider/index.js';
</script>
```

`SliderValue` is also exported (a styled `Slider.Value`), but `Slider` renders its own control/track/thumbs and takes no children, so show the value from your bound state instead.

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state(40);
</script>

<Slider bind:value getAriaLabel={() => 'Volume'} />
```

`value` is bindable — a `number`, or a `number[]` for range/multi-thumb sliders. `min`, `max`, `step`, `disabled`, `onValueChange` are forwarded. Extra props: `orientation` (`horizontal | vertical`), `thumbCollisionBehavior` (`push | swap | none`, default `push`), `showTooltip` + `tooltipContent` (value bubble while dragging), `getAriaLabel(index)`.

## Patterns from coss particles

### Key patterns

Label and live value:

```svelte
<script lang="ts">
  let value = $state(50);
</script>

<div class="w-full">
  <div class="mb-2 flex items-center justify-between gap-1">
    <span class="font-medium text-sm">Opacity</span>
    <span class="text-sm tabular-nums">{value}</span>
  </div>
  <Slider bind:value getAriaLabel={() => 'Opacity'} />
</div>
```

Range slider (two thumbs) — name each thumb:

```svelte
<script lang="ts">
  let range = $state([20, 80]);
</script>

<Slider
  bind:value={range}
  getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
/>
```

Vertical: `orientation="vertical"` inside a container with a height. Slider + `Input`/`NumberField` sync: bind both to the same `$state` (`p-slider-12`, `p-slider-13`). In forms, wrap with `Field` + `FieldLabel` (an associated label names the thumb).

## Common pitfalls

- React habits: `defaultValue`, `onValueChange={setValue}`, children layout with `SliderValue` inside `Slider`. Use `bind:value` and render the value outside.
- Labeling only the root with `aria-label` — that does not name the thumbs; use `getAriaLabel` or a `FieldLabel`.
- Confusing single-value vs range value shapes.
- Using slider for discrete option labels where select/radio is clearer.

## Useful particle references

- basic / label + value / disabled: `p-slider-1`, `p-slider-2`, `p-slider-3`
- reference labels / ticks / labels above: `p-slider-4`, `p-slider-5`, `p-slider-6`
- range / 3 thumbs / collision none / swap: `p-slider-7`, `p-slider-8`, `p-slider-9`, `p-slider-10`
- icons / input / range inputs / +- buttons: `p-slider-11`, `p-slider-12`, `p-slider-13`, `p-slider-14`
- price range / emoji rating / price histogram: `p-slider-15`, `p-slider-16`, `p-slider-22`
- vertical / vertical range / vertical with input / equalizer: `p-slider-17`, `p-slider-18`, `p-slider-19`, `p-slider-20`
- object position with reset: `p-slider-21`
- form integration: `p-slider-23`
