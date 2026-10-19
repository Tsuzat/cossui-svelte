# coss Sheet (legacy)

Sheet has been replaced by [Drawer](drawer.md). Do not use Sheet for new UI, including desktop side panels. cossui-svelte still ships `#lib/components/ui/sheet` (a ShardsUI Dialog styled as an edge panel) for existing code.

## Migrating an existing Sheet

- Follow the Drawer guide and an existing Drawer particle for the complete composition.
- Replace Sheet parts with the corresponding Drawer parts (`Sheet` → `Drawer`, `SheetTrigger` → `DrawerTrigger`, `SheetPopup` → `DrawerPopup`, `SheetHeader`/`SheetTitle`/`SheetDescription`/`SheetPanel`/`SheetFooter`/`SheetClose` → `Drawer…`); verify their props rather than performing a name-only replacement.
- Placement moves to the root: `<Drawer position="right">` (or `left`, `top`, `bottom`) instead of `side` on `SheetPopup`.
- `variant="inset"` carries over to `DrawerPopup`; Drawer also has `straight`.
- `DrawerPopup` does not show a close button by default (Sheet did). Add `showCloseButton` or a `DrawerClose` action.
- Preserve accessible naming, form state (`<Form class="contents">` around panel + footer), focus behavior, and exit-transition cleanup. Check scrolling and dismissal after migration.

```svelte
<!-- before -->
<Sheet>
  <SheetTrigger class={buttonVariants({ variant: 'outline' })}>Open</SheetTrigger>
  <SheetPopup side="left" variant="inset">…</SheetPopup>
</Sheet>

<!-- after -->
<Drawer position="left">
  <DrawerTrigger class={buttonVariants({ variant: 'outline' })}>Open</DrawerTrigger>
  <DrawerPopup variant="inset" showCloseButton>…</DrawerPopup>
</Drawer>
```

This legacy reference does not authorize a bulk migration or removal of the existing Sheet implementation.

## Legacy particle references

- `p-sheet-1` (basic), `p-sheet-2` (inset), `p-sheet-3` (positions) — compare with `p-drawer-4` / `p-drawer-5`.
