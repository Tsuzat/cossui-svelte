# coss Breadcrumb

## When to use

- Hierarchy/location indicators for current page context.
- Compact navigation trails for nested routes and detail pages.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/breadcrumb.json
```

Manual deps from docs: none (custom component, not a ShardsUI wrapper). The default separator/ellipsis icons come from `@lucide/svelte`.

## Canonical imports

```svelte
<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '#lib/components/ui/breadcrumb/index.js';
</script>
```

## Minimal pattern

```svelte
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

`BreadcrumbLink` is a plain `<a>` (all anchor attributes pass through); `BreadcrumbPage` carries `aria-current="page"`. In SvelteKit, pass resolved routes (`resolve('/docs')` from `$app/paths`) as `href`.

## Patterns from coss particles

### Key patterns

Icon-only home link (requires `aria-label`):

```svelte
<BreadcrumbItem>
  <BreadcrumbLink aria-label="Home" href="/">
    <HomeIcon aria-hidden="true" class="size-4" />
  </BreadcrumbLink>
</BreadcrumbItem>
```

Custom separator (children replace the default chevron):

```svelte
<BreadcrumbSeparator>
  <SlashIcon class="size-3.5" />
</BreadcrumbSeparator>
```

Collapsed items in a menu — the ellipsis becomes a `MenuTrigger`:

```svelte
<BreadcrumbItem>
  <Menu>
    <MenuTrigger aria-label="More pages" class={buttonVariants({ size: 'icon-sm', variant: 'ghost' })}>
      <BreadcrumbEllipsis />
    </MenuTrigger>
    <MenuPopup align="start">
      <MenuLinkItem href="/docs">Docs</MenuLinkItem>
      <MenuLinkItem href="/particles">Particles</MenuLinkItem>
    </MenuPopup>
  </Menu>
</BreadcrumbItem>
```

## Common pitfalls

- Using breadcrumb as primary nav menu instead of contextual trail.
- Omitting `aria-label` on icon-only breadcrumb items.
- Rendering the current page as a `BreadcrumbLink` instead of `BreadcrumbPage`.
- Adding deep breadcrumb chains without meaningful hierarchy.

## Useful particle references

- collapsed items in a menu: `p-breadcrumb-1`
- custom separator: `p-breadcrumb-2`, dot separators: `p-breadcrumb-6`
- home icon / icons before text: `p-breadcrumb-3`, `p-breadcrumb-5`
- folder icon menu: `p-breadcrumb-4`
- select dropdown in the trail: `p-breadcrumb-7`
- bordered card container: `p-breadcrumb-100`
