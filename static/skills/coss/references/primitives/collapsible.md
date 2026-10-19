# coss Collapsible

## When to use

- Progressive disclosure of optional content.
- Expandable help/settings sections without leaving the page.

## When NOT to use

- For several related sections -> use Accordion instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/collapsible.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
</script>
```

`CollapsibleContent` is an alias of `CollapsiblePanel`; `CollapsiblePrimitive` is re-exported.

## Minimal pattern

```svelte
<Collapsible>
  <CollapsibleTrigger>Can I access the file in the cloud?</CollapsibleTrigger>
  <CollapsiblePanel>Yes, you can access the file in the cloud.</CollapsiblePanel>
</Collapsible>
```

## Patterns from coss particles

### Key patterns

Rotating chevron via the trigger's `data-panel-open` attribute:

```svelte
<Collapsible>
  <CollapsibleTrigger
    class="inline-flex items-center gap-2 font-medium text-sm data-panel-open:[&_svg]:rotate-180"
  >
    Show recovery keys
    <ChevronDownIcon class="size-4 transition-transform" />
  </CollapsibleTrigger>
  <CollapsiblePanel>…</CollapsiblePanel>
</Collapsible>
```

Controlled — `open` is bindable:

```svelte
<script lang="ts">
  let open = $state(false);
</script>

<Collapsible bind:open>
  <CollapsibleTrigger>{open ? 'Hide details' : 'Show details'}</CollapsibleTrigger>
  <CollapsiblePanel>Hidden content here.</CollapsiblePanel>
</Collapsible>
```

## Common pitfalls

- Placing trigger/panel outside the same collapsible root.
- Assuming panel content is always visible/mounted for dependent logic.
- React habits: `open` + `onOpenChange={setOpen}` with `useState` — use `bind:open`.

## Useful particle references

- core pattern: `p-collapsible-1`
