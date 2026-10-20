<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onDestroy } from 'svelte';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardFrame, CardFrameFooter, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    ChatCollapsibleMessage,
    ChatConversation,
    ChatDatePill,
    ChatDeliveryIndicator,
    ChatMessage,
    ChatMessageActionToolbar,
    ChatMessageText,
    ChatReactionChip,
    ChatReactionPicker,
    ChatReplyReference,
    ChatScroll,
    ChatUnreadDivider
  } from '#lib/components/ui/chat/index.js';
  import { type ComposerValue, getComposerText } from '#lib/components/ui/composer/index.js';
  import ChatDemoComposer from '#lib/components/blocs/chat-01/components/chat-demo-composer.svelte';
  import ChatDemoMemberAvatar from '#lib/components/blocs/chat-01/components/chat-demo-member-avatar.svelte';
  import {
    CHAT_EMOJI,
    CHAT_MEMBERS,
    type ChatReaction,
    type MemberId,
    toggleReaction
  } from '#lib/components/blocs/chat-01/components/chat-demo-state.js';
  import { cn } from '#lib/utils.js';

  const HANDLES = Object.values(CHAT_MEMBERS).map((member) => member.handle);
  const timers: number[] = [];
  onDestroy(() => {
    for (const timer of timers) clearTimeout(timer);
  });

  // Replies
  let replyHighlighted = $state(false);
  let replyTarget = $state<HTMLElement | null>(null);
  let replyTimer: number | undefined;
  function jumpToOriginal() {
    replyTarget?.focus({ preventScroll: true });
    replyHighlighted = true;
    window.clearTimeout(replyTimer);
    replyTimer = window.setTimeout(() => (replyHighlighted = false), 420);
    timers.push(replyTimer);
  }

  // Reactions
  const INITIAL_REACTIONS: ChatReaction[] = [
    { emoji: '🎉', members: ['maya', 'jordan'] },
    { emoji: '❤️', members: ['alex'] }
  ];
  let reactions = $state<ChatReaction[]>(INITIAL_REACTIONS);
  const toggle = (emoji: string) => (reactions = toggleReaction(reactions, emoji));

  // Mentions
  let mentionDraft = $state<ComposerValue>([]);
  let mentionSent = $state('Thanks @Alex, this is exactly it.');

  // Delivery states
  type Delivery = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  const DELIVERY_LABELS: Record<Delivery, string> = {
    sending: 'Sending…',
    sent: 'Sent',
    delivered: 'Delivered',
    read: 'Read',
    failed: 'Not sent'
  };
  let retried = $state<Delivery>('failed');
  const deliveryRows = $derived<{ id: string; text: string; status: Delivery }[]>([
    { id: 'read', text: 'Draft is in the doc.', status: 'read' },
    { id: 'delivered', text: 'Comments welcome.', status: 'delivered' },
    { id: 'retry', text: 'Sharing it with the team now.', status: retried }
  ]);
  function retry() {
    retried = 'sending';
    timers.push(window.setTimeout(() => (retried = 'delivered'), 900));
    timers.push(window.setTimeout(() => (retried = 'read'), 1800));
  }

  // Long messages
  const LONG_MESSAGE = `Quick recap from today’s review.

The onboarding flow tested well: most people finished it in under two minutes, and nobody got stuck on the workspace step. The empty states got a lot of love.

Two things to follow up on. The invite screen still feels a little crowded on small phones, and a few people missed the “skip for now” link. I’ll pair with @Jordan on both tomorrow, then we can do one more pass before Friday.

Please add your feedback to the shared review notes so we can keep the decisions together. We’ll check the updated screens on both desktop and mobile, then confirm the final copy with the team before the launch.`;

  // Timeline
  const TIMELINE: {
    date: string;
    unread?: boolean;
    messages: { id: number; author: MemberId; text: string }[];
  }[] = [
    {
      date: 'Monday',
      messages: [
        { id: 1, author: 'maya', text: 'Kickoff notes are in the doc.' },
        { id: 2, author: 'you', text: 'Thanks, reading now.' },
        { id: 3, author: 'jordan', text: 'Added the open questions at the end.' }
      ]
    },
    {
      date: 'Yesterday',
      messages: [
        { id: 4, author: 'alex', text: 'Prototype link is ready.' },
        { id: 5, author: 'you', text: 'Looks good on mobile too.' }
      ]
    },
    {
      date: 'Today',
      unread: true,
      messages: [
        { id: 6, author: 'maya', text: 'Can we review it at 3?' },
        { id: 7, author: 'jordan', text: 'Works for me.' }
      ]
    }
  ];
  const timelineScroll = new ChatScroll(() => ({ itemCount: 7 }));
</script>

{#snippet featureTile(title: string, description: string, demo: Snippet)}
  <CardFrame
    role="article"
    class="after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64"
  >
    <Card class="flex-1">
      <CardPanel class="flex min-h-72 flex-col justify-center p-5">
        {@render demo()}
      </CardPanel>
    </Card>
    <CardFrameFooter class="px-5">
      <h3 class="text-sm font-medium">{title}</h3>
      <p class="mt-1 text-sm text-muted-foreground">{description}</p>
    </CardFrameFooter>
  </CardFrame>
{/snippet}

{#snippet mayaAvatar()}
  <ChatDemoMemberAvatar member="maya" />
{/snippet}
{#snippet jordanAvatar()}
  <ChatDemoMemberAvatar member="jordan" />
{/snippet}
{#snippet alexAvatar()}
  <ChatDemoMemberAvatar member="alex" />
{/snippet}
{#snippet mentionText(text: string)}
  <ChatMessageText {text} mentions={HANDLES} />
{/snippet}

{#snippet repliesDemo()}
  <div class="flex flex-col gap-4">
    <ChatMessage
      bind:ref={replyTarget}
      side="incoming"
      author={CHAT_MEMBERS.maya.name}
      avatar={mayaAvatar}
      highlighted={replyHighlighted}
      tabindex={-1}
      aria-label="Maya Chen, original message"
    >
      Can we move the launch to Thursday?
    </ChatMessage>
    <ChatMessage side="outgoing">
      <ChatReplyReference
        author={CHAT_MEMBERS.maya.name}
        preview="Can we move the launch to Thursday?"
        onclick={jumpToOriginal}
      />
      <ChatMessageText text="Thursday works. I’ll update the plan." />
    </ChatMessage>
  </div>
{/snippet}

{#snippet reactionChips()}
  {#each reactions as reaction (reaction.emoji)}
    {@const selected = reaction.members.includes('you')}
    {@const count = reaction.members.length}
    <ChatReactionChip
      animateEntrance={!INITIAL_REACTIONS.some((item) => item.emoji === reaction.emoji)}
      emoji={reaction.emoji}
      {count}
      {selected}
      label={`${selected ? 'Remove' : 'Add'} ${reaction.emoji} reaction, ${count} ${count === 1 ? 'person' : 'people'}`}
      reactorLabel={`${count} ${count === 1 ? 'reaction' : 'reactions'}`}
      popupAlign="start"
      onclick={() => toggle(reaction.emoji)}
    >
      {#snippet reactorContent()}
        <ul
          aria-label="People who reacted"
          class="flex max-h-48 flex-col overflow-y-auto overscroll-contain"
        >
          {#each reaction.members as member (member)}
            <li class="flex items-center gap-2 px-1.5 py-1 text-xs leading-5">
              <ChatDemoMemberAvatar {member} class="size-5 text-[.5625rem]" />
              <span class="min-w-0 flex-1 truncate">{CHAT_MEMBERS[member].name}</span>
              {#if member === 'you'}
                <Badge variant="secondary" size="sm">You</Badge>
              {/if}
            </li>
          {/each}
        </ul>
      {/snippet}
    </ChatReactionChip>
  {/each}
{/snippet}

{#snippet reactionsDemo()}
  <ChatMessage
    side="incoming"
    author={CHAT_MEMBERS.jordan.name}
    avatar={jordanAvatar}
    reactions={reactions.length > 0 ? reactionChips : undefined}
  >
    {#snippet actions()}
      <ChatMessageActionToolbar side="incoming" toolbarLabel="Message actions">
        {#snippet reactionPicker(toolbar)}
          <ChatReactionPicker
            options={CHAT_EMOJI}
            selectedEmojis={reactions
              .filter((reaction) => reaction.members.includes('you'))
              .map((reaction) => reaction.emoji)}
            triggerLabel="Add reaction"
            triggerTooltip="React"
            popupLabel="Reactions"
            popupAnchor={toolbar}
            popupAlign="end"
            onSelect={toggle}
          />
        {/snippet}
      </ChatMessageActionToolbar>
    {/snippet}
    We just crossed 10,000 signups 🚀
  </ChatMessage>
{/snippet}

{#snippet mentionsDemo()}
  <div class="flex flex-col gap-4">
    <ChatMessage side="outgoing">
      <ChatCollapsibleMessage
        text={mentionSent}
        side="outgoing"
        showMoreLabel="Show more"
        showLessLabel="Show less"
        renderText={mentionText}
      />
    </ChatMessage>
    <ChatDemoComposer
      class="px-0 pb-0"
      bind:value={mentionDraft}
      mentionMembers={['maya', 'jordan', 'alex']}
      notice=""
      onSend={() => {
        const text = getComposerText(mentionDraft).trim();
        if (!text) return;
        mentionSent = text;
        mentionDraft = [];
      }}
    />
  </div>
{/snippet}

{#snippet deliveryDemo()}
  <div class="flex flex-col gap-3">
    {#each deliveryRows as row (row.id)}
      {#snippet footer()}
        <span class="inline-flex items-center gap-1.5">
          <ChatDeliveryIndicator status={row.status} label={DELIVERY_LABELS[row.status]} />
          <span class={cn(row.status === 'failed' && 'text-destructive')}>
            {DELIVERY_LABELS[row.status]}
          </span>
          {#if row.status === 'failed'}
            <Button class="-my-1" size="xs" variant="ghost" onclick={retry}>Retry</Button>
          {/if}
        </span>
      {/snippet}
      <ChatMessage side="outgoing" grouped={row.id !== 'read'} {footer}>
        {row.text}
      </ChatMessage>
    {/each}
  </div>
{/snippet}

{#snippet longMessageDemo()}
  <ChatMessage side="incoming" author={CHAT_MEMBERS.alex.name} avatar={alexAvatar}>
    <ChatCollapsibleMessage
      side="incoming"
      text={LONG_MESSAGE}
      renderText={mentionText}
      showMoreLabel="Show more"
      showLessLabel="Show less"
    />
  </ChatMessage>
{/snippet}

{#snippet timelineDemo()}
  <div class="-m-5 flex h-82 flex-col">
    <ChatConversation scroll={timelineScroll} label="Timeline example" jumpLabel="Jump to latest">
      {#each TIMELINE as group (group.date)}
        <div class="not-first:mt-4 flex flex-col gap-4 first:pt-4">
          <ChatDatePill>{group.date}</ChatDatePill>
          {#if group.unread}
            <ChatUnreadDivider class="my-0">2 new messages</ChatUnreadDivider>
          {/if}
          <div class="flex flex-col gap-5">
            {#each group.messages as message (message.id)}
              <ChatMessage
                side={message.author === 'you' ? 'outgoing' : 'incoming'}
                author={CHAT_MEMBERS[message.author].name}
              >
                {#snippet avatar()}
                  <ChatDemoMemberAvatar member={message.author} />
                {/snippet}
                {message.text}
              </ChatMessage>
            {/each}
          </div>
        </div>
      {/each}
    </ChatConversation>
  </div>
{/snippet}

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  {@render featureTile('Replies', 'Quote a message and jump back to it in one click.', repliesDemo)}
  {@render featureTile(
    'Reactions',
    'Hover to react. Hover a chip to see who reacted.',
    reactionsDemo
  )}
  {@render featureTile(
    'Mentions',
    'Type @ for suggestions, with full keyboard support.',
    mentionsDemo
  )}
  {@render featureTile(
    'Delivery states',
    'Sending, delivered, read, and a retry when it fails.',
    deliveryDemo
  )}
  {@render featureTile(
    'Long messages',
    'Long text collapses, keeping its paragraphs and mentions.',
    longMessageDemo
  )}
  {@render featureTile(
    'Timeline',
    'Sticky dates and an unread marker. Scroll up to jump back.',
    timelineDemo
  )}
</div>
