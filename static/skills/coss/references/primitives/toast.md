# coss Toast

## Architecture note

- coss toast is built on ShardsUI (Base UI) toast primitives, not Sonner / svelte-sonner.
- There is no `toast()` + `<Toaster />` API: use `toastManager` / `anchoredToastManager` with the coss providers.

## When to use

- Temporary in-app feedback notifications.
- Anchored contextual toasts tied to a target element.

## When NOT to use

- If the message requires user acknowledgment before proceeding -> use AlertDialog instead.
- If the feedback is inline and persistent -> use Alert instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/toast.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Required app setup

Wrap the app once, in `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
  import { AnchoredToastProvider, ToastProvider } from '#lib/components/ui/toast/index.js';

  let { children } = $props();
</script>

<ToastProvider>
  <AnchoredToastProvider>
    {@render children()}
  </AnchoredToastProvider>
</ToastProvider>
```

`ToastProvider position` sets the stacked viewport: `top-left | top-center | top-right | bottom-left | bottom-center | bottom-right` (default `bottom-right`).

## Portal forwarding

Optional `portalProps` on `ToastProvider` and `AnchoredToastProvider` → ShardsUI `Toast.Portal` (e.g. `container`). See [portal-props.md](../portal-props.md).

## Canonical imports

```ts
import { anchoredToastManager, toastManager } from '#lib/components/ui/toast/index.js';
```

Types `ToastData`, `ToastManagerAddOptions`, `ToastManagerPromiseOptions`, `ToastManagerUpdateOptions`, `ToastObject`, `ToastPosition` and `ToastPrimitive` are also exported. The managers are plain modules — call them from any event handler, no hook needed.

## Minimal pattern

```ts
toastManager.add({
  title: 'Saved',
  description: 'Your changes have been updated.'
});
```

`add()` accepts `title`, `description`, `type` (`success | error | info | warning | loading`), `timeout`, `id`, `actionProps`, `data` (incl. `rootProps`, `tooltipStyle`), and returns the toast id. `close(id)`, `update(id, …)` and `promise(promise, { loading, success, error })` are available.

## Patterns from coss particles

Action / undo:

```ts
const id = toastManager.add({
  title: 'Action performed',
  description: 'You can undo this action.',
  type: 'success',
  actionProps: {
    children: 'Undo',
    onclick: () => {
      toastManager.close(id);
      undo();
    }
  }
});
```

Promise lifecycle:

```ts
await toastManager.promise(saveData(), {
  loading: { title: 'Saving…' },
  success: (data) => ({ title: 'Saved', description: String(data) }),
  error: () => ({ title: 'Something went wrong', description: 'Please try again.' })
});
```

Deduplicate / upsert — pass a stable `id`; a repeated `add` updates in place and replays a short re-notify animation:

```ts
toastManager.add({ id: 'autosave', title: 'Saved', description: 'Draft updated.' });
```

Anchored (pass the element, e.g. `event.currentTarget`); `tooltipStyle` shows only the title:

```svelte
<script lang="ts">
  function handleCopy(e: MouseEvent) {
    navigator.clipboard.writeText(url);
    anchoredToastManager.add({
      title: 'Copied!',
      timeout: 2000,
      positionerProps: { anchor: e.currentTarget as HTMLElement },
      data: { tooltipStyle: true }
    });
  }
</script>

<button type="button" onclick={handleCopy}>Copy link</button>
```

## Common pitfalls

- Forgetting the provider setup before calling the managers.
- Using anchored toasts without a valid `anchor` element (React `buttonRef.current` → here `event.currentTarget` or a `bind:this` ref).
- Expecting description/actions with `tooltipStyle` (only `title` renders).
- Copy/pasting Sonner examples (`toast.success(...)`, `<Toaster />`) without adapting to `toastManager`.
- Event handler casing: `actionProps.onclick`, not `onClick`.

## Useful particle references

- basic: `p-toast-1`
- typed variants: `p-toast-2`
- loading: `p-toast-3`
- action/undo: `p-toast-4`
- promise / long-running with cancel: `p-toast-5`, `p-toast-9`
- varying heights: `p-toast-6`
- anchored tooltip-style copy / anchored error: `p-toast-7`, `p-toast-8`
- deduplicated stacked success / error: `p-toast-10`, `p-toast-11`
- deduplicated anchored success / error: `p-toast-12`, `p-toast-13`
- anchored toast inside another primitive: `p-toggle-8`
