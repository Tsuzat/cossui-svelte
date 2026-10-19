# coss Timeline (cossui-svelte only)

## When to use

- Chronological lists of events (project milestones, activity feeds, order tracking) with completed/upcoming state.

## When NOT to use

- For interactive multi-step navigation -> use Stepper.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/timeline.json
```

No extra dependencies (custom components).

## Canonical imports

```svelte
<script lang="ts">
  import {
    Timeline,
    TimelineContent,
    TimelineDate,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle
  } from '#lib/components/ui/timeline/index.js';
</script>
```

## Minimal pattern

```svelte
<Timeline defaultValue={2}>
  {#each items as item (item.id)}
    <TimelineItem step={item.id}>
      <TimelineHeader>
        <TimelineSeparator />
        <TimelineDate>{item.date}</TimelineDate>
        <TimelineTitle>{item.title}</TimelineTitle>
        <TimelineIndicator />
      </TimelineHeader>
      <TimelineContent>{item.description}</TimelineContent>
    </TimelineItem>
  {/each}
</Timeline>
```

- `Timeline`: `defaultValue` (active step, default `1`), `value` + `onValueChange` for controlled use, `orientation` (`vertical` default | `horizontal`).
- `TimelineItem`: `step`; items with `step <= active` are completed.
- `TimelineDate` renders a `<time>` and also accepts a `child` snippet (`{ props }`) to render your own element.

## Patterns from coss particles

- **Dates in a left column** (vertical): offset items with `group-data-[orientation=vertical]/timeline:sm:ms-32` and absolutely position `TimelineDate` to the left (`p-timeline-2`).
- **Icons / images in the indicator**: put an icon or `Avatar` inside `TimelineIndicator` (`p-timeline-6`, `p-timeline-7`).
- **Horizontal**: `orientation="horizontal"`, dates above or below (`p-timeline-11`, `p-timeline-12`).

## Common pitfalls

- Forgetting `step` on items (completion state can't be computed).
- Using `value` without `onValueChange` when the active step must change.

## Useful particle references

- basic vertical: `p-timeline-1`, `p-timeline-4`
- complex / with embedded dates: `p-timeline-2`, `p-timeline-3`
- progress indicator: `p-timeline-5`
- icons / images: `p-timeline-6`, `p-timeline-7`
- titles + dates / from an array: `p-timeline-8`, `p-timeline-9`
- activity tracker: `p-timeline-10`
- horizontal with dates below / above: `p-timeline-11`, `p-timeline-12`
