# coss Badge

## When to use

- Short status/category labels and counts.
- Inline metadata chips paired with buttons, tables, and cards.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/badge.json
```

Manual deps from docs: none beyond `tailwind-variants` (custom component, not a ShardsUI wrapper).

## Canonical imports

```svelte
<script lang="ts">
  import { Badge, badgeVariants } from '#lib/components/ui/badge/index.js';
</script>
```

## Minimal pattern

```svelte
<Badge>Badge</Badge>
```

Renders a `<span>`, or an `<a>` when `href` is set: `<Badge href="/pricing">New</Badge>`.

## Patterns from coss particles

### Key patterns

Variants via `variant`, sizes via `size` (`sm | default | lg`):

```svelte
<Badge>Default</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge size="sm">Small</Badge>
```

Badge with decorative icon:

```svelte
<Badge variant="outline">
  <CheckIcon aria-hidden="true" />
  Verified
</Badge>
```

Badge inside a button (negative margin for alignment):

```svelte
<Button variant="outline">
  Messages
  <Badge class="-me-1" variant="outline">18</Badge>
</Button>
```

Removable badge: put a real `<button type="button" aria-label="Remove …">` inside the badge and toggle it with `$state` (see `p-badge-20`).

Use `badgeVariants({ variant, size })` to give badge styling to another element.

## Common pitfalls

- Using badge as interactive button without proper button semantics — use `href` for links or nest a real `<button>`.
- Applying raw palette classes instead of semantic tokens/variants for status.
- Overloading badge content with long text that should be normal body copy.

## Useful particle references

- variants: `p-badge-1` – `p-badge-8`
- sizes: `p-badge-9` (sm), `p-badge-10` (lg)
- icon / link / count: `p-badge-11`, `p-badge-12`, `p-badge-13`
- pill / number after text: `p-badge-14`, `p-badge-15`
- status badges (paid/pending/failed): `p-badge-16`, `p-badge-17`, `p-badge-18`
- selectable with checkbox / removable: `p-badge-19`, `p-badge-20`
- dismissible unread count on a button: `p-badge-100`
