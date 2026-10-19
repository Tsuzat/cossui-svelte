# coss Star Rating (cossui-svelte only)

## When to use

- Collecting or displaying a 1–N rating (stars, hearts, custom icons), optionally with half steps.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/starrating.json
```

```bash
npm install @lucide/svelte tailwind-variants
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    StarRating,
    StarRatingValue,
    type StarRatingState
  } from '#lib/components/ui/starrating/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state(3);
</script>

<StarRating bind:value />
<StarRatingValue {value} max={5} />
```

Props: `value` (bindable, default `0`), `max` (`5`), `allowHalf`, `size` (`sm | default | lg | xl`), `disabled`, `readonly`, `label` (`'Rating'`), `name` (renders a hidden input for native form submission), `icon` snippet `({ index, state })` where `state` is `'empty' | 'half' | 'full'`.

## Patterns from coss particles

Custom icon (hearts) with half precision — draw the empty icon and clip a filled copy by `state`:

```svelte
{#snippet icon({ state }: { index: number; state: StarRatingState })}
  <HeartIcon class="text-muted-foreground" />
  <span
    class="absolute inset-0 overflow-hidden"
    style="width: {state === 'full' ? 100 : state === 'half' ? 50 : 0}%"
  >
    <HeartIcon class="fill-rose-500 text-rose-500" />
  </span>
{/snippet}

<StarRating bind:value allowHalf {icon} aria-label="Rate this product" />
```

Display-only: `readonly` plus a review count next to it. In forms: `Field name="rating"` + `FieldLabel`, and pass `name`.

## Common pitfalls

- Forgetting `name` when the rating must be submitted with a native form.
- Using `disabled` for display-only ratings — use `readonly`.

## Useful particle references

- basic: `p-starrating-1`
- half stars with live value: `p-starrating-2`
- readonly with review count: `p-starrating-3`
- in a form field: `p-starrating-4`
- per-star colors: `p-starrating-5`
- custom heart icon: `p-starrating-6`
