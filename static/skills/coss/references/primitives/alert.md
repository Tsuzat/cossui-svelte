# coss Alert

## When to use

- Inline status messaging in content flows.
- Semantic feedback variants (`info`, `success`, `warning`, `error`) with optional icons and actions.

## When NOT to use

- If the message is transient and should auto-dismiss -> use Toast instead.
- If the message requires user action before proceeding -> use AlertDialog instead.
- If it's a brief hover hint -> use Tooltip instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/alert.json
```

Manual deps from docs: none (custom component, not a ShardsUI wrapper). Icons in the examples come from `@lucide/svelte`.

## Canonical imports

```svelte
<script lang="ts">
  import { Alert, AlertAction, AlertDescription, AlertTitle } from '#lib/components/ui/alert/index.js';
</script>
```

## Minimal pattern

```svelte
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>
```

## Patterns from coss particles

### Key patterns

Variants: `default`, `info`, `success`, `warning`, `error`. Place the icon as the first child of `Alert`.

When an icon uniquely conveys alert status, name it with `role="img"` and `aria-label`. Keep it decorative with `aria-hidden="true"` when visible text already conveys the same meaning:

```svelte
<script lang="ts">
  import InfoIcon from '@lucide/svelte/icons/info';
  import { Alert, AlertDescription, AlertTitle } from '#lib/components/ui/alert/index.js';
</script>

<Alert variant="info">
  <InfoIcon aria-label="Information" role="img" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components using the CLI.</AlertDescription>
</Alert>
```

Alert with action buttons (use `AlertAction`, which moves to the right on larger screens):

```svelte
<Alert>
  <InfoIcon aria-hidden="true" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Describe what can be done about it here.</AlertDescription>
  <AlertAction>
    <Button size="xs" variant="ghost">Dismiss</Button>
    <Button size="xs">Ok</Button>
  </AlertAction>
</Alert>
```

## Common pitfalls

- Using alert variants for passive decoration instead of meaningful semantic status.
- Using `variant="destructive"` (shadcn) — the error variant is `error`.
- Missing title/description structure in complex alerts, reducing scannability.
- Leaving a uniquely meaningful icon unnamed, or repeating status already provided by visible text.

## Useful particle references

- basic: `p-alert-1`
- with icon: `p-alert-2`
- with icon and action buttons: `p-alert-3`
- info alert: `p-alert-4`
- success alert: `p-alert-5`
- warning alert: `p-alert-6`
- error alert: `p-alert-7`
