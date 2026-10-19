# cossui-svelte vs shadcn-svelte / Bits UI (and React coss) assumptions

Use this guide when adapting snippets written for shadcn-svelte (Bits UI), shadcn/Radix (React), or upstream React coss.

## Core idea

cossui-svelte is close to shadcn-svelte ergonomically, but its primitives come from ShardsUI (a Svelte port of Base UI), so composition, prop names and value shapes follow Base UI — not Bits UI or Radix.

## High-impact differences

- Do not assume any shadcn-svelte or React snippet translates 1:1. Verify parts and props in the component docs / guides first.
- **No `child` snippet / `asChild` / `render` on ShardsUI parts.** Style triggers with `class={buttonVariants(...)}`, change the tag with `as`, and see [composition.md](composition.md). (Sidebar and Tree parts are the exception: they do take a `child` snippet.)
- Prefer coss names (`DialogPopup`, `MenuPopup`, `SelectPopup`, `PreviewCard`, `Toast` managers). shadcn aliases exist for many parts (`DialogContent`, `DropdownMenu*`, `HoverCard*`, `TabsTrigger`, `TabsContent`, `AccordionContent`, `ButtonGroup`) but use the primary names in new code.
- Prefer styled coss exports; use `*Primitive` re-exports only for custom composition.
- Imports go through the `#lib` subpath import: `#lib/components/ui/<name>/index.js` — not `$lib/components/ui/...` and not `@/components/ui/...`.
- State uses runes and bindings: `bind:value`, `bind:checked`, `bind:open`, `bind:pressed`. There is generally no `defaultValue` in the coss wrappers — seed state through the bound value.
- Dates in Calendar are `@internationalized/date` `DateValue`s (Bits UI users will recognize this; React users coming from react-day-picker `Date`s will not).
- Toasts use `toastManager` / `anchoredToastManager`, not `svelte-sonner`'s `toast()` + `<Toaster />`.
- Skeleton wraps real content (`<phantom-ui>`), it is not a gray box.
- OTP Field is a custom component: `maxlength` + `children` snippet `cells`, not Bits UI `PinInput` cells-with-`Cell` nor React `length`.

## Practical migration examples

### Composition: Bits UI `child` snippet → `class` / `as`

```svelte
<!-- shadcn-svelte / Bits UI -->
<Dialog.Trigger>
  {#snippet child({ props })}
    <Button {...props} variant="outline">Open</Button>
  {/snippet}
</Dialog.Trigger>

<!-- cossui-svelte -->
<DialogTrigger class={buttonVariants({ variant: 'outline' })}>Open</DialogTrigger>
```

React `render={<Button variant="outline" />}` maps to the same `class={buttonVariants(...)}` form.

### Menu actions: `onSelect` → `onclick`

```svelte
<!-- Bits UI -->
<DropdownMenu.Item onSelect={handleOpen}>Open</DropdownMenu.Item>

<!-- cossui-svelte -->
<MenuItem onclick={handleOpen}>Open</MenuItem>
```

Links: `<MenuLinkItem href="/docs">Docs</MenuLinkItem>` (SvelteKit routes plain anchors client-side).

### Select: `items` + `SelectValue`

```svelte
<!-- shadcn-svelte -->
<Select.Root type="single" bind:value>
  <Select.Trigger>{label ?? 'Select a framework'}</Select.Trigger>
  <Select.Content>
    <Select.Item value="next" label="Next.js" />
  </Select.Content>
</Select.Root>

<!-- cossui-svelte -->
<script lang="ts">
  const items = [
    { label: 'Next.js', value: 'next' },
    { label: 'Vite', value: 'vite' }
  ];
  let value = $state<string>();
</script>

<Select bind:value {items}>
  <SelectTrigger aria-label="Framework">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectPopup>
    {#each items as item (item.value)}
      <SelectItem value={item.value}>{item.label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
```

No `type="single" | "multiple"` — add `multiple` for multi-select.

### Toggle Group: `type` → `multiple`, array value

```svelte
<!-- Bits UI -->
<ToggleGroup.Root type="single" bind:value={period}>…</ToggleGroup.Root>

<!-- cossui-svelte: value is always string[] -->
<ToggleGroup bind:value={periods}>
  <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
  <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
</ToggleGroup>
```

### Slider: scalar single value

React shadcn's `defaultValue={[50]}` (array for one thumb) becomes a plain number.

```svelte
<!-- Bits UI -->
<Slider type="single" bind:value={volume} max={100} />

<!-- cossui-svelte: number for one thumb, number[] for a range -->
<Slider bind:value={volume} max={100} getAriaLabel={() => 'Volume'} />
```

### Accordion: `type` → `multiple`

```svelte
<!-- Bits UI -->
<Accordion.Root type="single" value="item-1">…</Accordion.Root>

<!-- cossui-svelte: string value by default, string[] with `multiple` -->
<Accordion value="item-1">
  <AccordionItem value="item-1">…</AccordionItem>
</Accordion>
```

### Checkbox / Radio / Switch

React's `defaultChecked` + `onCheckedChange={setChecked}` and `htmlFor` become bindings and `for`:

```svelte
<Checkbox bind:checked {id} />
<Label for={id}>Accept</Label>
<RadioGroup bind:value><Label><Radio value="a" /> A</Label></RadioGroup>
```

### OTP: Bits UI `PinInput` / `input-otp` → `OTPField`

```svelte
<!-- cossui-svelte -->
<OTPField aria-label="Verification code" maxlength={6} bind:value onComplete={verify}>
  {#snippet children({ cells })}
    {#each cells as cell, i (i)}
      <OTPFieldInput aria-label={`Character ${i + 1} of 6`} {cell} />
    {/each}
  {/snippet}
</OTPField>
```

### Toast: `svelte-sonner` → `toastManager`

```ts
// svelte-sonner
// toast.success('Saved', { description: 'Draft updated' });

// cossui-svelte (providers in +layout.svelte)
toastManager.add({ type: 'success', title: 'Saved', description: 'Draft updated' });
```

### Sheet → Drawer

Sheet still ships for existing code, but new edge panels use `Drawer` with `position` on the root ([sheet.md](../primitives/sheet.md)).

## Migration checklist

1. Confirm the exact coss imports (`#lib/components/ui/<name>/index.js`).
2. Confirm child structure requirements (trigger/header/panel/footer, list/collection, track/indicator).
3. Confirm prop names, value shapes and bindings from the component guide or docs page.
4. Replace every `child`/`asChild`/`render` composition on ShardsUI parts.
5. Validate against at least one particle example.

## Per-component migration notes

For the full component registry, see `../component-registry.md`.

## Anti-patterns

- Copy/pasting shadcn-svelte or React examples and only changing the import path.
- Using undocumented props because they exist in Bits UI, Radix, or React coss (`type="single"`, `defaultValue`, `onSelect`, `alignItemWithTrigger`, `render`).
- Omitting required subcomponents in overlays/forms because the source snippet did.
