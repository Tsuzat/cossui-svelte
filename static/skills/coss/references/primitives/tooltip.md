# coss Tooltip

## When to use

- Short helper text on hover/focus for controls and icons.
- Non-blocking contextual hints without modal behavior.

## When NOT to use

- If the content is interactive (links, buttons) -> use Popover instead.
- If the content is rich (images, forms) -> use PreviewCard or Popover instead.
- If the hint should persist until dismissed -> use Popover instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/tooltip.json
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
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '#lib/components/ui/tooltip/index.js';
</script>
```

Also exported: `TooltipContent` (alias of `TooltipPopup`), `TooltipHandle` (ShardsUI `Tooltip.Handle` class for detached triggers), `TooltipPrimitive`. There is no `TooltipCreateHandle`.

## Minimal pattern

```svelte
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>Hover me</TooltipTrigger>
    <TooltipPopup>Helpful hint</TooltipPopup>
  </Tooltip>
</TooltipProvider>
```

`TooltipTrigger` renders a `<button>` (change with `as`). `Tooltip` has bindable `open` and optional `delay` / `closeDelay` (ms). `TooltipPopup` takes `side` (default `top`), `align`, `sideOffset` (default `4`), `alignOffset`, `showArrow`, `customAnchor`.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `TooltipPopup` → ShardsUI `Tooltip.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).

### Key patterns

Icon-only button:

```svelte
<Tooltip>
  <TooltipTrigger aria-label="Settings" class={buttonVariants({ size: 'icon', variant: 'ghost' })}>
    <SettingsIcon aria-hidden="true" />
  </TooltipTrigger>
  <TooltipPopup>Settings</TooltipPopup>
</Tooltip>
```

Tooltip on another primitive's part (a `ToggleGroupItem`, `SelectTrigger`, `InputGroupButton`…). There is no `render`/`asChild` composition, so control `open` and anchor the popup to the part:

```svelte
<script lang="ts">
  let ref = $state<HTMLElement | null>(null);
  let open = $state(false);
</script>

<Tooltip bind:open>
  <ToggleGroupItem
    aria-label="Bold"
    bind:ref
    value="bold"
    onpointerenter={() => (open = true)}
    onpointerleave={() => (open = false)}
    onfocus={() => (open = true)}
    onblur={() => (open = false)}
  >
    <BoldIcon />
  </ToggleGroupItem>
  <TooltipPopup customAnchor={ref}>Bold</TooltipPopup>
</Tooltip>
```

Explaining why a button is disabled — a disabled `Button` has `pointer-events-none` and is skipped in tab order, so make a focusable wrapper the trigger:

```svelte
<Tooltip>
  <TooltipTrigger as="span" class="inline-flex" tabindex={0}>
    <Button disabled>Publish</Button>
  </TooltipTrigger>
  <TooltipPopup>Add a title before publishing</TooltipPopup>
</Tooltip>
```

When the button becomes enabled, drop the wrapper (or render the tooltip only while disabled) so the span doesn't add an extra tab stop.

Grouped tooltips: wrap several in one `TooltipProvider` so adjacent tooltips open instantly once the first is visible.

## Common pitfalls

- React habits: `render={<Button />}` on `TooltipTrigger`. Use `class={buttonVariants(...)}`, and never nest a `<Button>` inside the trigger (button-in-button) — except in the disabled-wrapper case where the trigger is `as="span"`.
- Placing interactive controls inside tooltip content.
- Relying on the tooltip as the only label for icon-only controls (still provide `aria-label`).
- Using tooltip for long-form content that should be a popover/dialog.

## Useful particle references

- basic: `p-tooltip-1`
- grouped: `p-tooltip-2`
- toggle group with animated tooltip / vertical group: `p-tooltip-3`, `p-tooltip-4`
- toolbar with anchored tooltips: `p-toolbar-1`
- input group addon tooltips: `p-input-group-7`, `p-input-9`
