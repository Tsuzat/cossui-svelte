<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { componentNavTree, type NavTree, PAGES_NEW } from '#lib/docs.js';
  import MainNav from './main-nav.svelte';
  import MobileNav from './mobile-nav.svelte';
  import SiteHeaderBase from './site-header.svelte';

  interface ProductItem {
    href: string;
    label: string;
    upcoming?: boolean;
  }

  interface Props {
    currentProduct?: string;
    navItems?: { href: string; label: string }[];
    products?: ProductItem[];
    tree?: NavTree;
  }

  let {
    navItems = [],
    currentProduct = 'ui',
    products = [],
    tree = componentNavTree
  }: Props = $props();

  const links = [
    { href: '/', label: 'Components' },
    { href: '/particles', label: 'Particles' },
    { href: '/blocs', label: 'Blocs' },
    { href: '/ai', label: 'Registry & AI' },
    { href: '/docs', label: 'Docs' }
  ] as const;

  const isActive = (href: string) =>
    href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<SiteHeaderBase {currentProduct} {products}>
  {#snippet mobileNav()}
    <MobileNav class="flex lg:hidden" items={navItems} pagesNew={PAGES_NEW} {tree} />
  {/snippet}

  <div class="flex gap-2">
    {#each links as link (link.href)}
      <Button
        variant={isActive(link.href) ? 'secondary' : 'ghost'}
        href={resolve(link.href)}
        data-pressed={isActive(link.href) || undefined}
      >
        {link.label}
      </Button>
    {/each}
  </div>

  <MainNav class="hidden lg:flex" items={navItems} />

  <!-- 
  SEARCH DOCS
  <div class="mx-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
    <CommandMenu {navItems} {tree} />
  </div> -->

  <Separator class="h-5 max-md:hidden" orientation="vertical" />
</SiteHeaderBase>
