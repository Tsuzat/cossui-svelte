# coss Aspect Ratio (cossui-svelte only)

## When to use

- Media (images, video, maps, embeds) that must keep a fixed width-to-height ratio as the container resizes.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/aspect-ratio.json
```

No extra dependencies (custom component).

## Canonical imports

```svelte
<script lang="ts">
  import { AspectRatio } from '#lib/components/ui/aspect-ratio/index.js';
</script>
```

## Minimal pattern

```svelte
<div class="w-full max-w-sm">
  <AspectRatio ratio={16 / 9}>
    <img alt="Landscape" class="size-full rounded-lg object-cover" src="/photo.jpg" />
  </AspectRatio>
</div>
```

`ratio` defaults to `1`. The component renders its own wrapper (width 100%, height derived from `ratio`) and absolutely positions its children, so children should fill it (`size-full`). Constrain the width on a parent. Standard `div` attributes are forwarded.

## Common pitfalls

- Giving children an explicit height — they should fill (`size-full` + `object-cover`).
- Expecting the component to limit width; wrap it in a sized parent.

## Useful particle references

- 1:1, 9:16, 16:9, 21:9: `p-aspect-ratio-1`, `p-aspect-ratio-2`, `p-aspect-ratio-3`, `p-aspect-ratio-4`
