# Forms and Inputs Rules (coss, Svelte)

Use this when implementing fields, input groups, validation states, and form examples.

## Core Rules

- For form-bound controls, default to `Field` composition (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) instead of standalone inputs, and give each `Field` a `name`.
- Always specify `type` on input-like controls where relevant (`type="text"`, `type="email"`, etc.).
- Set `type="submit"` / `type="reset"` explicitly on form buttons. coss `Button` and the ShardsUI trigger/close parts default to `type="button"`.
- Preserve accessible labelling:
  - visible label association (`Label for={id}` + control `id`, with ids from `$props.id()`)
  - `aria-label` when there is no visible label.
- Keep validation signaling aligned between container and control (`invalid` on `Field`, `aria-invalid`, `FieldError`).
- Wire values with runes: `bind:value` / `bind:checked` / `bind:pressed`, not `defaultValue` + `onValueChange={setX}`.
- Choose one validation source: native constraints (`required`, `type="email"`, `min`, `pattern`) **or** a schema (Zod/Valibot via `Form`'s `onFormSubmit` + `errors`). Inside `Form`, native checks run first and cancel submit, so drop constraint attributes when a schema owns validation.

## Input Group Rule

- In `InputGroup`, use `InputGroupInput` / `InputGroupTextarea` (not `Input`/`Textarea`) and keep them before `InputGroupAddon` in the DOM. The addon focus handler searches the whole group, and `align` controls visual placement.

## OTP Field Rule

- The cell count comes from `maxlength` on `OTPField`; render one `OTPFieldInput` per `cell` from the `children` snippet and pass `{cell}` to each.

## Textarea Rule

- coss `Textarea` already wraps ShardsUI `Field.Control`; use it directly inside `Field` without `FieldControl`.

## Do / Don't

```svelte
<!-- Do -->
<Field name="email">
  <FieldLabel>Email</FieldLabel>
  <Input type="email" />
  <FieldError />
</Field>

<InputGroup>
  <InputGroupInput type="text" />
  <InputGroupAddon><SearchIcon aria-hidden="true" /></InputGroupAddon>
</InputGroup>

<Form class="flex flex-col gap-4" {errors} onFormSubmit={handleSubmit}>…</Form>

<!-- Don't: unlabeled, untyped standalone input -->
<Input placeholder="Email" />
```

Also don't carry over React props (`htmlFor`, `defaultValue` + `onChange` with a `setX` setter): use `for`, and `bind:value` or `value` + `oninput`.

## Further reading

- [form.md](../primitives/form.md), [field.md](../primitives/field.md)
- cossui-svelte form docs: `https://cossui-svelte.com/docs/components/form`
