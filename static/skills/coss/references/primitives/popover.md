# coss Popover

## When to use

- Contextual floating content near a trigger.
- Inline editing/help panels without full modal lock.

## When NOT to use

- If the content requires user focus/action before dismissal -> use Dialog instead.
- If the content is just a short text hint -> use Tooltip instead.
- If it's a list of actions -> use Menu instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/popover.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Popover,
    PopoverClose,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger
  } from '#lib/components/ui/popover/index.js';
</script>
```

Also exported: `PopoverContent` (alias of `PopoverPopup`), `PopoverHandle` (ShardsUI `Popover.Handle` class), `PopoverPrimitive`. There is no `PopoverCreateHandle` here — use `new PopoverHandle()`.

## Minimal pattern

```svelte
<Popover>
  <PopoverTrigger class={buttonVariants({ variant: 'outline' })}>Open Popover</PopoverTrigger>
  <PopoverPopup>
    <PopoverTitle>Popover Title</PopoverTitle>
    <PopoverDescription>Popover Description</PopoverDescription>
    <PopoverClose class={buttonVariants({ variant: 'outline' })}>Close</PopoverClose>
  </PopoverPopup>
</Popover>
```

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `PopoverPopup` → ShardsUI `Popover.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Popup options**: `tooltipStyle` (tooltip-like density for info-icon helpers), `showArrow`, `side`, `align`, `sideOffset` (default `4`), `alignOffset`, `customAnchor`.
- **Form-in-popover**: use `PopoverPopup` as a lightweight form container (`Form` + `Field` + `Textarea`).
- **Dismiss controls**: `PopoverClose` for footer actions and icon close buttons:

```svelte
<PopoverClose
  aria-label="Close"
  class={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'absolute inset-e-2 top-2')}
>
  <XIcon />
</PopoverClose>
```

- **Controlled**: `bind:open` on `Popover`.
- **Hover**: `openOnHover` on `PopoverTrigger`.
- **One popup, many triggers**: either keep one `Popover` with `bind:open`, set the active content on click and pass the clicked element as `customAnchor` (`p-popover-3`); or share `const handle = new PopoverHandle()` via `handle` on `Popover` and on several `PopoverTrigger`s (each with a `payload`).

## Common pitfalls

- Treating Popover as a modal replacement when the flow needs full modal behavior (use Dialog/AlertDialog).
- React habits: `render={<Button />}` on trigger/close. Use `class={buttonVariants(...)}` — and don't nest a `<Button>` inside the trigger.
- Missing accessible names on icon-only triggers or close controls.
- Copying Tooltip patterns directly without checking `tooltipStyle` and popover semantics.

## Useful particle references

- popover with form: `p-popover-1`
- close controls (icon + action button): `p-popover-2`
- one popover re-anchored across triggers: `p-popover-3`
- split-button confirmation with selectable occurrences: `p-popover-4`
- tooltip-style popover: `p-input-group-7`
