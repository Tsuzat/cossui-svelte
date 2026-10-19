# coss Preview Card

## When to use

- Hover/focus-triggered rich preview content.
- Contextual details for users/entities/links without full navigation.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/preview-card.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    PreviewCard,
    PreviewCardPopup,
    PreviewCardTrigger
  } from '#lib/components/ui/preview-card/index.js';
</script>
```

Also exported under shadcn names: `HoverCard`, `HoverCardTrigger`, `HoverCardContent`; plus `PreviewCardPrimitive`.

## Minimal pattern

```svelte
<PreviewCard>
  <PreviewCardTrigger href="/user/johndoe">@johndoe</PreviewCardTrigger>
  <PreviewCardPopup>Preview Card Content</PreviewCardPopup>
</PreviewCard>
```

`PreviewCardTrigger` renders an `<a>` by default — pass `href` directly (or style it with `class={buttonVariants({ variant: 'ghost' })}`).

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `PreviewCardPopup` → ShardsUI `PreviewCard.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).
- **Popup options**: `side`, `align`, `sideOffset` (default `4`), `alignOffset`, `showArrow`, `customAnchor`.

### Key patterns

Preview card with rich content:

```svelte
<PreviewCard>
  <PreviewCardTrigger href="/user/johndoe">@johndoe</PreviewCardTrigger>
  <PreviewCardPopup class="w-80">
    <div class="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/avatar.png" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p class="font-semibold text-sm">John Doe</p>
        <p class="text-muted-foreground text-xs">Software Engineer</p>
      </div>
    </div>
  </PreviewCardPopup>
</PreviewCard>
```

For URL previews with fetched metadata, see Link Preview ([link-preview.md](link-preview.md)).

## Common pitfalls

- React habits: `render={<a href="…" />}` on the trigger. The trigger already is an `<a>`; pass `href`.
- Using preview card for critical workflows requiring explicit modal interaction.
- Missing accessible trigger labels when using icon-only triggers.
- Rendering heavy async content on every hover without caching.

## Useful particle references

- link preview popup: `p-preview-card-1`
