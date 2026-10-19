# coss Frame

## When to use

- Bordered app surfaces around content blocks.
- Container wrapper for data components like tables, lists, and panes.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/frame.json
```

Manual deps from docs: none (custom components).

## Canonical imports

```svelte
<script lang="ts">
  import {
    Frame,
    FrameDescription,
    FrameFooter,
    FrameHeader,
    FramePanel,
    FrameTitle
  } from '#lib/components/ui/frame/index.js';
</script>
```

## Minimal pattern

```svelte
<Frame>
  <FrameHeader>
    <FrameTitle>Title</FrameTitle>
    <FrameDescription>Description</FrameDescription>
  </FrameHeader>
  <FramePanel>Content</FramePanel>
  <FrameFooter>Footer</FrameFooter>
</Frame>
```

## Patterns from coss particles

### Key patterns

Frame with header actions:

```svelte
<Frame>
  <FrameHeader class="flex items-center justify-between">
    <div>
      <FrameTitle>Users</FrameTitle>
      <FrameDescription>Manage team members.</FrameDescription>
    </div>
    <Button size="sm">Add User</Button>
  </FrameHeader>
  <FramePanel><!-- table or list --></FramePanel>
  <FrameFooter>
    <p class="text-muted-foreground text-sm">Showing 1-10 of 100</p>
  </FrameFooter>
</Frame>
```

Multiple `FramePanel`s are separated with spacing by default; see `p-frame-4` for stacked panels. Use `Frame` to normalize border/radius around heterogeneous inner content (tables, lists, cards). For a framed card layout with a header action, also consider `CardFrame` ([card.md](card.md)).

## Common pitfalls

- Using nested frames excessively, causing dense double borders.
- Applying frame as layout grid replacement instead of content surface wrapper.
- Forgetting to align inner component width expectations (table/list full width).

## Useful particle references

- basic: `p-frame-1`
- collapsible content with delete button: `p-frame-2`
- separated panels: `p-frame-3`
- stacked panels: `p-frame-4`
