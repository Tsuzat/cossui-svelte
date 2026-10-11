<script lang="ts">
  import { SidebarInset, SidebarProvider } from '#lib/components/ui/sidebar/index.js';
  import AppSidebar from './components/app-sidebar.svelte';
  import ChartAreaInteractive from './components/chart-area-interactive.svelte';
  import DataTable from './components/data-table.svelte';
  import SectionCards from './components/section-cards.svelte';
  import SiteHeader from './components/site-header.svelte';
  import data from './data.js';
</script>

<div
  class="dark bg-background font-sans text-foreground"
  style="--background: #0e1218; --foreground: #e6edf3; --card: #19212b; --card-foreground: #e6edf3; --popover: #19212b; --muted: #202a36; --muted-foreground: #8b98a8; --border: rgb(255 255 255 / 0.07); --input: rgb(255 255 255 / 0.1); --primary: #4de0b3; --primary-foreground: #04261c; --sidebar: #0e1218; --sidebar-border: rgb(255 255 255 / 0.07);"
>
  <SidebarProvider
    style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
  >
    <AppSidebar variant="inset" />
    <SidebarInset class="bg-transparent md:peer-data-[variant=inset]:shadow-none">
      <SiteHeader />
      <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
          <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div class="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable {data} />
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</div>
