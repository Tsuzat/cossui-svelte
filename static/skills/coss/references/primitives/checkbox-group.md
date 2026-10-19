# coss Checkbox Group

## When to use

- Multi-select option groups with shared label context.
- Collecting multiple values under one field name.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/checkbox-group.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { CheckboxGroup } from '#lib/components/ui/checkbox-group/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
</script>
```

Also exported: `CheckboxGroupPrimitive` and `CheckboxTree` (a demo-only helper for parent-checkbox examples, not production-tested).

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state(['next']);
</script>

<CheckboxGroup aria-label="Select frameworks" bind:value>
  <Label>
    <Checkbox value="next" />
    Next.js
  </Label>
  <Label>
    <Checkbox value="vite" />
    Vite
  </Label>
  <Label>
    <Checkbox value="astro" />
    Astro
  </Label>
</CheckboxGroup>
```

Each `Checkbox` needs a `value`; the group's `value` (`string[]`, bindable) lists the checked ones.

## Patterns from coss particles

### Key patterns

Parent checkbox — derive `checked`/`indeterminate` from the group value:

```svelte
<script lang="ts">
  const allIds = ['next', 'vite', 'astro'];
  let value = $state<string[]>([]);
  const allChecked = $derived(value.length === allIds.length);
  const someChecked = $derived(value.length > 0 && !allChecked);
</script>

<Label id="frameworks-caption">
  <Checkbox
    checked={allChecked}
    indeterminate={someChecked}
    onCheckedChange={() => (value = allChecked ? [] : [...allIds])}
  />
  Frameworks
</Label>
<CheckboxGroup aria-labelledby="frameworks-caption" bind:value>
  {#each allIds as id (id)}
    <Label class="ms-4">
      <Checkbox value={id} />
      {id}
    </Label>
  {/each}
</CheckboxGroup>
```

For form-bound groups, use `Field` + `Fieldset` so legend, labels, and errors are grouped correctly (see [field.md](field.md)).

## Common pitfalls

- Using checkbox group when only one option should be selected.
- Missing group label/legend context for assistive technology.
- React habits: `defaultValue` / `onValueChange={setValue}` — use `bind:value`.
- Incorrectly handling submitted values as scalar instead of array/list.

## Useful particle references

- basic: `p-checkbox-group-1`
- with disabled item: `p-checkbox-group-2`
- parent checkbox: `p-checkbox-group-3`
- nested parent checkbox: `p-checkbox-group-4`
- form integration: `p-checkbox-group-5`
- form composition references: `p-form-1`, `p-form-2`
