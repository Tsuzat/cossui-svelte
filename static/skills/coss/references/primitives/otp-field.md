# coss OTP Field

## When to use

- One-time passcode entry with segmented slots.
- Verification code flows with strict length formatting.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/otp-field.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte svelte-toolbelt
```

OTP Field is a custom Svelte component built on a single hidden input (not a ShardsUI wrapper).

## Canonical imports

```svelte
<script lang="ts">
  import { OTPField, OTPFieldInput, OTPFieldSeparator } from '#lib/components/ui/otp-field/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state('');
</script>

<OTPField aria-label="Verification code" maxlength={6} bind:value>
  {#snippet children({ cells })}
    {#each cells.slice(0, 3) as cell, i (i)}
      <OTPFieldInput aria-label={`Character ${i + 1} of 6`} {cell} />
    {/each}
    <OTPFieldSeparator />
    {#each cells.slice(3) as cell, i (i)}
      <OTPFieldInput aria-label={`Character ${i + 4} of 6`} {cell} />
    {/each}
  {/snippet}
</OTPField>
```

The `children` snippet receives `{ cells, isFocused, isHovering }`; render one `OTPFieldInput` per cell and pass it the `cell`. The cell count comes from `maxlength` — you never hand-write a fixed number of slots.

## Patterns from coss particles

### Key patterns

Root props: `maxlength` (default `6`), `value` (bindable), `onValueChange`, `onComplete` (all cells filled), `size` (`default | lg`), `pattern` (string or RegExp), `inputmode` (default `numeric`), `pasteTransformer`, `disabled`.

Verify on completion:

```svelte
<OTPField maxlength={6} bind:value onComplete={(code) => verify(code)}>
  {#snippet children({ cells })}
    {#each cells as cell, i (i)}
      <OTPFieldInput aria-invalid={invalid || undefined} aria-label={`Character ${i + 1} of 6`} {cell} />
    {/each}
  {/snippet}
</OTPField>
```

- **Custom sanitization**: `pattern="^[0-3]+$"` + `pasteTransformer={(t) => t.replace(/\D/g, '')}`.
- **Alphanumeric codes**: `inputmode="text"` without a numeric `pattern`.
- **Placeholder hints / masking**: `placeholder="○"` and `mask` on each `OTPFieldInput`.
- **Labelling**: `aria-label` on `OTPField` or a visible `Label`, plus a per-slot `aria-label` such as "Character 2 of 6".

## Common pitfalls

- React habits: `length` prop and manually listed `<OTPFieldInput />` slots, `onValueChange={setValue}`. Use `maxlength`, the `children` snippet's `cells`, and `bind:value`.
- Forgetting to pass `{cell}` to each `OTPFieldInput`.
- Using OTP slots for arbitrary text input instead of fixed verification codes.

## Useful particle references

- basic / large: `p-otp-field-1`, `p-otp-field-2`
- separator / label: `p-otp-field-3`, `p-otp-field-4`
- custom sanitization: `p-otp-field-6`
- auto validation: `p-otp-field-7`
- alphanumeric: `p-otp-field-8`
- placeholder hints: `p-otp-field-9`
- masked entry: `p-otp-field-10`
- OTP verification dialog: `p-alert-dialog-324`
