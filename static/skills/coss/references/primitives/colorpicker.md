# coss Color Picker (cossui-svelte only)

## When to use

- Picking a color with a saturation area, hue/alpha sliders, text inputs, eyedropper and swatches, inside a popover.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/colorpicker.json
```

```bash
npm install @hueycolor/core @hueycolor/svelte
```

Built on [Huey](https://github.com/hueycolor/huey) and the coss [Popover](popover.md).

## Canonical imports

```svelte
<script lang="ts">
  import { ColorPicker, type HueyColor } from '#lib/components/ui/colorpicker/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let color = $state('#4f46e5');
</script>

<ColorPicker bind:color />
```

Props: `color` (`string | HueyColor`, bindable), `swatches` (`string[]`, bindable), and feature switches `showSaturationArea`, `showInputs`, `showColorDropper`, `showColorSliders`, `swatchesEditable` (all default `true`).

## Patterns from coss particles

```svelte
<!-- Fixed palette, no text inputs -->
<ColorPicker
  bind:color
  swatches={['#ef4444', '#f97316', '#eab308', '#22c55e', '#4f46e5', '#a855f7']}
  swatchesEditable={false}
  showInputs={false}
/>
```

Turn features off for minimal pickers (sliders only: `showSaturationArea={false}`, `showInputs={false}`, …).

## Common pitfalls

- Expecting a native `<input type="color">` — this is a popover-based picker; bind `color`.
- Forgetting `swatchesEditable={false}` when swatches are a fixed brand palette.

## Useful particle references

- full featured: `p-colorpicker-1`
- minimal with sliders / sliders only: `p-colorpicker-2`, `p-colorpicker-4`
- non-editable swatches: `p-colorpicker-3`
- custom swatches with / without text input: `p-colorpicker-5`, `p-colorpicker-6`
