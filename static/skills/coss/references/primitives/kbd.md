# coss Kbd

## When to use

- Keyboard shortcut keycaps near commands.
- Single or grouped key hint display in action UIs.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/kbd.json
```

Manual deps from docs: none (custom components).

## Canonical imports

```svelte
<script lang="ts">
  import { Kbd, KbdGroup } from '#lib/components/ui/kbd/index.js';
</script>
```

## Minimal pattern

```svelte
<Kbd>K</Kbd>
```

## Patterns from coss particles

### Key patterns

Multi-key shortcut with `KbdGroup` (each key gets its own `Kbd`):

```svelte
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```

Button with keyboard shortcut:

```svelte
<Button variant="outline">
  <PrinterIcon aria-hidden="true" />
  Print
  <KbdGroup class="-me-1">
    <Kbd>⌘</Kbd>
    <Kbd>P</Kbd>
  </KbdGroup>
</Button>
```

Icons work inside `Kbd` (e.g. `<Kbd><ArrowUpIcon /></Kbd>` for navigation hints in a `CommandFooter`). For platform-aware modifiers, the `use-is-mac` hook (`#lib/hooks/use-is-mac.svelte.js`) helps choose `⌘` vs `Ctrl`.

## Common pitfalls

- Placing multi-key sequences in a single `Kbd` when `KbdGroup` is clearer.
- Using decorative keycaps without tying them to nearby actionable controls.
- Overusing kbd hints in simple UIs, adding noise instead of clarity.

## Useful particle references

- keyboard shortcuts display: `p-kbd-1`
- button with shortcut: `p-button-31`
- input group with shortcut: `p-input-group-11`
- command palette footer hints: `p-command-2`
