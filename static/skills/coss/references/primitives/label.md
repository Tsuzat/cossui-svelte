# coss Label

## When to use

- Visible accessible labels for inputs and controls.
- Simple `for`/`id` associations in forms and settings UIs.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/label.json
```

Manual deps from docs: none (a plain styled `<label>`).

## Canonical imports

```svelte
<script lang="ts">
  import { Label } from '#lib/components/ui/label/index.js';
</script>
```

## Minimal pattern

```svelte
<Label for="email">Email</Label>
```

## Patterns from coss particles

### Key patterns

Label paired with input (generate the id with `$props.id()`):

```svelte
<script lang="ts">
  const id = $props.id();
</script>

<div class="flex flex-col gap-2">
  <Label for={id}>Email</Label>
  <Input {id} type="email" placeholder="name@example.com" />
</div>
```

Label wrapping a checkbox / radio / switch:

```svelte
<Label>
  <Checkbox />
  Accept terms and conditions
</Label>
```

Prefer `FieldLabel` within `Field` for validation-aware forms ([field.md](field.md)).

## Common pitfalls

- React habits: `htmlFor`, `useId()`. Use `for` and `$props.id()`.
- Using `aria-label` when visible `Label` text exists and can be associated.
- Mismatching `for`/`id` between label and control.
- Using the label component as generic typography instead of form labeling.

## Useful particle references

- no dedicated `p-label-*` family; see `p-input-6`, `p-checkbox-1`, `p-checkbox-3`, `p-field-1`
