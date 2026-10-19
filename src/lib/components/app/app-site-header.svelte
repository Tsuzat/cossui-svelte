<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { docsNavTree, type NavTree, PAGES_NEW } from '#lib/docs.js';
  import CommandMenu from './command-menu.svelte';
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

  let { navItems = [], currentProduct = 'ui', products = [], tree = docsNavTree }: Props = $props();

  const links = [
    { path: '/', href: resolve('/'), label: 'Components' },
    { path: '/particles', href: resolve('/particles'), label: 'Particles' },
    { path: '/blocs', href: resolve('/blocs'), label: 'Blocs' },
    { path: '/docs', href: resolve('/docs/[...slug]', { slug: '' }), label: 'Docs' }
  ] as const;

  const isActive = (href: string) =>
    href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<SiteHeaderBase {currentProduct} {products}>
  {#snippet mobileNav()}
    <MobileNav class="flex lg:hidden" items={navItems} pagesNew={PAGES_NEW} {tree} />
  {/snippet}

  <div class="hidden gap-2 lg:flex">
    {#each links as link (link.path)}
      <Button
        variant={isActive(link.path) ? 'secondary' : 'ghost'}
        href={link.href}
        data-pressed={isActive(link.path) || undefined}
      >
        {link.label}
      </Button>
    {/each}
  </div>

  <MainNav class="hidden lg:flex" items={navItems} />

  <div class="mx-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
    <CommandMenu {navItems} {tree} />
  </div>

  <Separator class="h-5 max-md:hidden" orientation="vertical" />
</SiteHeaderBase>
