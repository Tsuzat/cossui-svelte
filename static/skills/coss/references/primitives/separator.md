# coss Separator

## When to use

- Visual/semantic separation between related blocks.
- Section dividers in cards, toolbars, and layouts.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/separator.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Separator } from '#lib/components/ui/separator/index.js';
</script>
```

`SeparatorPrimitive` is re-exported.

## Minimal pattern

```svelte
<div class="flex flex-col gap-2">
  <span class="text-sm">Section A</span>
  <Separator />
  <span class="text-sm">Section B</span>
</div>
```

## Patterns from coss particles

### Key patterns

Vertical separator inline (`orientation` defaults to `horizontal`):

```svelte
<div class="flex items-center gap-4">
  <span>Home</span>
  <Separator orientation="vertical" class="h-4" />
  <span>Settings</span>
</div>
```

Inside composite primitives use their dedicated separators instead: `MenuSeparator`, `SelectSeparator`, `GroupSeparator`, `ToolbarSeparator`, `ComboboxSeparator`, `CommandSeparator`.

## Common pitfalls

- Adding separators between every small element, creating visual clutter.
- Using separators where spacing alone communicates grouping better.
- Using a plain `Separator` inside a `Group`/`Menu`/`Toolbar` instead of that primitive's own separator.

## Useful particle references

- horizontal + vertical: `p-separator-1`
- cross-primitive dividers: `p-menu-1`, `p-group-1`, `p-toolbar-1`
