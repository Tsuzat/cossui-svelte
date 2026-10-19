# coss Switch

## When to use

- Binary preference toggles in settings flows.
- Immediate on/off state controls with explicit labels.

## When NOT to use

- If the control is a pressable command (not a preference) -> use Toggle instead.
- If you need grouped toggle selection -> use ToggleGroup instead.
- If it's a form agreement (terms/conditions) -> use Checkbox instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/switch.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Label } from '#lib/components/ui/label/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  let checked = $state(false);
</script>

<Label>
  <Switch bind:checked />
  Enable notifications
</Label>
```

`checked` is bindable; `disabled`, `name`, `onCheckedChange` are forwarded.

## Patterns from coss particles

### Key patterns

Switch with description (associate with `id` + `for`):

```svelte
<script lang="ts">
  const id = $props.id();
</script>

<div class="flex items-center justify-between gap-4">
  <div class="flex flex-col gap-1">
    <Label for={id}>Marketing emails</Label>
    <p class="text-muted-foreground text-xs">Receive updates about new products and features.</p>
  </div>
  <Switch {id} />
</div>
```

Custom size via the `--thumb-size` CSS variable (default `[--thumb-size:--spacing(5)] sm:[--thumb-size:--spacing(4)]`):

```svelte
<Switch class="[--thumb-size:--spacing(6)]" />
```

In forms, wrap with `Field name="…"` and put the switch inside `FieldLabel`.

## Common pitfalls

- React habits: `defaultChecked`, `htmlFor`, `useId()`. Use `checked`/`bind:checked`, `for`, `$props.id()`.
- Using switch for multi-option selection that should use radio/toggle-group.
- Omitting a visible label or explicit `aria-label`.
- Sizing with `h-*`/`w-*` classes instead of `--thumb-size`.

## Useful particle references

- basic / disabled / with description: `p-switch-1`, `p-switch-2`, `p-switch-3`
- card style: `p-switch-4`
- form integration: `p-switch-5`
- custom size: `p-switch-6`
- weekly availability editors: `p-switch-7`, `p-switch-8`, `p-switch-9`
