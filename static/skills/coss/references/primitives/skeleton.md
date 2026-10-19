# coss Skeleton

## When to use

- Loading placeholders matching final layout density.
- Perceived-performance improvement during fetch/render latency.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/skeleton.json
```

Manual deps from docs:

```bash
npm install @aejkatappaja/phantom-ui
```

**Different from upstream coss.** This Skeleton is a thin wrapper around the `<phantom-ui>` custom element: it wraps the *real* content and, while `loading` is true, overlays an animated shimmer that mirrors the rendered layout. You don't draw skeleton shapes by hand, and it is not a standalone gray box.

## Canonical imports

```svelte
<script lang="ts">
  import { Skeleton } from '#lib/components/ui/skeleton/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let loading = $state(true);
</script>

<Skeleton {loading} class="flex items-center gap-4">
  <Avatar class="size-10">
    <AvatarImage alt={user.name} src={user.image} />
    <AvatarFallback>{user.initials}</AvatarFallback>
  </Avatar>
  <div class="flex flex-col gap-1">
    <h4 class="font-medium text-sm">{user.name}</h4>
    <span class="text-muted-foreground text-xs">{user.role}</span>
  </div>
</Skeleton>
```

`children` is required. Size and lay out the wrapper with `class`; all `phantom-ui` attributes (`loading`, …) are forwarded.

## Patterns from coss particles

### Key patterns

Loading → loaded handoff: render the final markup once and toggle `loading` when data arrives — no separate skeleton tree and no layout shift.

Skeleton-only layout (no data yet): render empty sized elements as children; phantom-ui shimmers their boxes:

```svelte
<Skeleton loading class="flex w-full max-w-92 items-center gap-4">
  <div class="size-10 rounded-full"></div>
  <div class="flex flex-1 flex-col">
    <div class="my-0.5 h-4 max-w-54"></div>
    <div class="my-0.5 h-4 w-1/2"></div>
  </div>
  <div class="h-6 w-17"></div>
</Skeleton>
```

## Common pitfalls

- Upstream habit: `<Skeleton class="size-10 rounded-full" />` as a self-closing placeholder box. Here `children` is required — wrap the content (or sized placeholders).
- Leaving `loading` true after data arrives.
- Using skeleton for very short operations where spinner/text is clearer.

## Useful particle references

- loading → loaded user cards: `p-skeleton-1`
- skeleton-only layout: `p-skeleton-2`
