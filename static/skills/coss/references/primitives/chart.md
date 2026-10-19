# coss Chart (cossui-svelte only)

## When to use

- Bar, line, area, pie, radial and radar charts styled with the coss theme tokens (`--chart-1` … `--chart-5`).

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/chart.json
```

```bash
npm install layerchart d3-scale d3-shape
```

`Chart` is a thin container around [LayerChart](https://layerchart.com) — the chart types themselves (`BarChart`, `LineChart`, `AreaChart`, `PieChart`, …) are imported from `layerchart`.

## Canonical imports

```svelte
<script lang="ts">
  import { BarChart } from 'layerchart';
  import { Chart, ChartTooltip, type ChartConfig } from '#lib/components/ui/chart/index.js';
</script>
```

Also exported: `getPayloadConfigFromPayload` (for custom tooltips).

## Minimal pattern

```svelte
<script lang="ts">
  const data = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 }
  ];
  const config = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' }
  } satisfies ChartConfig;
</script>

<Chart {config} class="h-72 w-full">
  <BarChart {data} x="month" series={[{ key: 'desktop', color: config.desktop.color }]}>
    {#snippet tooltip()}
      <ChartTooltip />
    {/snippet}
  </BarChart>
</Chart>
```

`Chart` exposes each `config` entry as a `--color-<key>` CSS variable and provides labels/colors to `ChartTooltip`. A config entry takes `label`, optional `icon`, and either `color` or `theme: { light, dark }`. Give `Chart` an explicit height.

## Patterns from coss particles

- **Tooltip**: pass `<ChartTooltip />` through LayerChart's `tooltip` snippet. Options: `indicator` (`line | dot | dashed`), `hideLabel`, `hideIndicator`, `label`, `labelKey`, `nameKey`, `labelFormatter`, and a `formatter` snippet for full control of rows.
- **Grouped bars**: `xScale={scaleBand().padding(0.25)}`, `x1Scale={scaleBand().paddingInner(0.2)}`, `seriesLayout="group"` (`d3-scale`).
- **Per-part props**: LayerChart's `props={{ bars: {…}, xAxis: { format }, highlight: {…} }}` for rounding, motion and axis formatting.

## Common pitfalls

- Porting shadcn/recharts code (`<ChartContainer>`, `<ResponsiveContainer>`, `<Bar dataKey>`) — use LayerChart components inside `Chart`.
- Hard-coding hex colors instead of `var(--chart-N)` tokens.
- Forgetting a height on `Chart` (the chart collapses).

## Useful particle references

- radial with labels / text / stacked: `p-chart-1`, `p-chart-2`, `p-chart-3`
- radar with custom labels: `p-chart-4`
- area with axes: `p-chart-5`
- line with labels: `p-chart-6`
- pie interactive / custom label: `p-chart-7`, `p-chart-8`
- bar multiple / horizontal mixed: `p-chart-9`, `p-chart-10`
