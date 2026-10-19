# coss Context Menu

## When to use

- Right-click or long-press action menus anchored to the pointer.
- Surface-specific actions on cards, rows, canvases, or media.
- The same action sets you might also expose in a dropdown `Menu`.

## When NOT to use

- If the user needs a click-to-open trigger button -> use Menu instead.
- If the user needs to search/filter actions -> use Command instead.
- If the content is rich informational (not actions) -> use Popover instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/context-menu.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

For manual setup, also include the `destructive-foreground` theme token from the [Styling](https://cossui-svelte.com/docs/styling) docs (used by destructive items).

## Canonical imports

```svelte
<script lang="ts">
  import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuGroup,
    ContextMenuGroupLabel,
    ContextMenuItem,
    ContextMenuLinkItem,
    ContextMenuPopup,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubPopup,
    ContextMenuSubTrigger,
    ContextMenuTrigger
  } from '#lib/components/ui/context-menu/index.js';
</script>
```

Also exported: `ContextMenuPortal`, `ContextMenuPrimitive`.

## Minimal pattern

```svelte
<ContextMenu>
  <ContextMenuTrigger class="flex h-32 items-center justify-center rounded-lg border border-dashed">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Reload</ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>
```

`ContextMenuTrigger` renders a `<div>` around the surface that should accept right click or long press. The popup opens at the pointer automatically. `open` on `ContextMenu` is bindable.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `ContextMenuPopup` → ShardsUI `ContextMenu.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Navigation**: `ContextMenuLinkItem href={…}` renders a native `<a>` (closes on click by default, `closeOnClick={false}` to keep open). In SvelteKit pass `resolve('/docs')` from `$app/paths`.
- **Icons + shortcuts**: put the icon first (`aria-hidden="true"`), then the label, then `<ContextMenuShortcut>⌘E</ContextMenuShortcut>`. Use `inset` on icon-less items to keep labels aligned.
- **Destructive**: `variant="destructive"` on dangerous items.
- **Checkbox items**: `ContextMenuCheckboxItem bind:checked`; `variant="switch"` shows a decorative switch indicator.
- **Radio items**: `ContextMenuRadioGroup bind:value` + `ContextMenuRadioItem value="…"`.
- **Groups**: `ContextMenuGroup` + `ContextMenuGroupLabel`.
- **Nested menus**: `ContextMenuSub` + `ContextMenuSubTrigger` + `ContextMenuSubPopup`.
- **Positioning**: `ContextMenuPopup` accepts `side`, `align`, `sideOffset` (default `4`), `alignOffset`, `anchor`.

```svelte
<ContextMenuPopup>
  <ContextMenuItem>
    <PencilIcon aria-hidden="true" />
    Edit
    <ContextMenuShortcut>⌘E</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuSub>
    <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
    <ContextMenuSubPopup>
      <ContextMenuItem>Inspect</ContextMenuItem>
    </ContextMenuSubPopup>
  </ContextMenuSub>
  <ContextMenuSeparator />
  <ContextMenuItem variant="destructive">
    <TrashIcon aria-hidden="true" />
    Delete
  </ContextMenuItem>
</ContextMenuPopup>
```

## Common pitfalls

- Putting interactive controls inside `ContextMenuTrigger` without careful event handling.
- Forgetting `ContextMenuSubPopup` for nested menus.
- React habits: `ContextMenuItem render={<Link />}` or `onClick` — use `ContextMenuLinkItem href` and `onclick`.
- Mixing navigation and action items without clear close behavior (`closeOnClick`).

## Useful particle references

- basic pointer menu: `p-context-menu-1`
- link items: `p-context-menu-2`
- nested submenu: `p-context-menu-3`
- checkbox items: `p-context-menu-4`
- group labels: `p-context-menu-5`
- icons, shortcuts, destructive: `p-context-menu-6`
- radio group: `p-context-menu-7`
- switch-style checkbox items: `p-context-menu-8`

## Related primitives

- dropdown click menu: [menu.md](./menu.md)
- mobile action sheet variant: [drawer.md](./drawer.md)
