# coss Alert Dialog

## When to use

- Critical confirmation flows before destructive actions.
- Blocking decisions that require explicit acknowledgement.

## When NOT to use

- If the content is informational (no destructive action) -> use Dialog instead.
- If the message is transient feedback -> use Toast instead.
- If the content is contextual and non-blocking -> use Popover instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/alert-dialog.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
</script>
```

Also exported: `AlertDialogContent` (alias of `AlertDialogPopup`), `AlertDialogAction` (plain `<button>` with `variant`/`size`), `AlertDialogMedia` (icon/illustration slot), `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogViewport`, and `AlertDialogCreateHandle()` for detached triggers.

## Minimal pattern

```svelte
<AlertDialog>
  <AlertDialogTrigger class={buttonVariants({ variant: 'destructive-outline' })}>
    Delete Account
  </AlertDialogTrigger>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogClose class={buttonVariants({ variant: 'destructive' })}>
        Delete Account
      </AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
```

Style triggers and close buttons by passing `class={buttonVariants(...)}`. ShardsUI parts have no `render`/`asChild`/`child` API: change the rendered tag with `as` (e.g. `as="a"`), and note their `children` snippet receives part state. Don't nest a `<Button>` inside `AlertDialogTrigger`/`AlertDialogClose` — both already render a `<button>`, so nesting produces invalid button-in-button markup.

`AlertDialogClose` closes the dialog as soon as it is clicked, so use it as the confirm only when the action is synchronous. For async work, see **Async confirmation** below.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `AlertDialogPopup` → ShardsUI `AlertDialog.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Section structure**: keep `AlertDialogHeader` and `AlertDialogFooter` as direct sections of `AlertDialogPopup` (there is no `AlertDialogPanel`; add a plain `div` between them only if you need extra body content).
- **Destructive affordance**: pair destructive trigger/confirm variants (`destructive-outline`, `destructive`) for clear risk signaling.
- **Footer variants**: use `AlertDialogFooter variant="bare"` when border/background framing should be removed.
- **Mobile**: `AlertDialogPopup` sticks to the bottom of the screen on mobile; opt out with `bottomStickOnMobile={false}`.
- **Close confirmation chain**: for unsaved changes in broader workflows, pair with dialog flows like `p-dialog-4`.

### Key patterns

Async confirmation (the dialog stays open until the mutation settles):

```svelte
<script lang="ts">
  let open = $state(false);
  let isPending = $state(false);

  async function handleDelete() {
    isPending = true;
    try {
      await deleteAccount();
      open = false;
    } catch {
      // Keep the dialog open so the user can retry; surface the error (e.g. a toast).
    } finally {
      isPending = false;
    }
  }
</script>

<AlertDialog bind:open>
  <AlertDialogTrigger class={buttonVariants({ variant: 'destructive-outline' })}>
    Delete Account
  </AlertDialogTrigger>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <Button loading={isPending} onclick={handleDelete} variant="destructive">
        Delete Account
      </Button>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
```

- The confirm is a plain `Button` (not `AlertDialogClose`) with `loading`, which disables it and shows the spinner while the request runs.
- Close the dialog from the success path (`open = false`); on failure keep it open so the user can retry.
- Keep Cancel first in source: the footer is `flex-col-reverse` / `sm:flex-row sm:justify-end`, so the confirm renders on the right (or on top when stacked).

Gated confirmation (e.g. type the project name to enable delete): bind an `Input` and derive `disabled` on the confirm — see `p-alert-dialog-320` (built on Dialog).

## Common pitfalls

- Using AlertDialog as a generic content modal instead of high-risk confirmation UI.
- Omitting explicit destructive/cancel action distinction.
- Confirming an async action with `AlertDialogClose`: the dialog closes before the mutation settles, so there is no loading state and nowhere to show a failure.
- Wrapping dialog sections in extra containers that break built-in layout (use `class="contents"` only when needed).
- React habits: `render={<Button />}`, `onOpenChange={setOpen}` with `useState` — use `class={buttonVariants(...)}` and `bind:open`.
- Skipping focus-return and escape-key verification on real trigger flows.

## Useful particle references

- core alert-dialog: `p-alert-dialog-1`
- bare footer: `p-alert-dialog-2`
- basic confirmation / with warning icon: `p-alert-dialog-313`, `p-alert-dialog-314`
- `p-alert-dialog-315` – `p-alert-dialog-332` live in the alert-dialog folder but are built on **Dialog** (scrollable content, typed-name delete gate, form flows) — see [dialog.md](dialog.md)
- related close-confirmation flow: `p-dialog-4`
