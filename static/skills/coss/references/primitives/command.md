# coss Command

## When to use

- Command palette and keyboard-navigable action menus.
- Fast action discovery for power-user and app shortcut workflows.

## When NOT to use

- If the list is a simple set of actions without search -> use Menu instead.
- If the user is selecting from a predefined list -> use Select or Combobox instead.
- If the flow is a data form -> use Form instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/command.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Command,
    CommandCollection,
    CommandDialog,
    CommandDialogPopup,
    CommandDialogTrigger,
    CommandEmpty,
    CommandFooter,
    CommandGroup,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandList,
    CommandPanel,
    CommandSeparator,
    CommandShortcut
  } from '#lib/components/ui/command/index.js';
</script>
```

Also exported: `CommandDialogBackdrop`, `CommandDialogViewport`, `CommandDialogPortal`, `CommandDialogPrimitive`, and `CommandCreateHandle()` for detached triggers.

## Minimal pattern

```svelte
<script lang="ts">
  const items = [
    { value: 'linear', label: 'Linear' },
    { value: 'figma', label: 'Figma' },
    { value: 'slack', label: 'Slack' }
  ];
  let open = $state(false);
</script>

<CommandDialog bind:open>
  <CommandDialogTrigger class={buttonVariants({ variant: 'outline' })}>
    Open Command Palette
  </CommandDialogTrigger>
  <CommandDialogPopup>
    <Command {items}>
      <CommandInput placeholder="Search..." />
      <CommandPanel>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          <CommandCollection>
            {#snippet children(item: { value: string; label: string })}
              <CommandItem value={item} onclick={() => (open = false)}>{item.label}</CommandItem>
            {/snippet}
          </CommandCollection>
        </CommandList>
      </CommandPanel>
    </Command>
  </CommandDialogPopup>
</CommandDialog>
```

`Command` wraps ShardsUI `Autocomplete.Root` with palette defaults (`autoHighlight="always"`, `keepHighlight`, always-open inline list). `CommandItem value` is the **item object**; `Command`'s `value` (bindable) is the search text. `CommandInput` includes a search icon and is `lg` by default.

## Patterns from coss particles

- **Portal forwarding**: optional `portalProps` on `CommandDialogPopup` → ShardsUI `Dialog.Portal` (`keepMounted`, `container`, …). See [portal-props.md](../portal-props.md).

### Key patterns

Grouped sections — `items` is `{ value, items }[]`; nest a `CommandCollection` in each `CommandGroup items={group.items}`:

```svelte
<Command items={groupedItems}>
  <CommandInput placeholder="Type a command..." />
  <CommandPanel>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandList>
      <CommandCollection>
        {#snippet children(group: Group)}
          <CommandGroup items={group.items}>
            <CommandGroupLabel>{group.value}</CommandGroupLabel>
            <CommandCollection>
              {#snippet children(item: Item)}
                <CommandItem value={item}>
                  <span class="flex-1">{item.label}</span>
                  {#if item.shortcut}<CommandShortcut>{item.shortcut}</CommandShortcut>{/if}
                </CommandItem>
              {/snippet}
            </CommandCollection>
          </CommandGroup>
          <CommandSeparator />
        {/snippet}
      </CommandCollection>
    </CommandList>
  </CommandPanel>
  <CommandFooter>…keyboard hints with Kbd…</CommandFooter>
</Command>
```

Keyboard shortcut to open (⌘K / Ctrl+K):

```svelte
<script lang="ts">
  let open = $state(false);
  $effect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open = !open;
      }
    }
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });
</script>

<CommandDialog bind:open>…</CommandDialog>
```

Reset search on close: use `open` + `onOpenChange` and clear the bound search text when `open` becomes false (see `p-command-2`).

Standalone (no dialog): render `Command` directly, optionally inside `CommandPanel` for the bordered, elevated surface.

## Common pitfalls

- Expecting cmdk/shadcn APIs (`CommandInput` + `CommandItem onSelect`, `value` strings for filtering) — use `items` + `CommandCollection` + `CommandItem value={item}` and `onclick`.
- React habits: function-as-child in `CommandList`, `render={<Button />}` on the trigger. Use snippets and `class={buttonVariants(...)}`.
- Forgetting to close the dialog when an item runs (`onclick={() => (open = false)}`).
- Binding critical destructive actions without a confirmation pathway.
- Missing keyboard accessibility checks for arrow/enter/escape interactions.

## Useful particle references

- command palette in a dialog: `p-command-1`
- palette with AI assistant mode, shortcuts and footer: `p-command-2`
- related search/selection references: `p-autocomplete-1`, `p-combobox-1`
