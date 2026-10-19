# coss Scroll Area

## When to use

- Constrained-height scroll containers with styled scrollbars.
- Scrollable lists/logs/panels embedded in fixed layouts.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/scroll-area.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
</script>
```

`Scrollbar` is also exported for custom compositions (ScrollArea already renders its scrollbars).

## Minimal pattern

```svelte
<ScrollArea class="h-64 rounded-md border">
  <div class="p-4">Long content…</div>
</ScrollArea>
```

## Patterns from coss particles

### Key patterns

Props: `orientation` (`vertical | horizontal | both`, default `both` — which scrollbars to render), `scrollFade`, `scrollbarGutter`, `fill`, `clampContentMinWidth` (default `true`), `overscrollContain`, `scrollbarXClasses`/`scrollbarYClasses`; `ref` and `viewportRef` are bindable.

Horizontal scrolling — horizontal overflow comes from wide inner content:

```svelte
<ScrollArea class="max-w-96 rounded-lg border">
  <div class="flex w-max gap-4 p-4">
    {#each items as item (item)}
      <div class="w-32 shrink-0">{item}</div>
    {/each}
  </div>
</ScrollArea>
```

Scroll fade edges:

```svelte
<ScrollArea class="h-64" scrollFade>
  <div class="p-4">…</div>
</ScrollArea>
```

Fill viewport for flex layouts (e.g. footers pinned with `mt-auto`):

```svelte
<ScrollArea class="min-h-0 flex-1" fill>
  <div class="flex h-full flex-col">
    <nav>…</nav>
    <footer class="mt-auto">…</footer>
  </div>
</ScrollArea>
```

- `fill` (default `false`): only when the content wrapper must stretch to the viewport height. `SidebarContent` already passes it.
- `overscrollContain` (default `false`): stop scroll chaining in nested surfaces. Dialog, drawer, combobox, autocomplete and sidebar already opt in.
- `clampContentMinWidth` (default `true`): sets `min-width: 0` on the content wrapper to avoid spurious horizontal bars; disable only if horizontal scroll breaks and the child has no explicit width.
- `scrollbarGutter`: reserve space to avoid layout shift when the bar appears.

## Common pitfalls

- Forgetting an explicit height/constraint, resulting in a non-scrollable container.
- Nesting multiple scroll areas that compete for wheel/touch events.
- Using scroll area where native page scrolling is simpler.
- Using `fill` on every scroll area, or forgetting `min-h-0 flex-1` on the root and `h-full flex-col` on the inner wrapper when you do.

## Useful particle references

- basic: `p-scroll-area-1`
- horizontal: `p-scroll-area-2`
- both directions: `p-scroll-area-3`
- fading edges: `p-scroll-area-4`
- scrollbar gutter: `p-scroll-area-5`
