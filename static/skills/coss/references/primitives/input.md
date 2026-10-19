# coss Input

## When to use

- Single-line text entry.
- Email/password/search/file and other typed input flows.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/input.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Input } from '#lib/components/ui/input/index.js';
</script>
```

`InputPrimitive` (ShardsUI `Input`) is re-exported.

## Minimal pattern

```svelte
<script lang="ts">
  let email = $state('');
</script>

<Input aria-label="Email" type="email" placeholder="name@company.com" bind:value={email} />
```

Props: `size` (`sm | default | lg`, or a number passed to the native `size` attribute), `unstyled` (drops wrapper styling), `bind:value`, `bind:ref`, plus all `<input>` attributes. Always set `type` explicitly. For form fields, wrap with `Field` + `FieldLabel` + `FieldError`.

## Patterns from coss particles

### Key patterns

Field-wrapped input (preferred for forms):

```svelte
<Field name="email">
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="name@company.com" />
  <FieldError>Please enter a valid email.</FieldError>
</Field>
```

Input with an icon or button addon → use `InputGroup` ([input-group.md](input-group.md)):

```svelte
<InputGroup>
  <InputGroupInput aria-label="Search" placeholder="Search" type="search" />
  <InputGroupAddon>
    <SearchIcon aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>
```

Input + attached button → use `Group` ([group.md](group.md), `p-input-7`).

Password visibility toggle: `type={show ? 'text' : 'password'}` with an `InputGroupAddon align="inline-end"` icon button (`p-input-9`).

Character counter: bind `value` and derive `value.length` against `maxlength` (`p-input-18`; see also the `use-character-limit` hook).

## Common pitfalls

- Omitting explicit `type` and relying on browser defaults.
- Using `Input` directly inside `InputGroup` — use `InputGroupInput`.
- React habits: `defaultValue`, `onChange`, `className`. Use `value`/`bind:value`, `oninput`/`onchange`, `class`.
- Using icon-only affordances without label/aria context.
- Applying heavy class overrides before using the built-in `size` prop.

## Useful particle references

- basic / small / large / disabled / read-only: `p-input-1`, `p-input-2`, `p-input-3`, `p-input-4`, `p-input-17`
- file: `p-input-5`
- label / required / optional: `p-input-6`, `p-input-13`, `p-input-14`
- with button (Group): `p-input-7`
- start text + end tooltip / URL bar / shortcut: `p-input-8`, `p-input-10`, `p-input-11`
- password toggle: `p-input-9`
- loading spinner start/end: `p-input-12`, `p-input-16`
- custom border / pill: `p-input-15`, `p-input-19`
- characters remaining: `p-input-18`
- credit card number / expiry / CVC / combined: `p-input-100` – `p-input-103`
- phone with country code: `p-input-147`
- input masks / timestamp: `p-input-155`, `p-input-156`
- numeric range: `p-input-157`
- IP / subnet / gateway: `p-input-200`
- form integration: `p-form-1`
