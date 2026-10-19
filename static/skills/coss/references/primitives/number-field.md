# coss Number Field

## When to use

- Numeric entry with increment/decrement controls.
- Bounded stepper-style quantity/amount inputs, optionally with drag-to-scrub.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/number-field.json
```

Manual deps from docs:

```bash
npm install @lucide/svelte
```

Number Field is a custom Svelte component (not a ShardsUI wrapper); state is shared with the parts through context.

## Canonical imports

```svelte
<script lang="ts">
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea,
    NumberFieldValue
  } from '#lib/components/ui/number-field/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state(0);
</script>

<NumberField bind:value>
  <NumberFieldScrubArea label="Quantity" />
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
```

Root props: `value` (bindable), `min`, `max`, `step` (default `1`), `disabled`, `id` (applied to the input), `size` (`sm | default | lg`, applied to all parts). The input supports ArrowUp/Down, PageUp/Down (10 steps), Home/End; increment/decrement repeat while held.

## Patterns from coss particles

### Key patterns

Field-wrapped with bounds:

```svelte
<Field name="quantity">
  <FieldLabel>Quantity</FieldLabel>
  <NumberField value={1} min={0} max={99}>
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
  <FieldError />
</Field>
```

External `Label`: pass the same `id` to `NumberField` and `for` to the label (`p-number-field-5`).

Formatted display — `format`/`parse` on `NumberFieldInput` (formatting applies while the input is not focused):

```svelte
<script lang="ts">
  const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const parseAmount = (s: string) => {
    const n = Number(s.replace(/[^\d.-]/g, ''));
    return Number.isNaN(n) ? undefined : n;
  };
</script>

<NumberField value={1250} step={10}>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput
      aria-label="Amount in USD"
      format={(v) => usd.format(v)}
      parse={parseAmount}
    />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
```

Custom buttons: pass children to `NumberFieldIncrement`/`NumberFieldDecrement` to replace the default plus/minus icons (vote counters, chevron steppers). `NumberFieldValue` renders the current value through a `children` snippet receiving `{ value }`.

## Common pitfalls

- React habits: `defaultValue`, `onValueChange={setValue}`, Base UI `format` options on the root. Use `value`/`bind:value` and the `format`/`parse` functions on `NumberFieldInput`.
- Setting `size` on `NumberFieldGroup` — size lives on the `NumberField` root.
- Treating the value as free-form text without numeric bounds/steps.
- Not validating min/max constraints and clamped behavior.

## Useful particle references

- basic / small / large / disabled: `p-number-field-1`, `p-number-field-2`, `p-number-field-3`, `p-number-field-4`
- external label: `p-number-field-5`
- scrub area: `p-number-field-6`
- range: `p-number-field-7`
- amount field: `p-number-field-8`; step: `p-number-field-9`
- form integration: `p-number-field-10`
- pill-shaped: `p-number-field-11`
- vote counters: `p-number-field-100`, `p-number-field-101`
- volume control with level icon: `p-number-field-102`
- locale-aware currency with chevron steppers: `p-number-field-103`
