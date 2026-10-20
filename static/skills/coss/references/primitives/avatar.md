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
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage
  } from '#lib/components/ui/avatar/index.js';
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

The fallback shows while the image loads and when it fails. Default size is 32px, `rounded-full`. Every dimension (box, font size, group geometry) comes from the inherited `--avatar-size` custom property; set it on the avatar, a group or any ancestor.

## Patterns from coss particles

### Key patterns

Custom size/radius — size through `--avatar-size` (a `size-*` class resizes only the box, not the type):

```svelte
<Avatar class="rounded-lg [--avatar-size:--spacing(16)]">
  <AvatarImage src="/avatar.png" alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

Stacked avatar group — `AvatarGroup` clips each avatar with its neighbour's circle (transparent gap, no ring). `topmost="last"` keeps the last avatar whole; `AvatarGroupCount` is the "+N" chip; tune with `--avatar-overlap`, `--avatar-gap`, `--avatar-nudge`:

```svelte
<AvatarGroup class="[--avatar-size:--spacing(6)]">
  <Avatar>
    <AvatarImage src="/user-1.png" alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/user-2.png" alt="User 2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+2</AvatarGroupCount>
</AvatarGroup>
```

Interactive avatar — change the element with `as` (`<Avatar as="button" type="button" aria-label="…">`, `<Avatar as="a" href="…">`); for a tooltip, wrap the `Avatar` in a `TooltipTrigger`.

Status dots and notification/verified badges are plain absolutely-positioned elements in a `relative` wrapper around the `Avatar` (see `p-avatar-7` – `p-avatar-12`).

## Common pitfalls

- Omitting `AvatarFallback`, causing broken image states with no identity fallback.
- Using non-descriptive `alt` text on `AvatarImage` in accessible contexts.
- Using `className` (React) instead of `class`.
- Putting status badges inside `Avatar` — it clips with `overflow-hidden`; wrap it instead.
- Hand-rolling stacks with `-space-x-*` + `ring-2 ring-background` — use `AvatarGroup`.
- Sizing individual avatars inside an `AvatarGroup` — set `--avatar-size` on the group, or the cut is misplaced.
- Expecting `keepMounted` on `AvatarImage` — ShardsUI mounts the image only once it has loaded.

## Useful particle references

- image + fallback: `p-avatar-1`
- fallback only: `p-avatar-2`, icon fallback: `p-avatar-6`
- different sizes / radius: `p-avatar-3`, `p-avatar-4`
- group avatars: `p-avatar-5`, `p-avatar-13`, `p-avatar-14`; last on top: `p-avatar-15`, `p-avatar-16`; tooltip per member: `p-avatar-21`
- avatar as button / link: `p-avatar-17`, `p-avatar-18`; with tooltip: `p-avatar-20`; sized from a parent: `p-avatar-19`
- status dots: `p-avatar-7`, `p-avatar-8`, `p-avatar-9`
- notification / verified badges: `p-avatar-10`, `p-avatar-11`, `p-avatar-12`
- avatar menu button with chevron: `p-avatar-95`
