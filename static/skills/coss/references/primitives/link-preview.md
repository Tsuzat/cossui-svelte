# coss Link Preview (cossui-svelte only)

## When to use

- Hovering a link shows a rich preview card (title, description, image) of its destination.

## When NOT to use

- For previews of users/entities that are not links -> use Preview Card directly.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/link-preview.json
```

A thin wrapper over [Preview Card](preview-card.md) (`@shardsui/svelte`).

## Canonical imports

```svelte
<script lang="ts">
  import {
    LinkPreviewCard,
    LinkPreviewContent,
    LinkPreviewTrigger
  } from '#lib/components/ui/link-preview/index.js';
</script>
```

## Minimal pattern

```svelte
<LinkPreviewCard>
  <LinkPreviewTrigger href="https://svelte.dev">@svelte</LinkPreviewTrigger>
  <LinkPreviewContent>The Svelte Framework.</LinkPreviewContent>
</LinkPreviewCard>
```

- `LinkPreviewCard`: same props as `PreviewCard` (`open` bindable).
- `LinkPreviewTrigger`: the link; accepts `delay` and `closeDelay`.
- `LinkPreviewContent`: `side`, `align`, `sideOffset` (`4`), `alignOffset`, `showArrow`, `portalProps` ([portal-props.md](../portal-props.md)).

## Common pitfalls

- Fetching preview metadata on every hover without caching.
- Putting essential information only in the preview (it is hover/focus-only).

## Useful particle references

- link preview on hover: `p-link-preview-1`
