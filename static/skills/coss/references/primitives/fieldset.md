# coss Fieldset

## When to use

- Grouped related controls under one legend/description.
- Complex forms requiring semantic grouping for radios/checkboxes.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/fieldset.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Fieldset, FieldsetLegend } from '#lib/components/ui/fieldset/index.js';
</script>
```

`FieldsetPrimitive` is re-exported.

## Minimal pattern

```svelte
<Fieldset>
  <FieldsetLegend>Fieldset legend</FieldsetLegend>
</Fieldset>
```

## Patterns from coss particles

### Key patterns

Fieldset grouping related fields:

```svelte
<Fieldset class="flex w-full flex-col gap-6">
  <FieldsetLegend>Billing Details</FieldsetLegend>
  <Field name="company">
    <FieldLabel>Company</FieldLabel>
    <Input type="text" />
    <FieldDescription>The name that will appear on invoices.</FieldDescription>
  </Field>
  <Field name="taxId">
    <FieldLabel>Tax ID</FieldLabel>
    <Input type="text" />
  </Field>
</Fieldset>
```

For a radio/checkbox group field, nest the `Fieldset` inside `Field name="…"` and wrap each option in `FieldItem` (see [field.md](field.md)).

Always include `FieldsetLegend` as the accessible group heading.

## Common pitfalls

- Using ad-hoc div wrappers instead of semantic fieldset for grouped controls.
- Omitting `FieldsetLegend`, reducing accessibility context.
- Placing unrelated controls inside one fieldset, hurting form clarity.

## Useful particle references

- multiple fields: `p-fieldset-1`
- group fields: `p-field-13` (checkbox group), `p-field-14` (radio group)
