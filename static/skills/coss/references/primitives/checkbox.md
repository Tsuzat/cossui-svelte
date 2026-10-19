# coss Checkbox

## When to use

- Single boolean consent/selection controls.
- Standalone yes/no options with explicit labeling.

## When NOT to use

- If the control is a preference toggle (on/off) in settings -> use Switch instead.
- If selecting from mutually exclusive options -> use RadioGroup instead.
- If multiple checkboxes share grouped state -> use CheckboxGroup instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/checkbox.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
</script>
```

`CheckboxPrimitive` (ShardsUI `Checkbox`) is re-exported for custom composition.

## Minimal pattern

```svelte
<script lang="ts">
  let checked = $state(false);
</script>

<Label>
  <Checkbox bind:checked />
  Accept terms and conditions
</Label>
```

Props: `checked` (bindable), `indeterminate`, `value` (used inside `CheckboxGroup` / forms), `disabled`, `name`, and `onCheckedChange`.

## Patterns from coss particles

### Key patterns

Checkbox with description text (associate with `id` + `for`):

```svelte
<script lang="ts">
  const id = $props.id();
</script>

<div class="flex items-start gap-2">
  <Checkbox {id} />
  <div class="flex flex-col gap-1">
    <Label for={id}>Accept terms and conditions</Label>
    <p class="text-muted-foreground text-xs">By clicking this checkbox, you agree to the terms.</p>
  </div>
</div>
```

Indeterminate parent state is derived from children — see [checkbox-group.md](checkbox-group.md):

```svelte
<Checkbox checked={allChecked} indeterminate={someChecked} onCheckedChange={toggleAll} />
```

Reveal extra content when checked: bind `checked` and wrap the dependent field in `{#if checked}` (see `p-checkbox-142`).

For accessible labelling and validation, wrap form checkboxes in `Field` (see [field.md](field.md)).

## Common pitfalls

- Using checkbox for exclusive single-choice options that should be radios.
- Missing visible label association (`Label` or `FieldLabel`) for each checkbox.
- React habits: `defaultChecked`, `htmlFor`, `useId()` — use `checked`/`bind:checked`, `for`, and `$props.id()`.
- Ignoring indeterminate state where a parent checkbox summarizes children.

## Useful particle references

- basic / disabled / with description: `p-checkbox-1`, `p-checkbox-2`, `p-checkbox-3`
- card style: `p-checkbox-4`, `p-checkbox-144`, icon card grid: `p-checkbox-147`
- form integration: `p-checkbox-5`
- custom accent color: `p-checkbox-134`
- horizontal / right-aligned: `p-checkbox-139`, `p-checkbox-140`
- reveal field when checked: `p-checkbox-142`
- days-of-the-week group: `p-checkbox-149`
- dark-mode toggle styled as checkbox: `p-checkbox-150`
