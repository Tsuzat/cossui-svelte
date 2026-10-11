<script lang="ts">
  import TrendingDownIcon from '@lucide/svelte/icons/trending-down';
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '#lib/components/ui/card/index.js';
</script>

<div
  class="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:rounded-3xl *:data-[slot=card]:bg-card *:data-[slot=card]:shadow-none lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
>
  <Card class="@container/card">
    <CardHeader>
      <CardDescription class="font-mono text-[11px] tracking-[0.16em] uppercase"
        >Total Revenue</CardDescription
      >
      <CardTitle class="text-3xl font-medium tabular-nums @[250px]/card:text-4xl">
        $1,250.00
      </CardTitle>
      <CardAction>
        <Badge variant="outline" class="rounded-full border-primary/30 bg-primary/10 text-primary">
          <TrendingUpIcon />
          +12.5%
        </Badge>
      </CardAction>
    </CardHeader>
    <CardFooter class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium text-primary">
        Trending up this month <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Visitors for the last 6 months</div>
    </CardFooter>
  </Card>
  <Card class="@container/card">
    <CardHeader>
      <CardDescription class="font-mono text-[11px] tracking-[0.16em] uppercase"
        >New Customers</CardDescription
      >
      <CardTitle class="text-3xl font-medium tabular-nums @[250px]/card:text-4xl">1,234</CardTitle>
      <CardAction>
        <Badge variant="outline" class="rounded-full border-primary/30 bg-primary/10 text-primary">
          <TrendingDownIcon />
          -20%
        </Badge>
      </CardAction>
    </CardHeader>
    <CardFooter class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium text-primary">
        Down 20% this period <TrendingDownIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Acquisition needs attention</div>
    </CardFooter>
  </Card>
  <Card class="@container/card">
    <CardHeader>
      <CardDescription class="font-mono text-[11px] tracking-[0.16em] uppercase"
        >Active Accounts</CardDescription
      >
      <CardTitle class="text-3xl font-medium tabular-nums @[250px]/card:text-4xl">45,678</CardTitle>
      <CardAction>
        <Badge variant="outline" class="rounded-full border-primary/30 bg-primary/10 text-primary">
          <TrendingUpIcon />
          +12.5%
        </Badge>
      </CardAction>
    </CardHeader>
    <CardFooter class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium text-primary">
        Strong user retention <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Engagement exceed targets</div>
    </CardFooter>
  </Card>
  <Card class="@container/card">
    <CardHeader>
      <CardDescription class="font-mono text-[11px] tracking-[0.16em] uppercase"
        >Growth Rate</CardDescription
      >
      <CardTitle class="text-3xl font-medium tabular-nums @[250px]/card:text-4xl">4.5%</CardTitle>
      <CardAction>
        <Badge variant="outline" class="rounded-full border-primary/30 bg-primary/10 text-primary">
          <TrendingUpIcon />
          +4.5%
        </Badge>
      </CardAction>
    </CardHeader>
    <CardFooter class="flex-col items-start gap-1.5 text-sm">
      <div class="line-clamp-1 flex gap-2 font-medium text-primary">
        Steady performance increase <TrendingUpIcon class="size-4" />
      </div>
      <div class="text-muted-foreground">Meets growth projections</div>
    </CardFooter>
  </Card>
</div>
