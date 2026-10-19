# coss Date Picker (composite)

## When to use

- A button/input that opens a calendar to pick a date, range, or several dates.

Date Picker is a **composition**, not a component: `Calendar` (or `RangeCalendar`) inside a `Popover`. The `date-picker` registry item has no code of its own; its particles show the patterns.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/popover.json
npx shadcn-svelte@latest add https://cossui-svelte.com/r/calendar.json
```

```bash
npm install @internationalized/date @lucide/svelte
```

Or install a particle directly, e.g. `https://cossui-svelte.com/r/p-date-picker-1.json`.

## Canonical imports

```svelte
<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Calendar } from '#lib/components/ui/calendar/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { cn } from '#lib/utils.js';
</script>
```

## Minimal pattern

```svelte
<script lang="ts">
  const df = new DateFormatter('en-US', { dateStyle: 'long' });
  let value = $state<DateValue | undefined>();
</script>

<Popover>
  <PopoverTrigger class={cn(buttonVariants({ variant: 'outline' }), 'w-70 justify-start')}>
    <CalendarIcon aria-hidden="true" />
    {value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
  </PopoverTrigger>
  <PopoverPopup>
    <Calendar bind:value mode="single" />
  </PopoverPopup>
</Popover>
```

## Patterns from coss particles

- **Close on select**: `bind:open` on `Popover` and set `open = false` in `Calendar`'s `onValueChange`.
- **Range**: `RangeCalendar bind:value` (`{ start, end }`), optionally `numberOfMonths={2}`; format both ends in the trigger.
- **Multiple dates**: `Calendar mode="multiple"`.
- **Date of birth**: `captionLayout="dropdown"` with `minValue`/`maxValue`/`years` on the calendar, inside a `Field`.
- **Presets**: buttons beside the calendar that set `value` (`today(...)`, `.subtract({ days: 7 })`).
- **Typed input + calendar**: an `InputGroup` whose addon is the popover trigger; parse with `parseDate`.
- **Select-like trigger**: `class={selectTriggerVariants()}` on `PopoverTrigger`.

See [calendar.md](calendar.md) for all calendar props.

## Common pitfalls

- Using JS `Date` instead of `DateValue`.
- Nesting a `<Button>` inside `PopoverTrigger` — style the trigger with `buttonVariants`.
- Leaving the popover open after selection when the flow expects it to close.

## Useful particle references

- basic: `p-date-picker-1`
- range / two-month range: `p-date-picker-2`, `p-date-picker-9`
- field + dropdown navigation: `p-date-picker-3`
- presets: `p-date-picker-4`
- with input: `p-date-picker-5`
- close on select: `p-date-picker-6`
- multiple dates: `p-date-picker-7`
- select-like trigger: `p-date-picker-8`
