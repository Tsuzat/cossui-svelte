# coss Avatar

## When to use

- Identity visuals for users/teams in compact spaces.
- Image + fallback initials patterns in cards, lists, and menus.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/avatar.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
</script>
```

`AvatarPrimitive` (ShardsUI `Avatar`) is re-exported for custom composition.

## Minimal pattern

```svelte
<Avatar>
  <AvatarImage src="/avatars/01.png" alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

The fallback shows while the image loads and when it fails. Default size is `size-8`, `rounded-full`.

## Patterns from coss particles

### Key patterns

Custom size/radius via Tailwind class:

```svelte
<Avatar class="size-16 rounded-lg">
  <AvatarImage src="/avatar.png" alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

Stacked avatar group:

```svelte
<div class="flex -space-x-[0.6rem]">
  <Avatar class="ring-2 ring-background">
    <AvatarImage src="/user-1.png" alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar class="ring-2 ring-background">
    <AvatarImage src="/user-2.png" alt="User 2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
</div>
```

Status dots and notification/verified badges are plain absolutely-positioned elements in a `relative` wrapper around the `Avatar` (see `p-avatar-7` – `p-avatar-12`).

## Common pitfalls

- Omitting `AvatarFallback`, causing broken image states with no identity fallback.
- Using non-descriptive `alt` text on `AvatarImage` in accessible contexts.
- Using `className` (React) instead of `class`.
- Putting status badges inside `Avatar` — it clips with `overflow-hidden`; wrap it instead.

## Useful particle references

- image + fallback: `p-avatar-1`
- fallback only: `p-avatar-2`, icon fallback: `p-avatar-6`
- different sizes / radius: `p-avatar-3`, `p-avatar-4`
- group avatars: `p-avatar-5`, `p-avatar-13`, `p-avatar-14`
- status dots: `p-avatar-7`, `p-avatar-8`, `p-avatar-9`
- notification / verified badges: `p-avatar-10`, `p-avatar-11`, `p-avatar-12`
- avatar menu button with chevron: `p-avatar-95`
