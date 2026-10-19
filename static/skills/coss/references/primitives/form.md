# coss Form

## When to use

- Structured form validation and submission flows.
- Forms with field-level labels, descriptions, and errors.
- Integrations with schema validators (Zod, Valibot) or form libraries (e.g. sveltekit-superforms).

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/form.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

Add `zod` (or your validator) if you validate with a schema.

## Canonical imports

```svelte
<script lang="ts">
  import { Field, FieldDescription, FieldError, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form, type FormErrors } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>
```

Also exported: `FormPrimitive` and the `FormValidationMode` type.

## Minimal pattern

```svelte
<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" required />
    <FieldDescription>Used for account updates</FieldDescription>
    <FieldError>Please enter a valid email.</FieldError>
  </Field>
  <Button type="submit">Submit</Button>
</Form>
```

`Form` is a thin wrapper over ShardsUI `Form` with **no default layout** — pass `class` for spacing. It renders `<form novalidate>` and runs field constraint checks itself on submit (focusing the first invalid control).

## Patterns from coss particles

- **Submission mode**: `onsubmit` gives you the DOM `SubmitEvent` (call `event.preventDefault()` and read `new FormData(event.currentTarget)`); `onFormSubmit` gives you a parsed values object keyed by field `name`.
- **Server/schema errors**: pass `errors` (`FormErrors`, `{ [fieldName]: string | string[] }`) and render an empty `<FieldError />` in each `Field` — the matching message appears.
- **Validation timing**: `validationMode` (`FormValidationMode`) on `Form`, or per field on `Field`.
- **Field naming**: set `name` on each `Field` so values and errors line up.
- **Dialog / drawer**: header **outside** the form; `<Form class="contents">` wraps **panel + footer** only (`p-dialog-4`, `p-drawer-10`, `p-drawer-12`).
- **Grouped controls**: radio/checkbox groups use `Field` + `Fieldset` + `FieldItem`.
- **Textarea**: use `Textarea` directly inside `Field`; it wraps `Field.Control` internally.

### Key patterns

Zod validation with `onFormSubmit` + `errors`:

```svelte
<script lang="ts">
  import { z } from 'zod';

  const schema = z.object({
    name: z.string().min(1, { message: 'Please enter a name.' }),
    age: z.coerce.number({ message: 'Please enter a number.' }).positive()
  });

  let errors = $state<FormErrors>({});
  let loading = $state(false);

  async function handleSubmit(values: Record<string, unknown>) {
    const result = schema.safeParse(values);
    if (!result.success) {
      errors = z.flattenError(result.error).fieldErrors as FormErrors;
      return;
    }
    errors = {};
    loading = true;
    await save(result.data);
    loading = false;
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {errors} onFormSubmit={handleSubmit}>
  <Field name="name">
    <FieldLabel>Name</FieldLabel>
    <Input />
    <FieldError />
  </Field>
  <Field name="age">
    <FieldLabel>Age</FieldLabel>
    <Input inputmode="numeric" />
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
```

With a schema, drop native constraint attributes (`required`, `type="email"`, `min`, `pattern`) — they run first and cancel the submit before your handler.

SvelteKit form actions: `Form` renders a real `<form>`, so `method="POST"`, `action="?/save"` and `use:enhance` work as usual; map `ActionData` errors into `errors`.

## Common pitfalls

- Using `Form` without field-level structure (`Field`, label, error).
- Missing `name` on `Field` (value missing from submission, `errors` not matched).
- Missing button `type="submit"`.
- Expecting `Form` to lay out its children — it has no default layout.
- React habits: `onSubmit`, `className`, RHF `register()`. Use `onsubmit`/`onFormSubmit`, `class`, and `name`/`bind:value`.
- Using grouped checkboxes/radios without proper group legend/structure.

## Useful particle references

- input in a form: `p-form-1`
- zod validation: `p-form-2`
- complete form built with field: `p-field-18`
