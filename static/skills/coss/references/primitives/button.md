# coss Button

## When to use

- Primary and secondary action triggers.
- Icon, loading, and shortcut-enhanced actions across forms and toolbars.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/button.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte tailwind-variants
```

## Canonical imports

```svelte
<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
</script>
```

## Minimal pattern

```svelte
<Button>Button</Button>
```

The native button part defaults to `type="button"`. In form flows, set `type="submit"` / `type="reset"` explicitly to match intent.

Pass `href` to render an `<a>` with button styling: `<Button href="/login">Login</Button>`.

## Patterns from coss particles

### Key patterns

Variants via `variant`:

```svelte
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="destructive-outline">Destructive outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

Sizes: `xs`, `sm`, `default`, `lg`, `xl`, `icon-xs`, `icon-sm`, `icon`, `icon-lg`, `icon-xl`.

Icon-only button (always needs `aria-label`):

```svelte
<script lang="ts">
  import XIcon from '@lucide/svelte/icons/x';
</script>

<Button aria-label="Close" size="icon" variant="ghost">
  <XIcon aria-hidden="true" />
</Button>
```

Button with icon and text (icons are auto-sized by the variant classes):

```svelte
<Button>
  <PlusIcon aria-hidden="true" />
  Add Item
</Button>
```

Button styling on another element or on a trigger part — use `buttonVariants`:

```svelte
<a class={buttonVariants({ variant: 'outline' })} href="/login">Login</a>
<DialogTrigger class={buttonVariants({ variant: 'outline' })}>Open</DialogTrigger>
```

### Loading state

Built-in `loading` prop (forces `disabled`, sets `aria-disabled` and `data-loading`, shows a spinner while preserving width):

```svelte
<Button loading={isLoading} onclick={handleClick}>Submit</Button>
```

Composite approach (manual `Spinner` + `disabled`) for custom spinner placement or label:

```svelte
<Button disabled>
  <Spinner />
  Loading...
</Button>
```

## Common pitfalls

- Nesting `<Button>` inside a trigger/close part (`DialogTrigger`, `MenuTrigger`, `PopoverTrigger`, …) — those already render a `<button>`; put `class={buttonVariants(...)}` on the part instead.
- React habits: `onClick`, `className`, `render={<a />}`, `asChild`. Use `onclick`, `class`, and `href`.
- Omitting explicit `type="submit"` inside forms.
- Using icon-only buttons without `aria-label` on the button.
- Expecting a disabled button to show a tooltip: `disabled` sets `pointer-events-none`, so the button gets no hover or focus. Wrap it in a focusable element used as the `TooltipTrigger` (see [tooltip.md](./tooltip.md)).
- Rebuilding button state styling with ad-hoc classes instead of variants/sizes.
- Using `SelectButton` as if it were a general-purpose `Button`; it is a select-flavored trigger helper for `select`/`combobox` patterns.

## Useful particle references

- variants: `p-button-1` – `p-button-7`
- sizes: `p-button-8` – `p-button-11`, icon sizes: `p-button-13` – `p-button-15`
- disabled / with icon / link: `p-button-12`, `p-button-16`, `p-button-17`
- built-in loading prop: `p-button-41`; composite loading: `p-button-18`
- keyboard shortcut (`Kbd`): `p-button-31`
- copy with feedback: `p-button-35`, `p-button-36`
- social login: `p-button-24`, `p-button-38`
- badge/count/avatar combos: `p-button-23`, `p-button-26`, `p-button-28`, `p-button-32`
- animated (arrow, status dot, rotating FAB, hamburger): `p-button-30`, `p-button-34`, `p-button-37`, `p-button-39`
- download with progress + cancel: `p-button-40`
