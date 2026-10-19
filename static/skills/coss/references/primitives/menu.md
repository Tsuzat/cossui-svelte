# coss Menu

## When to use

- Contextual action lists and dropdown commands.
- Mixed item types (regular, checkbox, radio, nested submenu).

## When NOT to use

- If the user needs to search/filter actions -> use Command instead.
- If the content is rich informational (not actions) -> use Popover instead.
- If the overlay is a full modal flow -> use Dialog instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/menu.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte @lucide/svelte
```

For manual setup, also include the `destructive-foreground` theme token from the [Styling](https://cossui-svelte.com/docs/styling) docs.

## Canonical imports

```svelte
<script lang="ts">
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuCheckboxItem,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuLinkItem,
    MenuPopup,
    MenuRadioGroup,
    MenuRadioItem,
    MenuSeparator,
    MenuShortcut,
    MenuSub,
    MenuSubPopup,
    MenuSubTrigger,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
</script>
```

Every part is also exported under its shadcn name (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSubContent`, …). Also: `MenuPortal` and `MenuCreateHandle()`.

## Minimal pattern

```svelte
<script lang="ts">
  let shuffle = $state(false);
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: 'outline' })}>Open</MenuTrigger>
  <MenuPopup align="start">
    <MenuItem>Profile</MenuItem>
    <MenuSeparator />
    <MenuCheckboxItem bind:checked={shuffle}>Shuffle</MenuCheckboxItem>
  </MenuPopup>
</Menu>
```

`MenuTrigger` renders a `<button>` — style it with `class={buttonVariants(...)}` instead of nesting a `<Button>`. `MenuPopup` takes `side`, `align` (default `center`), `sideOffset` (default `4`), `alignOffset`; tune only when the layout needs it.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `MenuPopup` → ShardsUI `Menu.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Icon-only trigger**: `<MenuTrigger aria-label="Project actions" class={buttonVariants({ size: 'icon', variant: 'ghost' })}>`.
- **Hover menus**: `openOnHover` (with optional `delay` / `closeDelay` in ms) on `MenuTrigger`, only for explicit hover-driven UX.
- **Navigation**: `MenuLinkItem href={…}` renders a native `<a>` (closes on click by default). In SvelteKit pass `resolve('/docs')` from `$app/paths`; SvelteKit's client router handles plain anchors, so no special Link component is needed.
- **Close on click**: `closeOnClick` on `MenuItem` for action menus where selection should always dismiss the popup.
- **Checkbox items**: `MenuCheckboxItem bind:checked`; `variant="switch"` for toggle-style preferences.
- **Radio items**: `MenuRadioGroup bind:value` + `MenuRadioItem value="…"`.
- **Shortcuts / icons**: icon first, label, then `<MenuShortcut>⌘K</MenuShortcut>`; use `inset` on icon-less items to align them.
- **Destructive**: `variant="destructive"`, placed last after a `MenuSeparator`.
- **Confirmation step**: the item only sets state; render the `AlertDialog`/`Dialog` as a **sibling** of `Menu`, controlled by `bind:open`. Never nest it inside `MenuPopup` — the popup unmounts when the menu closes, taking the dialog with it (`p-dialog-2`).
- **Responsive**: keep desktop on `Menu`, switch mobile to `DrawerMenu` / `DrawerMenuTrigger` / `DrawerMenuItem` (`p-drawer-13`); wrap rows that should dismiss the drawer as `<DrawerClose class={drawerMenuItemClass}>`.

### Key patterns

Full menu with groups, radio, and submenu:

```svelte
<script lang="ts">
  let sortBy = $state('artist');
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: 'outline' })}>Open</MenuTrigger>
  <MenuPopup>
    <MenuGroup>
      <MenuGroupLabel>Sort by</MenuGroupLabel>
      <MenuRadioGroup bind:value={sortBy}>
        <MenuRadioItem value="artist">Artist</MenuRadioItem>
        <MenuRadioItem value="album">Album</MenuRadioItem>
      </MenuRadioGroup>
    </MenuGroup>
    <MenuSeparator />
    <MenuSub>
      <MenuSubTrigger>Add to playlist</MenuSubTrigger>
      <MenuSubPopup>
        <MenuItem>Jazz</MenuItem>
        <MenuItem>Rock</MenuItem>
      </MenuSubPopup>
    </MenuSub>
  </MenuPopup>
</Menu>
```

Destructive item with confirmation:

```svelte
<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  let confirmOpen = $state(false);
</script>

<Menu>
  <MenuTrigger aria-label="Project actions" class={buttonVariants({ size: 'icon', variant: 'ghost' })}>
    <EllipsisIcon aria-hidden="true" />
  </MenuTrigger>
  <MenuPopup align="end">
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive" onclick={() => (confirmOpen = true)}>Delete</MenuItem>
  </MenuPopup>
</Menu>

<AlertDialog bind:open={confirmOpen}>
  <AlertDialogPopup><!-- header + footer, see alert-dialog.md --></AlertDialogPopup>
</AlertDialog>
```

## Common pitfalls

- React habits: `render={<Button />}`, `MenuItem render={<Link />}`, `onClick`, `defaultValue`. Use `class={buttonVariants(...)}`, `MenuLinkItem href`, `onclick`, and `bind:value`/`bind:checked`.
- Nesting a `<Button>` inside `MenuTrigger` (button-in-button).
- Missing the submenu pair (`MenuSubTrigger` + `MenuSubPopup`).
- Mixing navigation and action items without clear close behavior.
- Placing destructive items in the middle of the list or without a separator.
- Nesting an `AlertDialog`/`Dialog` inside `MenuPopup` for a confirm step.

## Useful particle references

- full-featured menu: `p-menu-1`
- hover trigger demo: `p-menu-2` (add `openOnHover` to `MenuTrigger`)
- checkbox items / switch-style: `p-menu-3`, `p-menu-9`
- radio group: `p-menu-4`
- link items: `p-menu-5`
- group labels + separators: `p-menu-6`
- nested submenu: `p-menu-7`
- close on click demo: `p-menu-8`
- menu opening a dialog: `p-dialog-2`
- split button with menu: `p-group-13`
- responsive menu/drawer: `p-drawer-13`
