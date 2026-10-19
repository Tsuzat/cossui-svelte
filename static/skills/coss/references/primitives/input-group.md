# coss Input Group

## When to use

- Inputs/textareas that need inline or block addons.
- Input composition with icons, buttons, labels, badges, menus, and shortcuts.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/input-group.json
```

Manual deps: `@shardsui/svelte` (through `input`/`textarea`).

## Canonical imports

```svelte
<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea
  } from '#lib/components/ui/input-group/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  import MailIcon from '@lucide/svelte/icons/mail';
</script>

<InputGroup>
  <InputGroupInput type="email" placeholder="Email" />
  <InputGroupAddon>
    <MailIcon />
  </InputGroupAddon>
</InputGroup>
```

## DOM order convention

Keep `InputGroupInput` / `InputGroupTextarea` before `InputGroupAddon` in the DOM. The addon's mousedown handler focuses the group's input with `querySelector('input, textarea')` on the whole group, so order doesn't break focus, but input-first keeps tab order natural. Visual placement comes from `align`: `inline-start` (default), `inline-end`, `block-start`, `block-end` (block positions are for textareas).

## Patterns from coss particles

### Key patterns

Text prefix:

```svelte
<InputGroup>
  <InputGroupInput placeholder="example.com" />
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

Interactive addon — `InputGroupButton` (a `Button`, `type="button"` by default, supports `loading`), or a trigger part styled with `buttonVariants`:

```svelte
<InputGroup>
  <InputGroupInput aria-label="Url" bind:value type="text" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton aria-label="Clear" size="icon-xs" variant="ghost" onclick={() => (value = '')}>
      <XIcon aria-hidden="true" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

Icon button with tooltip (wrap the tree in `TooltipProvider`):

```svelte
<InputGroupAddon align="inline-end">
  <Tooltip>
    <TooltipTrigger aria-label="Copy" class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })} onclick={copy}>
      <CopyIcon />
    </TooltipTrigger>
    <TooltipPopup>Copy to clipboard</TooltipPopup>
  </Tooltip>
</InputGroupAddon>
```

Textarea composer with a block-end toolbar:

```svelte
<InputGroup>
  <InputGroupTextarea placeholder="Ask, Search or Chat…" />
  <InputGroupAddon align="block-end">
    <Menu>
      <MenuTrigger aria-label="Add files" class={buttonVariants({ size: 'icon-sm', variant: 'ghost' })}>
        <PlusIcon />
      </MenuTrigger>
      <MenuPopup align="start">…</MenuPopup>
    </Menu>
    <InputGroupText class="ml-auto">78% used</InputGroupText>
    <InputGroupButton aria-label="Send" size="icon-sm"><ArrowUpIcon /></InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

Sizes come from the control: `<InputGroupInput size="sm" />` / `size="lg"`.

## Common pitfalls

- Using `Input`/`Textarea` directly instead of `InputGroupInput`/`InputGroupTextarea`.
- Nesting a `<Button>` inside a trigger part in an addon — style the trigger with `buttonVariants`.
- Using `block-*` alignment with a single-line input.
- Missing explicit input types and labels on icon-only buttons.

## Useful particle references

- icon addon / search: `p-input-group-1`, `p-input-group-2`, `p-input-group-20`
- text prefix/suffix: `p-input-group-3`, `p-input-group-4`, `p-input-group-5`
- number field: `p-input-group-6`
- tooltip / icon button / button / badge / shortcut / inner label: `p-input-group-7` – `p-input-group-12`, `p-input-group-21`
- sizes: `p-input-group-13`, `p-input-group-14`
- disabled / loading: `p-input-group-15`, `p-input-group-16`
- textarea + block addons: `p-input-group-17`, mini editor `p-input-group-19`, code snippet `p-input-group-27`, composer `p-input-group-28`, chat input `p-input-group-29`
- badge + menu: `p-input-group-18`
- clear button / search with loader + voice: `p-input-group-22`, `p-input-group-23`
- character counter / password strength: `p-input-group-24`, `p-input-group-26`
