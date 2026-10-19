# coss Drawer

## When to use

- Edge panels on desktop and mobile, including side panels and bottom drawers.
- Replacement for Sheet; do not introduce Sheet usage.
- Form-heavy or multi-step overlays where popover is too constrained.
- Mobile action sheets mirroring a desktop `Menu`.

## When NOT to use

- If the overlay should be a centered modal -> use Dialog instead.
- If you need a simple confirmation -> use AlertDialog instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/drawer.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerMenu,
    DrawerMenuCheckboxItem,
    DrawerMenuGroup,
    DrawerMenuGroupLabel,
    DrawerMenuItem,
    DrawerMenuRadioGroup,
    DrawerMenuRadioItem,
    DrawerMenuSeparator,
    DrawerMenuTrigger,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '#lib/components/ui/drawer/index.js';
</script>
```

Also exported: `DrawerContent`, `DrawerBar`, `DrawerBackdrop`, `DrawerPortal`, `DrawerViewport`, `DrawerSwipeArea`, `drawerMenuItemClass`, `DrawerPrimitive`, and `DrawerCreateHandle()`.

## Minimal pattern

```svelte
<Drawer>
  <DrawerTrigger class={buttonVariants({ variant: 'outline' })}>Open</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>Drawer Description</DrawerDescription>
    </DrawerHeader>
    <DrawerPanel>Content</DrawerPanel>
    <DrawerFooter>
      <DrawerClose class={buttonVariants({ variant: 'ghost' })}>Close</DrawerClose>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `DrawerPopup` → ShardsUI `Drawer.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Position**: `position="bottom" | "right" | "left" | "top"` on `Drawer` (default `bottom`); swipe direction is derived (override with `swipeDirection`). `open` and `snapPoint` are bindable; `modal`, `onOpenChange`, `snapPoints` are supported.
- **Popup options**: `variant="default" | "straight" | "inset"`, `showBar` (drag handle), `showCloseButton`.
- **Panel**: `DrawerPanel` scrolls by default (`scrollable`, `scrollFade`); `DrawerFooter variant="bare"` removes framing.
- **Footer action order**: write Cancel first and the primary action last. `DrawerFooter` is `flex-col-reverse` on mobile and `sm:flex-row sm:justify-end` from `sm` up. The same applies to `DialogFooter` and `AlertDialogFooter`.
- **Snap points** (bottom drawers only): `<Drawer bind:snapPoint snapPoints={['300px', 1]}>`.
- **Software keyboard**: handled automatically for bottom drawers; put scrolling fields in `DrawerPanel` and persistent input rows after it. Set `class="[--drawer-height:calc(100dvh-3rem)]"` on `DrawerPopup` for a fixed height.
- **Drawer menus**: `DrawerMenu` + `DrawerMenuItem`/`Group`/`GroupLabel`/`Separator`/`CheckboxItem` (`variant="switch"`)/`RadioGroup`/`RadioItem` mirror the Menu API. `DrawerMenuItem` does **not** close the drawer — for close-on-click use `<DrawerClose class={drawerMenuItemClass}>Edit</DrawerClose>`. `DrawerMenuTrigger` opens a nested drawer.
- **Responsive dialog/drawer**: Drawer on mobile, Dialog on desktop, same `Form` structure (`p-drawer-12`).

### Key patterns

Side drawer with a form:

```svelte
<Drawer position="right">
  <DrawerTrigger class={buttonVariants({ variant: 'outline' })}>Edit profile</DrawerTrigger>
  <DrawerPopup variant="inset" showCloseButton>
    <DrawerHeader>
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerDescription>Make changes to your profile here.</DrawerDescription>
    </DrawerHeader>
    <Form class="contents" onsubmit={handleSubmit}>
      <DrawerPanel class="grid gap-4">…fields…</DrawerPanel>
      <DrawerFooter>
        <DrawerClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DrawerClose>
        <Button type="submit">Save</Button>
      </DrawerFooter>
    </Form>
  </DrawerPopup>
</Drawer>
```

Responsive switch:

```svelte
<script lang="ts">
  import { IsMobile } from '#lib/hooks/use-is-mobile.svelte.js';
  const isMobile = new IsMobile();
</script>

{#if isMobile.current}
  <Drawer>…</Drawer>
{:else}
  <Dialog>…</Dialog>
{/if}
```

## Common pitfalls

- Choosing Sheet for side panels; use Drawer. Use Dialog for centered modal flows.
- React habits: `render={<Button />}`, `className`. Use `class={buttonVariants(...)}`, `class`.
- Expecting `DrawerMenuItem` to close the drawer on click.
- Putting the primary action before Cancel in `DrawerFooter`.
- Breaking section layout by putting the whole drawer in a block-level `<form>`; prefer header outside, `Form class="contents"` around panel + footer.
- Using snap points on non-bottom drawers.

## Useful particle references

- simple bottom drawer / without bar / with close button: `p-drawer-1`, `p-drawer-2`, `p-drawer-3`
- inset / straight variants (all positions): `p-drawer-4`, `p-drawer-5`
- scrollable content: `p-drawer-6`
- nested drawers: `p-drawer-7`, `p-drawer-8`
- snap points: `p-drawer-9`
- form with default and bare footer: `p-drawer-10`
- mobile menu: `p-drawer-11`
- responsive dialog: `p-drawer-12`; responsive menu: `p-drawer-13`
- swipe area: `p-drawer-14`
- composer pinned below scrollable content: `p-drawer-15`
