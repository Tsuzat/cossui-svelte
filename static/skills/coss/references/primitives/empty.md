# coss Empty

## When to use

- No-data/no-results states with guidance.
- Action-oriented recovery UIs when content lists are empty.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/empty.json
```

Manual deps from docs: none (custom components).

## Canonical imports

```svelte
<script lang="ts">
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  import InboxIcon from '@lucide/svelte/icons/inbox';
</script>

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <InboxIcon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>
```

## Patterns from coss particles

### Key patterns

`EmptyMedia variant="icon"` frames an icon; the default variant holds anything else (an image, an `Avatar`, an illustration).

```svelte
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FolderIcon aria-hidden="true" />
    </EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Get started by creating your first project.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>
      <PlusIcon aria-hidden="true" />
      New Project
    </Button>
  </EmptyContent>
</Empty>
```

Always include an actionable next step (button, link) in `EmptyContent`. `EmptyMedia` is also handy outside `Empty`, e.g. inside `CommandEmpty` (`p-command-2`).

## Common pitfalls

- Presenting empty states without an actionable next step.
- Using the empty state for loading/error states instead of `Skeleton`/`Spinner`/`Alert`.
- Copy-only empty states with no context-specific guidance for recovery.

## Useful particle references

- icon + actions: `p-empty-1`
