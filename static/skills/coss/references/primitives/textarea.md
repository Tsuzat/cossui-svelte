# coss Textarea

## When to use

- Multi-line text entry (notes, feedback, descriptions).
- Comment/message inputs where text length is variable.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/textarea.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Textarea } from '#lib/components/ui/textarea/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state('');
</script>

<Textarea aria-label="Message" placeholder="Write your message" bind:value />
```

Props: `size` (`sm | default | lg`, or a number passed to `rows`), `unstyled`, bindable `value` and `ref`; other props go to the native `<textarea>` via ShardsUI `Field.Control`.

## Patterns from coss particles

### Key patterns

`Textarea` wraps `Field.Control` internally, so it works directly inside `Field` — no `FieldControl` needed:

```svelte
<Field name="bio">
  <FieldLabel>Bio</FieldLabel>
  <Textarea placeholder="Tell us about yourself…" />
  <FieldDescription>Max 500 characters.</FieldDescription>
  <FieldError />
</Field>
```

Character counter: bind `value`, set `maxlength`, and render `maxlength - value.length` (`p-textarea-11`, or the `use-character-limit` hook). For a textarea with attached toolbar buttons use `InputGroupTextarea` + `InputGroupAddon align="block-end"` ([input-group.md](input-group.md)).

## Common pitfalls

- Using textarea when a constrained single-line input is expected.
- Using plain `Textarea` inside `InputGroup` — use `InputGroupTextarea`.
- Missing labels/descriptions for required long-form fields.
- Forgetting `type="submit"` on the submit button in textarea forms.

## Useful particle references

- basic / small / large / disabled / read-only: `p-textarea-1`, `p-textarea-2`, `p-textarea-3`, `p-textarea-4`, `p-textarea-10`
- label / required / optional: `p-textarea-5`, `p-textarea-7`, `p-textarea-8`, `p-textarea-12`
- form integration: `p-textarea-6`
- custom border / fixed height: `p-textarea-9`, `p-textarea-13`
- characters remaining: `p-textarea-11`
- with button right / left: `p-textarea-14`, `p-textarea-15`
