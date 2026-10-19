# Portal forwarding (`portalProps`)

Several composed coss primitives wrap a ShardsUI **`Portal`** inside their `*Popup` (or dialog-style) component, and toast exposes the same on **`ToastProvider`** / **`AnchoredToastProvider`**. Those surfaces accept an optional **`portalProps`** object, which is spread onto the internal `Portal`.

Use it when you need portal-level behavior, for example:

- **`keepMounted`** — keep the popup DOM while closed, where that component's `Portal` supports it (see the ShardsUI docs for the component).
- **`container`** — render portaled content into a specific DOM node (stacking contexts, micro-frontends, shadow DOM setups).
- Other props accepted by that component's `Portal` (e.g. `class`).

```svelte
<script lang="ts">
  let host = $state<HTMLElement | null>(null);
</script>

<div bind:this={host}></div>
<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Open</DialogTrigger>
  <DialogPopup portalProps={{ container: host, keepMounted: true }}>…</DialogPopup>
</Dialog>
```

## Surfaces that expose `portalProps`

- **Modals / overlays:** `DialogPopup`, `AlertDialogPopup`, `DrawerPopup`, `CommandDialogPopup`
- **Floating layers:** `MenuPopup`, `MenuSubPopup`, `ContextMenuPopup`, `ContextMenuSubPopup`, `PopoverPopup`, `TooltipPopup`, `PreviewCardPopup`, `AutocompletePopup`, `ComboboxPopup`, `SelectPopup`
- **Port-only:** `ComposerPopup`, `LinkPreviewContent`
- **Toast (providers, not a `*Popup` name):** `ToastProvider`, `AnchoredToastProvider` — forwarded to the internal `Toast.Portal` for the stacked and anchored viewports

The legacy `SheetPopup` also accepts `portalProps`; this is compatibility information, not a recommendation to use Sheet. Use [Drawer](primitives/drawer.md) instead.

Only these surfaces accept `portalProps`. Anything else that portals content keeps the portal internal — compose the ShardsUI parts yourself (`*Primitive` re-exports, e.g. `MenuPortal`, `DialogPortal`) if you need direct portal control.

## Positioner vs portal

`portalProps` only affects the **portal** node. To tweak **placement**, use the popup's own `side`, `align`, `sideOffset`, `alignOffset`, and where available `anchor` / `customAnchor`.
