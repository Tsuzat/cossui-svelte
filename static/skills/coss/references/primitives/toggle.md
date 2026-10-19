# coss Toggle

## When to use

- Pressable two-state commands (formatting/tool modes, bookmark).
- Single-command active/inactive interactions without group state.

## When NOT to use

- If the control is a binary preference setting -> use Switch instead.
- If multiple toggles share state -> use ToggleGroup instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/toggle.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Toggle } from '#lib/components/ui/toggle/index.js';
</script>
```

Also exported: `toggleVariants` (style other elements as toggles), `TogglePrimitive`, and the `ToggleSize` / `ToggleVariant` / `ToggleVariants` types.

## Minimal pattern

```svelte
<script lang="ts">
  let pressed = $state(false);
</script>

<Toggle bind:pressed>Toggle</Toggle>
```

Variants: `default`, `outline`. Sizes: `sm`, `default`, `lg`. `pressed` is bindable; `onPressedChange` and `disabled` are forwarded.

## Patterns from coss particles

### Key patterns

Icon toggle (`aria-label` always required for icon-only):

```svelte
<script lang="ts">
  import BoldIcon from '@lucide/svelte/icons/bold';
</script>

<Toggle aria-label="Toggle bold" variant="outline">
  <BoldIcon />
</Toggle>
```

Several independent toggles side by side are just a flex row (`p-toggle-7`); when they share state, use `ToggleGroup` with `ToggleGroupItem` ([toggle-group.md](toggle-group.md)).

Feedback on press: pair with an anchored toast (`anchoredToastManager`, `p-toggle-8`).

## Common pitfalls

- React habits: `defaultPressed`, `onPressedChange={setPressed}`. Use `pressed` / `bind:pressed`.
- Using `Toggle` inside `ToggleGroup` — use `ToggleGroupItem` there.
- Using toggle for destructive/submit actions better represented by `Button`.

## Useful particle references

- basic / outline / icon: `p-toggle-1`, `p-toggle-2`, `p-toggle-3`
- small / large: `p-toggle-4`, `p-toggle-5`
- disabled: `p-toggle-6`
- icon row: `p-toggle-7`
- bookmark toggle with tooltip + success toast: `p-toggle-8`
