# coss Group

## When to use

- Connected controls with shared visual boundary.
- Composed action clusters using buttons, inputs, selects, and menu triggers.

## When NOT to use

- If the controls toggle state -> use ToggleGroup instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/group.json
```

Manual deps from docs: none beyond `tailwind-variants`.

## Canonical imports

```svelte
<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Group, GroupSeparator, GroupText } from '#lib/components/ui/group/index.js';
</script>
```

Also exported as `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`, plus `groupVariants`.

## Minimal pattern

```svelte
<Group aria-label="Clipboard">
  <Button variant="outline">Copy</Button>
  <GroupSeparator />
  <Button variant="outline">Paste</Button>
</Group>
```

`Group` renders `role="group"`; label it with `aria-label`/`aria-labelledby`.

## Patterns from coss particles

### Key patterns

`GroupSeparator` is required between **all** adjacent controls (unlike shadcn's ButtonGroup), including outline buttons.

Input + button / prefix text:

```svelte
<Group>
  <GroupText>https://</GroupText>
  <GroupSeparator />
  <Input placeholder="example.com" />
  <GroupSeparator />
  <Button>Go</Button>
</Group>
```

Split button with a menu — style the `MenuTrigger` with `buttonVariants`:

```svelte
<Group aria-label="Subscription actions">
  <Button>Subscribe</Button>
  <GroupSeparator class="bg-primary/72" />
  <Menu>
    <MenuTrigger aria-label="More options" class={buttonVariants({ size: 'icon' })}>
      <ChevronDownIcon aria-hidden="true" />
    </MenuTrigger>
    <MenuPopup align="end">…</MenuPopup>
  </Menu>
</Group>
```

- **Size**: `Group` has no `size` prop — set the same `size` on every child control (`size="sm"` buttons with `icon-sm` triggers, etc.).
- **Orientation**: `orientation="vertical"` on `Group`, and `orientation="horizontal"` on each `GroupSeparator` inside it.
- **Nesting**: nested `Group`s inside a `Group` get spacing between them.
- **Label as text**: `<GroupText><Label for="domain">https://</Label></GroupText>`.

## Common pitfalls

- Forgetting `GroupSeparator` between adjacent controls, or leaving it vertical inside a vertical group.
- Looking for a `size` prop on `Group`.
- Mixing control sizes/variants that break the shared group silhouette.
- Nesting a `<Button>` inside a `MenuTrigger`/`PopoverTrigger` instead of styling the trigger with `buttonVariants`.

## Useful particle references

- basic / with input: `p-group-1`, `p-group-2`
- small / large: `p-group-3`, `p-group-4`
- disabled / default buttons: `p-group-5`, `p-group-6`
- start / end text: `p-group-7`, `p-group-8`
- vertical / nested: `p-group-9`, `p-group-10`
- with popup / input group / menu / select: `p-group-11`, `p-group-12`, `p-group-13`, `p-group-14`
- search / add button + input / currency text: `p-group-15`, `p-group-16`, `p-group-17`
- select + input combos: `p-group-18`, `p-group-19`; input + text button: `p-group-20`
- number range: `p-group-22`
- filter label + combobox multi-select + remove: `p-group-23`
