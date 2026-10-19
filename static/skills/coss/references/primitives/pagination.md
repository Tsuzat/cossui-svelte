# coss Pagination

## When to use

- Paged navigation over long result sets.
- Prev/next and index controls paired with data tables/lists.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/pagination.json
```

Manual deps from docs: none (custom components; uses `button` styles and `@lucide/svelte` icons).

## Canonical imports

```svelte
<script lang="ts">
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
  } from '#lib/components/ui/pagination/index.js';
</script>
```

## Minimal pattern

```svelte
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

`Pagination` renders `<nav aria-label="pagination">`; `PaginationLink` is an anchor with `isActive` and `size` (button sizes, default `icon`).

## Patterns from coss particles

### Key patterns

Derive the links from state with `{#each}`:

```svelte
<script lang="ts">
  let { currentPage, totalPages }: { currentPage: number; totalPages: number } = $props();
  const pages = $derived(Array.from({ length: totalPages }, (_, i) => i + 1));
</script>

<Pagination>
  <PaginationContent>
    {#each pages as page (page)}
      <PaginationItem>
        <PaginationLink href={`?page=${page}`} isActive={page === currentPage}>{page}</PaginationLink>
      </PaginationItem>
    {/each}
  </PaginationContent>
</Pagination>
```

Prev/next only, with disabled boundaries — use `Button` with `href` (it drops `href` and sets `aria-disabled` when disabled):

```svelte
<PaginationContent class="w-full justify-between gap-2">
  <PaginationItem>
    <Button disabled={currentPage === 1} href={`?page=${currentPage - 1}`} variant="outline">Previous</Button>
  </PaginationItem>
  <PaginationItem>
    <Button disabled={currentPage === totalPages} href={`?page=${currentPage + 1}`} variant="outline">Next</Button>
  </PaginationItem>
</PaginationContent>
```

## Common pitfalls

- Using pagination controls without synchronizing data/page state (prefer the URL as source of truth in SvelteKit).
- Mixing pagination with infinite-scroll UX in the same surface.
- Missing disabled-state handling on prev/next boundaries.

## Useful particle references

- numbered pagination: `p-pagination-1`
- previous/next only: `p-pagination-2`
- page-size select with previous/next: `p-pagination-3`
