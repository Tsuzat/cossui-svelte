# coss Dialog

## When to use

- Modal overlays that require user focus and explicit action.
- Multi-section popup flows with header/body/footer structure.

## When NOT to use

- If the overlay should slide from the edge -> use Drawer instead.
- If the interaction is a destructive confirmation -> use AlertDialog instead.
- If the content is non-blocking contextual info -> use Popover instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/dialog.json
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
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '#lib/components/ui/dialog/index.js';
</script>
```

Also exported: `DialogContent` (alias of `DialogPopup`), `DialogBackdrop`/`DialogOverlay`, `DialogPortal`, `DialogViewport`, and `DialogCreateHandle()`.

## Minimal pattern

```svelte
<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Open Dialog</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog Description</DialogDescription>
    </DialogHeader>
    <DialogPanel>Content</DialogPanel>
    <DialogFooter>
      <DialogClose class={buttonVariants({ variant: 'ghost' })}>Close</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

`DialogTrigger` and `DialogClose` already render a `<button type="button">`; style them with `class={buttonVariants(...)}` rather than nesting a `<Button>`. ShardsUI parts have no `render`/`asChild`/`child` API — use `as` to change the tag.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `DialogPopup` → ShardsUI `Dialog.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Popup options**: `showCloseButton` (default `true`), `bottomStickOnMobile` (default `true`), `closeProps` (e.g. override the close button `aria-label`).
- **Section structure invariant**: keep `DialogHeader`, `DialogPanel`, and `DialogFooter` as direct sections in `DialogPopup` to preserve built-in layout/styling behavior.
- **Form in dialog**: keep `DialogHeader` outside the form; wrap `DialogPanel` + `DialogFooter` in `<Form class="contents">` (or native `<form class="contents">`) so the popup's flex column treats header, panel, and footer as direct layout sections.
- **Action buttons**: `DialogClose class={buttonVariants(...)}` for cancel/close; set explicit `type="submit"` on submit buttons.
- **Scrollable content**: keep long content inside `DialogPanel` (it wraps a `ScrollArea`; `scrollFade` defaults to `true`).
- **Footer variants**: `DialogFooter variant="bare"` removes border/background; `showCloseButton` on the footer renders a built-in outline "Close" button.
- **Controlled open state**: `bind:open` on `Dialog` for cross-component flows (e.g. a menu item that opens a dialog).
- **Detached trigger**: when the opener lives elsewhere, either control `open` from shared state, or create `const handle = DialogCreateHandle()` and pass `handle={handle}` to both `Dialog` and the remote `DialogTrigger`.
- **Close confirmation flow**: with unsaved changes, use `open` + `onOpenChange` to intercept closing and show an `AlertDialog`.
- **Nested dialogs**: supported; consider `showCloseButton={false}` when custom actions are preferred.
- **Responsive dialog/drawer**: for form-heavy overlays, render `Dialog` on desktop and `Drawer` on mobile (`new IsMobile()` from `#lib/hooks/use-is-mobile.svelte.js`, or a `MediaQuery` from `svelte/reactivity`), keeping the same `Form` structure in both.

### Key patterns

Open from a menu item (controlled):

```svelte
<script lang="ts">
  let dialogOpen = $state(false);
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: 'outline' })}>Open menu</MenuTrigger>
  <MenuPopup align="start">
    <MenuItem onclick={() => (dialogOpen = true)}>Open dialog</MenuItem>
  </MenuPopup>
</Menu>

<Dialog bind:open={dialogOpen}>
  <DialogPopup>…</DialogPopup>
</Dialog>
```

Form in dialog:

```svelte
<DialogPopup>
  <DialogHeader>
    <DialogTitle>Edit profile</DialogTitle>
  </DialogHeader>
  <Form class="contents" onsubmit={handleSubmit}>
    <DialogPanel class="grid gap-4">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input name="name" />
      </Field>
    </DialogPanel>
    <DialogFooter>
      <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </Form>
</DialogPopup>
```

Close confirmation:

```svelte
<script lang="ts">
  let dialogOpen = $state(false);
  let confirmOpen = $state(false);
  let value = $state('');
</script>

<Dialog
  open={dialogOpen}
  onOpenChange={(o) => {
    if (!o && value) confirmOpen = true;
    else dialogOpen = o;
  }}
>
  …
</Dialog>
<AlertDialog bind:open={confirmOpen}>…discard / keep editing…</AlertDialog>
```

## Common pitfalls

- React habits: `render={<Button />}`, `className`, `onOpenChange={setOpen}` with `useState`. Use `class={buttonVariants(...)}`, `class`, and `bind:open`.
- Nesting `<Button>` inside `DialogTrigger`/`DialogClose` (button-in-button).
- Forgetting title/description structure in real dialogs.
- Wrapping dialog sections with extra containers that break `DialogHeader`/`DialogPanel`/`DialogFooter` layout; prefer header outside, `Form class="contents"` around panel + footer only.
- Putting large body content outside `DialogPanel` when scrolling is needed.
- Missing explicit `type="submit"` inside dialog forms.

## Useful particle references

- basic dialog: `p-dialog-1`
- open from a menu: `p-dialog-2`
- nested dialogs: `p-dialog-3`
- close confirmation / unsaved changes: `p-dialog-4`
- long scrollable content: `p-dialog-5`
- bare footer: `p-dialog-6`
- responsive dialog/drawer: `p-drawer-12`
- more Dialog-based flows (in the alert-dialog folder): scrollable with native/custom scrollbar `p-alert-dialog-315`, `p-alert-dialog-316`; sticky header/footer `p-alert-dialog-317`, `p-alert-dialog-318`; scroll-to-accept terms `p-alert-dialog-319`; typed-name delete gate `p-alert-dialog-320`; newsletter / feedback / rating `p-alert-dialog-321` – `p-alert-dialog-323`; OTP verification `p-alert-dialog-324`; sign up / sign in `p-alert-dialog-325`, `p-alert-dialog-326`; invite members `p-alert-dialog-327`; card details / checkout / change plan `p-alert-dialog-328` – `p-alert-dialog-330`; edit profile with uploads `p-alert-dialog-331`; multi-step onboarding `p-alert-dialog-332`
