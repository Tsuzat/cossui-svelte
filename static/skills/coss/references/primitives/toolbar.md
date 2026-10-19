# coss Toolbar

## When to use

- Grouped command/action strips.
- Editor-like tool controls and mode toggles.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/toolbar.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Toolbar,
    ToolbarButton,
    ToolbarGroup,
    ToolbarInput,
    ToolbarLink,
    ToolbarSeparator
  } from '#lib/components/ui/toolbar/index.js';
</script>
```

`ToolbarPrimitive` is re-exported.

## Minimal pattern

```svelte
<Toolbar>
  <ToolbarGroup>
    <ToolbarButton class={buttonVariants({ size: 'sm', variant: 'ghost' })}>Bold</ToolbarButton>
    <ToolbarButton class={buttonVariants({ size: 'sm', variant: 'ghost' })}>Underline</ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarGroup>
    <Button>Save</Button>
  </ToolbarGroup>
</Toolbar>
```

`ToolbarButton` is an unstyled ShardsUI `Toolbar.Button` (it only takes your `class`) — give it `buttonVariants(...)` for button styling.

## Patterns from coss particles

- **Grouped layout**: `ToolbarGroup` boundaries with `ToolbarSeparator` between logical clusters.
- **Formatting rows**: put a `ToggleGroup` (with `class="border-none p-0"`) directly in the toolbar for alignment/formatting toggles.
- **Embedded controls**: `Select`, `Button`, `ToolbarInput`, `ToolbarLink` sit inside `ToolbarGroup`s.
- **Icon-only controls**: explicit `aria-label`, plus a `Tooltip` for discoverability. For plain buttons use `TooltipTrigger class={buttonVariants({ size: 'icon', variant: 'ghost' })}`; for parts that can't be the trigger (a `ToggleGroupItem`, a `SelectTrigger`), control the `Tooltip` with `bind:open` and anchor `TooltipPopup customAnchor={ref}` (see [tooltip.md](tooltip.md)).

```svelte
<TooltipProvider>
  <Toolbar>
    <ToggleGroup class="border-none p-0" value={['left']}>
      <ToggleGroupItem aria-label="Align left" value="left"><AlignLeftIcon /></ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center"><AlignCenterIcon /></ToggleGroupItem>
    </ToggleGroup>
    <ToolbarSeparator />
    <ToolbarGroup>
      <Tooltip>
        <TooltipTrigger aria-label="Format as currency" class={buttonVariants({ size: 'icon', variant: 'ghost' })}>
          <DollarSignIcon />
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Format as currency</TooltipPopup>
      </Tooltip>
    </ToolbarGroup>
  </Toolbar>
</TooltipProvider>
```

## Common pitfalls

- React habits: `ToolbarButton render={<ToggleGroupItem />}` / `render={<Button />}`. ShardsUI has no `render` prop — style `ToolbarButton` with `buttonVariants`, or place the other primitive directly.
- Dropping `ToolbarSeparator`, collapsing unrelated clusters visually.
- Missing `aria-label` on icon-only toolbar actions.
- Treating Toolbar as a state manager; selection state lives in the composed primitives (`ToggleGroup`, `Select`).

## Useful particle references

- toggles + buttons + select with tooltips: `p-toolbar-1`
- related: `p-toggle-group-9`, `p-group-1`, `p-select-1`
