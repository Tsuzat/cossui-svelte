# coss Sidebar

## When to use

- Persistent app shell navigation and grouped links.
- Collapsible/structured side navigation for dashboard layouts.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/sidebar.json
```

Manual deps: `svelte-toolbelt` plus the registry dependencies the item pulls in (button, input, separator, skeleton, tooltip, drawer for mobile).

## Canonical imports

```svelte
<script lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar
  } from '#lib/components/ui/sidebar/index.js';
</script>
```

Also exported: `SidebarInput`, `SidebarMenuSkeleton`.

## Minimal pattern

```svelte
<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Home</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    <!-- page content -->
  </SidebarInset>
</SidebarProvider>
```

## Patterns from coss particles

### Key patterns

Unlike ShardsUI parts, the sidebar parts (`SidebarMenuButton`, `SidebarMenuSubButton`, `SidebarMenuAction`, `SidebarGroupLabel`, `SidebarGroupAction`) **do** take a `child` snippet that receives `{ props }` — spread them onto your own element. Use it for links and for turning a sidebar row into another primitive's trigger:

```svelte
<SidebarMenuItem>
  <SidebarMenuButton isActive={page.url.pathname === '/projects'}>
    {#snippet child({ props })}
      <a href="/projects" {...props}>
        <FolderIcon />
        <span>Projects</span>
      </a>
    {/snippet}
  </SidebarMenuButton>
</SidebarMenuItem>
```

Workspace switcher (row becomes a `MenuTrigger`):

```svelte
<SidebarHeader>
  <SidebarMenu>
    <SidebarMenuItem>
      <Menu>
        <SidebarMenuButton>
          {#snippet child({ props })}
            <MenuTrigger {...props}>
              Select Workspace
              <ChevronDownIcon class="ms-auto" />
            </MenuTrigger>
          {/snippet}
        </SidebarMenuButton>
        <MenuPopup align="start">…</MenuPopup>
      </Menu>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarHeader>
```

Collapsible group toggled from its label:

```svelte
<Collapsible open class="group/collapsible">
  <SidebarGroup>
    <SidebarGroupLabel>
      {#snippet child({ props })}
        <CollapsibleTrigger {...props}>
          Help
          <ChevronDownIcon class="ms-auto transition-transform group-data-open/collapsible:rotate-180" />
        </CollapsibleTrigger>
      {/snippet}
    </SidebarGroupLabel>
    <CollapsiblePanel>
      <SidebarGroupContent>…</SidebarGroupContent>
    </CollapsiblePanel>
  </SidebarGroup>
</Collapsible>
```

Composition rules:

- Wrap the layout with `SidebarProvider` (holds `open`, bindable, persisted in a cookie; `onOpenChange` available).
- `Sidebar` props: `side` (`left | right`), `variant` (`sidebar | floating | inset`), `collapsible` (`offcanvas | icon | none`).
- `SidebarContent` is the scrollable body between header/footer (a `ScrollArea` with `fill`, so `mt-auto` footers pin to the bottom).
- Navigation items: `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton` (`isActive`, `variant`, `size`, `tooltipContent` shown in icon-collapsed mode). Nested: `SidebarMenuSub` > `SidebarMenuSubItem` > `SidebarMenuSubButton`.
- Per-row extras: `SidebarMenuAction` (e.g. a row menu trigger), `SidebarMenuBadge` (counts).
- `SidebarTrigger` toggles; `SidebarRail` is the slim hover/click rail; `SidebarInset` holds main content.
- `useSidebar()` returns `open`, `isMobile`, `state` and helpers like `toggle()` / `setOpen()`.
- Demos inside a bounded box add `transform-gpu` to the container so the `fixed` panel stays inside it.

## Common pitfalls

- React habits: `render={<a href="…" />}` / `asChild` on `SidebarMenuButton`. Use the `child` snippet and spread `props`.
- Using non-existent parts like `SidebarPanel` or `SidebarItem` — use `SidebarContent` and `SidebarMenuItem`.
- Forgetting `SidebarProvider`, which manages collapse state and mobile behavior.
- Skipping the `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton` hierarchy.
- Replacing `SidebarContent`'s scroll area with a raw `ScrollArea` without `fill` when the body pins footers with `mt-auto`.

## Useful particle references

- basic sidebar: `p-sidebar-1`
- docs sidebar with version switcher + search: `p-sidebar-2`
- workspace switcher in header: `p-sidebar-3`
- user menu in footer (opens upward): `p-sidebar-4`
- labelled group / group action / collapsible group: `p-sidebar-5`, `p-sidebar-6`, `p-sidebar-7`
- links with icons: `p-sidebar-8`
- per-row action menu / count badges: `p-sidebar-9`, `p-sidebar-10`
- nested sub-menus (static / collapsible): `p-sidebar-11`, `p-sidebar-12`
- controlled open state: `p-sidebar-13`
