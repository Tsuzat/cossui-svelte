# coss Accordion

## When to use

- Expandable multi-section content regions.
- FAQs and settings pages with progressive disclosure.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/accordion.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger
  } from '#lib/components/ui/accordion/index.js';
</script>
```

`AccordionContent` is an alias of `AccordionPanel`. `AccordionPrimitive` and `AccordionHeader` are re-exported for custom composition.

## Minimal pattern

```svelte
<Accordion value="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is ShardsUI?</AccordionTrigger>
    <AccordionPanel>A Svelte port of Base UI's unstyled, accessible primitives.</AccordionPanel>
  </AccordionItem>
</Accordion>
```

## Patterns from coss particles

### Key patterns

Single mode (default): `value` is a `string`. Multiple mode: add `multiple`, and `value` is a `string[]`.

```svelte
<Accordion multiple value={['item-1', 'item-2']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionPanel>Content 1</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionPanel>Content 2</AccordionPanel>
  </AccordionItem>
</Accordion>
```

Controlled mode — `value` is bindable:

```svelte
<script lang="ts">
  let value = $state<string[]>(['item-1']);
</script>

<Accordion multiple bind:value>
  ...
</Accordion>
<button type="button" onclick={() => (value = ['item-1', 'item-2'])}>Open first two</button>
```

Each `AccordionItem` needs a stable `value`; trigger and panel must be children of the same item. Disable everything with `disabled` on `Accordion`.

## Common pitfalls

- Placing `AccordionTrigger`/`AccordionPanel` outside `AccordionItem`.
- Omitting `value` on `AccordionItem`, which breaks item identity and controlled behavior.
- Applying Radix/Bits UI mental models like `type="single" | "multiple"` instead of the `multiple` boolean.
- Passing an array to a single-mode accordion or a string to a `multiple` one when binding — keep the bound type consistent with `multiple`.
- Looking for a `defaultValue` prop: there is none; seed the initial state through `value`.

## Useful particle references

- basic accordion: `p-accordion-1`
- one panel open: `p-accordion-2`
- multiple panels open: `p-accordion-3`
- controlled with `bind:value` + external actions: `p-accordion-4`
