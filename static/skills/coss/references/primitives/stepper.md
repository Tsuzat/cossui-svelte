# coss Stepper (cossui-svelte only)

## When to use

- Multi-step flows (onboarding, checkout, wizards) showing progress and letting users jump between steps.

## When NOT to use

- For a read-only history of events -> use Timeline.
- For a simple percentage -> use Progress.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/stepper.json
```

```bash
npm install @lucide/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger
  } from '#lib/components/ui/stepper/index.js';
</script>
```

Short names (`Root`, `Item`, `Trigger`, `Indicator`, `Title`, `Description`, `Separator`) are also exported.

## Minimal pattern

```svelte
<script lang="ts">
  const steps = [
    { step: 1, title: 'Account', description: 'Create your account' },
    { step: 2, title: 'Profile', description: 'Tell us about you' },
    { step: 3, title: 'Done', description: 'Start using the app' }
  ];
  let current = $state(1);
</script>

<Stepper bind:step={current}>
  {#each steps as s (s.step)}
    <StepperItem step={s.step} class="not-last:flex-1">
      <StepperTrigger>
        <StepperIndicator />
        <StepperTitle>{s.title}</StepperTitle>
        <StepperDescription>{s.description}</StepperDescription>
      </StepperTrigger>
      {#if s.step < steps.length}
        <StepperSeparator />
      {/if}
    </StepperItem>
  {/each}
</Stepper>
```

- `Stepper`: `step` (bindable, default `1`), `orientation` (`horizontal | vertical`).
- `StepperItem`: `step` (auto-numbered by order if omitted), `completed`, `disabled`, `loading`. Steps before the active one are completed.
- `StepperTrigger` activates its item; `StepperIndicator` shows the number, a check, or a spinner by state.

## Patterns from coss particles

- **Controlled with Prev/Next buttons**: bind `step` and change it from `Button`s (disable at the ends).
- **Async step**: set `loading` on the item while the step's work runs.
- **Vertical**: `orientation="vertical"`; titles/descriptions inline beside the indicator.
- **Progress-bar style / paginated / labels only**: see the particles below.

## Common pitfalls

- Rendering a `StepperSeparator` after the last item.
- Forgetting `not-last:flex-1` (or similar) on items in horizontal layouts, so separators have no room.
- Allowing jumps to steps whose prerequisites aren't done — use `disabled`.

## Useful particle references

- basic / numbers only / numbers + checkmarks / tiny buttons: `p-stepper-1`, `p-stepper-2`, `p-stepper-3`, `p-stepper-4`
- controlled / with loading: `p-stepper-5`, `p-stepper-6`
- mixed elements / labels / paginated / progress: `p-stepper-7`, `p-stepper-8`, `p-stepper-9`, `p-stepper-10`
- titles + descriptions / inline titles: `p-stepper-11`, `p-stepper-12`
- vertical (numbers + checks / controlled / inline titles / with descriptions): `p-stepper-15`, `p-stepper-16`, `p-stepper-17`, `p-stepper-18`
