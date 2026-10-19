# coss Field

## When to use

- Accessible field wrappers with labels, descriptions, and errors.
- Form control state wiring (`invalid`, `disabled`, `name`, validation messaging).

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/field.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Field,
    FieldDescription,
    FieldError,
    FieldItem,
    FieldLabel,
    FieldValidity
  } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>
```

Also exported: `FieldControl` (register a custom/third-party control), `FieldPrimitive`, and the `FieldValidityState` type.

## Minimal pattern

```svelte
<Field name="name">
  <FieldLabel>Name</FieldLabel>
  <Input type="text" placeholder="Enter your name" />
  <FieldDescription>Visible on your profile</FieldDescription>
  <FieldError>Please enter a valid name</FieldError>
</Field>
```

`Field` props: `name`, `invalid`, `disabled`, `validate`, `validationMode`. Built-in controls (`Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `NumberField`, `Slider`, `Autocomplete`, `Combobox`, …) register with the field automatically — no `FieldControl` needed.

## Patterns from coss particles

### Key patterns

Native constraint validation — `Field` reads the control's `ValidityState` and `FieldError` renders when it fails (on submit inside `Form`):

```svelte
<Form class="flex flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="email">
    <FieldLabel>Email <span class="text-destructive-foreground">*</span></FieldLabel>
    <Input type="email" required placeholder="name@company.com" />
    <FieldDescription>We'll never share your email.</FieldDescription>
    <FieldError>Please enter a valid email.</FieldError>
  </Field>
  <Button type="submit">Submit</Button>
</Form>
```

Custom rendering of validity — `FieldValidity` takes a `children` snippet with `{ validity, error, errors, value, … }`:

```svelte
<FieldValidity>
  {#snippet children(state)}
    {#if state.error}<p class="text-destructive-foreground text-xs">{state.error}</p>{/if}
  {/snippet}
</FieldValidity>
```

Schema validation (Zod, Valibot, superforms, …): let the schema own validation. Drop `required`/`min`/`pattern` from the control, and either pass `errors` to `Form` (keyed by field `name`, rendered by an empty `<FieldError />`) — see [form.md](form.md) — or drive a single field with `invalid` plus the message as `FieldError` children:

```svelte
<Field invalid={!!emailError} name="email">
  <FieldLabel>Email</FieldLabel>
  <Input inputmode="email" name="email" />
  <FieldError>{emailError}</FieldError>
</Field>
```

Checkbox / switch: put the control inside `FieldLabel`:

```svelte
<Field name="terms">
  <FieldLabel>
    <Checkbox />
    Accept terms and conditions
  </FieldLabel>
</Field>
```

Radio / checkbox groups: `Field` + `Fieldset` + `FieldsetLegend`, one `FieldItem` per option:

```svelte
<Field name="plan">
  <Fieldset>
    <FieldsetLegend class="font-medium text-sm">Choose Plan</FieldsetLegend>
    <RadioGroup name="plan" value="free">
      <FieldItem><FieldLabel><Radio value="free" /> Free</FieldLabel></FieldItem>
      <FieldItem><FieldLabel><Radio value="pro" /> Pro</FieldLabel></FieldItem>
    </RadioGroup>
    <FieldDescription>Select the plan that fits your needs.</FieldDescription>
  </Fieldset>
</Field>
```

## Common pitfalls

- Rendering errors detached from the related control, breaking context.
- Missing `name` in form flows, causing silent submit omissions and unmatched `errors`.
- Mixing native constraint attributes (`required`, `type="email"`, `min`, `pattern`) with a schema validator inside `Form`: native checks run first, cancel the submit and the schema errors never show. Use `inputmode="email"` for the mobile keyboard instead of `type="email"`.
- React habits: `htmlFor`, function-as-child for `FieldValidity`, RHF `register()`. Use `for`, a `children` snippet, and `bind:value`/`name`.
- Using the wrapper without label/description/error semantics.

## Useful particle references

- description / required / disabled: `p-field-1`, `p-field-2`, `p-field-3`
- validation error / validity state: `p-field-4`, `p-field-5`
- input group: `p-field-6`
- autocomplete / combobox / combobox multiple: `p-field-7`, `p-field-8`, `p-field-9`
- textarea / select: `p-field-10`, `p-field-11`
- checkbox / checkbox group / radio group / switch: `p-field-12`, `p-field-13`, `p-field-14`, `p-field-15`
- slider / number field: `p-field-16`, `p-field-17`
- complete form: `p-field-18`
- form composition references: `p-form-1`, `p-form-2`
