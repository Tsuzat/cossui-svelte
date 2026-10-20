<script lang="ts">
  import { resolve } from '$app/paths';
  import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
  import MessagesSquareIcon from '@lucide/svelte/icons/messages-square';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { DrawerTrigger } from '#lib/components/ui/drawer/index.js';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '#lib/components/ui/tabs/index.js';
  import ChatFeatures from '#lib/components/app/chat-landing/chat-features.svelte';
  import ChatLayouts from '#lib/components/app/chat-landing/chat-layouts.svelte';
  import ChatPreview from '#lib/components/app/chat-landing/chat-preview.svelte';
  import ChatStatesSection from '#lib/components/app/chat-landing/chat-states-section.svelte';
  import InstallCommand from '#lib/components/app/chat-landing/install-command.svelte';
  import { CHAT_SCENARIOS } from '#lib/components/blocs/chat-01/components/chat-demo-state.js';
  import ChatDemo from '#lib/components/blocs/chat-01/components/chat-demo.svelte';

  const INSTALL_COMMAND = 'npx shadcn-svelte@latest add https://cossui-svelte.com/r/chat.json';
  const docsHref = resolve('/docs/[...slug]', { slug: 'chat' });
  const blocHref = resolve('/blocs/view/[name]', { name: 'chat-01' });

  const COMPONENT_MAP = [
    { area: 'Conversation', components: ['ChatConversation', 'ChatScroll'] },
    { area: 'Messages', components: ['ChatMessage', 'ChatMessageText', 'ChatCollapsibleMessage'] },
    { area: 'Composer', components: ['Composer', 'ComposerInput', 'ComposerPopup'] },
    {
      area: 'Actions',
      components: ['ChatMessageActionToolbar', 'ChatReactionPicker', 'ChatReactionChip']
    },
    { area: 'Replies', components: ['ChatReplyReference', 'ChatReplyPreview'] },
    { area: 'Timeline', components: ['ChatDatePill', 'ChatUnreadDivider', 'ChatTypingIndicator'] },
    { area: 'Delivery', components: ['ChatDeliveryIndicator', 'ChatMessageInfo'] },
    { area: 'States', components: ['ChatEmptyState', 'ChatLoadingState', 'ChatStatusBar'] }
  ];
</script>

{#snippet sectionHeading(id: string, title: string, description: string)}
  <div class="mb-10 max-w-xl">
    <h2 {id} class="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
      {title}
    </h2>
    <p class="mt-3 text-muted-foreground">{description}</p>
  </div>
{/snippet}

<main>
  <ChatDemo>
    {#snippet triggers(select)}
      <section
        class="container grid items-center gap-12 py-14 md:grid-cols-2 md:gap-14 md:py-20 lg:gap-24"
      >
        <div class="flex min-w-0 flex-col items-start">
          <Badge
            variant="outline"
            class="mb-6 h-7 gap-1.5 rounded-full px-2.5 text-xs shadow-xs/5 sm:h-7"
          >
            <MessagesSquareIcon aria-hidden="true" class="size-3.5" />
            Chat UI
          </Badge>
          <h1
            class="font-heading text-5xl leading-none font-bold tracking-tight lg:text-6xl xl:text-7xl"
          >
            Make room
            <br />
            for conversation.
          </h1>
          <p class="mt-6 max-w-md text-lg text-pretty text-muted-foreground">
            Chat components for Svelte with replies, reactions, mentions, and delivery states built
            in. Copy the source and make it yours.
          </p>
          <div class="mt-8 flex flex-wrap gap-2.5">
            <DrawerTrigger
              class={buttonVariants({ size: 'lg' })}
              onclick={() => select('conversation')}
            >
              Open the full demo
              <ArrowUpRightIcon aria-hidden="true" />
            </DrawerTrigger>
            <a class={buttonVariants({ size: 'lg', variant: 'outline' })} href={docsHref}>
              Read the docs
            </a>
          </div>
          <div class="mt-5 max-w-full">
            <InstallCommand command={INSTALL_COMMAND} />
          </div>
          <p class="mt-8 text-xs text-muted-foreground">Built with ShardsUI and Tailwind CSS</p>
        </div>
        <div class="mx-auto w-full max-w-md">
          <Tabs value="direct" class="gap-5">
            <TabsList aria-label="Conversation type" class="self-center">
              <TabsTab value="direct">Direct message</TabsTab>
              <TabsTab value="group">Group chat</TabsTab>
            </TabsList>
            <TabsPanel value="direct">
              <ChatPreview direct />
            </TabsPanel>
            <TabsPanel value="group">
              <ChatPreview />
            </TabsPanel>
          </Tabs>
        </div>
      </section>

      <section aria-labelledby="chat-features" class="border-t bg-muted/24">
        <div class="container py-14 md:py-20">
          {@render sectionHeading(
            'chat-features',
            'Every part of a conversation',
            'Each tile below is the real component. Click, hover, and type to try it.'
          )}
          <ChatFeatures />
        </div>
      </section>

      <section aria-labelledby="chat-states" class="border-t">
        <div class="container py-14 md:py-20">
          {@render sectionHeading(
            'chat-states',
            'Ready for when things go wrong',
            'Loading, empty, offline, errors, and lost access. Recovery actions respect whether the member can still access the chat.'
          )}
          <ChatStatesSection />
          <div class="mt-8 flex flex-wrap justify-center gap-2" aria-label="Explore drawer states">
            {#each CHAT_SCENARIOS.filter(({ value }) => value !== 'conversation') as { value, label } (value)}
              <DrawerTrigger
                class={buttonVariants({ variant: 'outline', size: 'xs' })}
                onclick={() => select(value)}
              >
                {label}
              </DrawerTrigger>
            {/each}
          </div>
        </div>
      </section>

      <section aria-labelledby="chat-layouts" class="border-t bg-muted/24">
        <div class="container py-14 md:py-20">
          {@render sectionHeading(
            'chat-layouts',
            'Fits wherever you need it',
            'The same components work in a drawer, a side panel, or a full page.'
          )}
          <ChatLayouts onOpenDrawer={() => select('conversation')} />
        </div>
      </section>

      <section aria-labelledby="chat-build" class="border-t">
        <div class="container grid gap-12 py-14 md:grid-cols-[2fr_3fr] md:py-20">
          <div class="flex min-w-0 flex-col items-start">
            <h2
              id="chat-build"
              class="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            >
              Start building
            </h2>
            <p class="mt-3 text-muted-foreground">
              Install the components, or start from the complete drawer example with sample data.
              Your app supplies messages, persistence, and permissions.
            </p>
            <div class="mt-6 flex w-full max-w-sm flex-col gap-2">
              <InstallCommand command={INSTALL_COMMAND} />
            </div>
            <div class="mt-6 flex flex-wrap gap-2">
              <a class={buttonVariants({ variant: 'outline' })} href={docsHref}>
                Read the docs
                <ArrowRightIcon aria-hidden="true" />
              </a>
              <a class={buttonVariants({ variant: 'ghost' })} href={blocHref}>
                View the drawer example
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </div>
          </div>
          <dl class="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {#each COMPONENT_MAP as item (item.area)}
              <div class="border-t pt-4">
                <dt class="text-sm font-medium">{item.area}</dt>
                <dd class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {#each item.components as component (component)}
                    <code class="text-xs text-muted-foreground">{component}</code>
                  {/each}
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      </section>
    {/snippet}
  </ChatDemo>
</main>
