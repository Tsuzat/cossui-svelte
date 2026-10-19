# Composition Rules (coss, Svelte)

Use this when composing complex UI from coss primitives and particles.

## Core Rules

- Prefer composing existing primitives over custom wrappers with duplicated behavior.
- For trigger-based primitives (Dialog, Menu, Select, Popover, Tooltip), follow each primitive's documented trigger/content hierarchy; do not mix patterns across components.
- **ShardsUI parts have no `render`, `asChild` or `child` composition.** Trigger and close parts render their own element (usually a `<button type="button">`):
  - style them with `class={buttonVariants({ … })}` instead of nesting a `<Button>` (nesting creates button-in-button);
  - change the tag with `as` (e.g. `as="span"`, `as="a"`);
  - their `children` snippet receives part state when you need it;
  - your event handlers run *before* the part's; call `event.preventShardsUIHandler()` to make the part stand down for one event.
- To build your own styled wrapper of a part, render the part and spread rest props onto it (destructure `ref` with `$bindable` first). Source: ShardsUI [Composition](https://github.com/abdrizik/shardsui-svelte/blob/main/docs/src/content/composition.md).
- To attach one primitive's behavior to another primitive's part (e.g. a tooltip on a `ToggleGroupItem` or `SelectTrigger`), control the overlay (`bind:open`) and anchor its popup with `customAnchor={ref}` / `anchor`, wiring hover/focus handlers on the part.
- Exception: the **Sidebar** parts (`SidebarMenuButton`, `SidebarMenuSubButton`, `SidebarMenuAction`, `SidebarGroupLabel`, `SidebarGroupAction`) and `TreeItem` accept a `child` snippet receiving `{ props }` — spread them onto your element (a link, a `MenuTrigger`, a `CollapsibleTrigger`).
- Preserve the complete composition required for the chosen component and variant. Distinguish caller-supplied parts from parts the coss wrapper already renders; an exported part is not automatically required.
- Use complete sub-structures where required (title/description regions in dialogs).
- For overlays, keep displayed content through the exit transition. Change open state via `bind:open` / `onOpenChange`; defer close-time cleanup or parent unmounting until `onOpenChangeComplete(false)`. `keepMounted` (via `portalProps`) is a separate option for retaining DOM while fully closed. See [portal-props.md](../portal-props.md).
- Never render a dialog *inside* a `MenuPopup`/`PopoverPopup` that closes when the action fires; render it as a sibling driven by state.

## Caller-owned and built-in parts

| Composition | Caller supplies | coss wrapper includes |
| --- | --- | --- |
| Progress or Meter with custom children ([Progress](../primitives/progress.md), [Meter](../primitives/meter.md)) | Track and indicator, if the bar should remain alongside a label or value | Default track and indicator only when there are no children |
| Combobox / Autocomplete / Command results ([Combobox](../primitives/combobox.md), [Autocomplete](../primitives/autocomplete.md), [Command](../primitives/command.md)) | `…List` + `…Collection` with a `children` snippet | — |
| Select options ([Select](../primitives/select.md)) | `SelectItem`s (and `items` on `Select` for `SelectValue`) | `SelectPopup` renders its list and scroll arrows |
| Tabs ([Tabs](../primitives/tabs.md)) | Tabs and panels with matching values | `TabsList` renders its active indicator |
| Combobox chips ([Combobox](../primitives/combobox.md)) | Selected chip content | `ComboboxChip` renders its remove control |
| Slider ([Slider](../primitives/slider.md)) | Nothing (no children) | Control, track, indicator, thumbs |
| Scrollable content ([Scroll Area](../primitives/scroll-area.md)) | Content | `ScrollArea` renders the viewport and scrollbars |
| Skeleton ([Skeleton](../primitives/skeleton.md)) | The real content (required children) | The shimmer overlay while `loading` |
| Overlay close affordance ([Dialog](../primitives/dialog.md), [Drawer](../primitives/drawer.md)) | Add a close control to `DrawerPopup` when wanted | Dialog popups show one by default; Drawer does not |

## Patterns

### Trigger + Popup

```svelte
<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Open</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <DialogPanel>Body</DialogPanel>
  </DialogPopup>
</Dialog>
```

### Portal forwarding (`portalProps`)

Only specific composed wrappers (and `ToastProvider` / `AnchoredToastProvider`) accept optional `portalProps` (spread onto the ShardsUI `Portal`). See `../portal-props.md` for the allowlist.

### Grouped Controls

For connected controls, use the dedicated separator between adjacent items. See the [Group](../primitives/group.md) and [Toggle Group](../primitives/toggle-group.md) guides for vertical-orientation rules and the default Toggle Group exception.

```svelte
<Group>
  <Button variant="outline">A</Button>
  <GroupSeparator />
  <Button variant="outline">B</Button>
</Group>
```

## Anti-patterns

- Building bespoke dropdown/dialog behavior instead of using primitives.
- Porting React/Radix composition (`render={<X />}`, `asChild`, function-as-child) verbatim.
- Omitting caller-supplied subcomponents required by the chosen composition, or duplicating parts already rendered by a coss wrapper.
