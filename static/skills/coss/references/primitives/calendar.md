# coss Calendar

## When to use

- Date selection interfaces and calendar-based scheduling UIs.
- Single-date, multiple-date, range, and constrained date picking patterns.

## When NOT to use

- If the date picker should open from an input/button -> use Date Picker (Calendar inside a Popover) instead.
- If the user should type a date -> use an Input (or a Calendar paired with an input, `p-calendar-17`).

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/calendar.json
```

Manual deps from docs:

```bash
npm install @internationalized/date svelte-toolbelt runed
```

Calendar is a custom Svelte component (own calendar state, not ShardsUI). It depends on the `button` and `range-calendar` registry items.

## Canonical imports

```svelte
<script lang="ts">
  import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';
  import { Calendar, type DateRange } from '#lib/components/ui/calendar/index.js';
  // Dedicated range calendar:
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';
</script>
```

Both barrels also export the building-block parts (`Header`, `Heading`, `Nav`, `PrevButton`, `NextButton`, `Months`, `Month`, `Grid`, `GridHead`, `GridBody`, `GridRow`, `HeadCell`, `Cell`, `Day`, `Caption`, `MonthSelect`, `YearSelect`) for custom layouts.

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar mode="single" bind:value />
```

Dates are `@internationalized/date` `DateValue` objects (e.g. `CalendarDate`), **not** JavaScript `Date`s. Use `today(getLocalTimeZone())`, `parseDate('2026-01-31')`, `.add({ days: 7 })`, `.compare(other)`, and `.toDate(tz)` when you need a `Date`.

## Patterns from coss particles

### Key patterns

Multiple dates:

```svelte
<script lang="ts">
  const t = today(getLocalTimeZone());
  let value = $state([t, t.add({ days: 2 })]);
</script>

<Calendar mode="multiple" bind:value />
```

Date range — `RangeCalendar` (or `Calendar mode="range"`), value is `{ start, end }`:

```svelte
<script lang="ts">
  const start = today(getLocalTimeZone());
  let value = $state({ start, end: start.add({ days: 7 }) });
</script>

<RangeCalendar bind:value />
```

Disabled dates — pass a matcher (`excludeDisabled` on `RangeCalendar` prevents ranges spanning disabled days):

```svelte
<script lang="ts">
  const t = today(getLocalTimeZone());
  function isDateDisabled(date: DateValue) {
    const weekday = date.toDate(getLocalTimeZone()).getDay();
    return date.compare(t) <= 0 || weekday === 0 || weekday === 6;
  }
</script>

<Calendar mode="single" {isDateDisabled} />
```

Month/year dropdowns: `captionLayout="dropdown"` (or `dropdown-months` / `dropdown-years`) with `minValue`, `maxValue` and `years`.

Other props: `numberOfMonths`, `placeholder` (bindable — the visible month), `onValueChange`, `isDateUnavailable`, `weekStartsOn`, `locale` (default `en-US`), `showOutsideDays`, `disableDaysOutsideMonth`, `buttonVariant` (nav buttons, default `ghost`), `disabled`, `readonly`, and a `day` snippet (`{ day, outsideMonth }`) for custom cell content.

Cell size is driven by `--cell-size`: `<Calendar class="[--cell-size:--spacing(11)] sm:[--cell-size:--spacing(10)]" />`.

Sync with an input: bind both `value` and `placeholder`, and update them from the input with `parseDate` (see `p-calendar-17`).

## Common pitfalls

- Passing JS `Date` objects or react-day-picker props (`selected`, `onSelect`, `DateRange` with `from`/`to`) — use `DateValue`, `bind:value`, and `{ start, end }`.
- Forgetting `mode` on `Calendar`; the value shape depends on it (`DateValue`, `DateValue[]`, or `DateRange`).
- Missing locale/disabled-date constraints for business rules.
- Treating calendar as date-time picker without explicit time UI.

## Useful particle references

- basic / custom cell size: `p-calendar-1`, `p-calendar-2`
- range: `p-calendar-3`; multiple: `p-calendar-8`; disabled dates: `p-calendar-7`
- dropdown navigation: `p-calendar-4`; Select / Combobox month-year: `p-calendar-5`, `p-calendar-6`, `p-calendar-13`; dropdown only: `p-calendar-14`
- styling: rounded days `p-calendar-9`, rounded range `p-calendar-10`, right-aligned nav `p-calendar-11`, week numbers `p-calendar-12`
- today / current month buttons: `p-calendar-15`, `p-calendar-16`
- with date input / time input / time slots: `p-calendar-17`, `p-calendar-18`, `p-calendar-19`
- presets: `p-calendar-20` (single), `p-calendar-21` (range)
- multiple months: `p-calendar-22`, `p-calendar-23`
- pricing day cells (`day` snippet): `p-calendar-24`
- 24-hour autocomplete time input: `p-calendar-25`
