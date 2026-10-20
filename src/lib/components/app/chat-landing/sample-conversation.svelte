<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    ChatCollapsibleMessage,
    ChatConversation,
    ChatDeliveryIndicator,
    ChatMessage,
    ChatMessageText,
    ChatScroll
  } from '#lib/components/ui/chat/index.js';
  import { type ComposerValue, getComposerText } from '#lib/components/ui/composer/index.js';
  import ChatDemoComposer from '#lib/components/blocs/chat-01/components/chat-demo-composer.svelte';
  import ChatDemoMemberAvatar from '#lib/components/blocs/chat-01/components/chat-demo-member-avatar.svelte';
  import {
    CHAT_MEMBERS,
    type MemberId
  } from '#lib/components/blocs/chat-01/components/chat-demo-state.js';
  import ChatDemoTimelineState from '#lib/components/blocs/chat-01/components/chat-demo-timeline-state.svelte';
  import { cn } from '#lib/utils.js';

  type SampleMessage = { id: number; author: MemberId; text: string };

  const SAMPLE_MESSAGES: SampleMessage[] = [
    { id: 1, author: 'maya', text: 'The new onboarding flow is up for review.' },
    { id: 2, author: 'jordan', text: 'Looks great. The empty state is lovely.' },
    { id: 3, author: 'you', text: 'Agreed. Let’s ship it on Friday.' }
  ];

  const HANDLES = Object.values(CHAT_MEMBERS).map((member) => member.handle);

  let {
    banner,
    disabled = false,
    empty = false,
    focusComposer = false,
    notice = ''
  }: {
    banner?: Snippet;
    disabled?: boolean;
    empty?: boolean;
    focusComposer?: boolean;
    notice?: string;
  } = $props();

  let draft = $state<ComposerValue>([]);
  // svelte-ignore state_referenced_locally
  let messages = $state<SampleMessage[]>(empty ? [] : SAMPLE_MESSAGES);
  let inputRef = $state<HTMLElement | null>(null);
  let nextId = SAMPLE_MESSAGES.length + 1;
  const scroll = new ChatScroll(() => ({ itemCount: messages.length }));

  $effect(() => {
    if (focusComposer && !disabled) inputRef?.focus({ preventScroll: true });
  });

  function send() {
    const text = getComposerText(draft).trim();
    if (!text || disabled) return;
    scroll.atBottom = true;
    messages = [...messages, { id: nextId++, author: 'you', text }];
    draft = [];
  }
</script>

{@render banner?.()}
<ChatConversation
  {scroll}
  label="Messages"
  jumpLabel="Jump to latest"
  contentClass={messages.length === 0 ? 'flex min-h-full flex-col' : undefined}
>
  {#if messages.length === 0}
    <ChatDemoTimelineState
      scenario="empty"
      joined
      memberCount={3}
      onRecover={() => {}}
      onJoin={() => {}}
    />
  {:else}
    <div class="flex flex-col pt-4">
      {#each messages as message, index (message.id)}
        {@const previous = messages[index - 1]}
        {@const grouped = previous?.author === message.author}
        {@const groupEnd = messages[index + 1]?.author !== message.author}
        {@const own = message.author === 'you'}
        {#snippet messageFooter()}
          <time>10:42</time>
          {#if own}
            <ChatDeliveryIndicator status="read" label="Read" />
          {/if}
        {/snippet}
        <div
          class={cn(
            index > 0 && (grouped ? (previous?.author === 'you' ? 'pt-3' : 'pt-1') : 'pt-5')
          )}
        >
          <ChatMessage
            side={own ? 'outgoing' : 'incoming'}
            author={CHAT_MEMBERS[message.author].name}
            animateEntrance={message.id > SAMPLE_MESSAGES.length}
            {grouped}
            footer={groupEnd || own ? messageFooter : undefined}
          >
            {#snippet avatar()}
              <ChatDemoMemberAvatar member={message.author} />
            {/snippet}
            <ChatCollapsibleMessage
              text={message.text}
              side={own ? 'outgoing' : 'incoming'}
              showMoreLabel="Show more"
              showLessLabel="Show less"
            >
              {#snippet renderText(text)}
                <ChatMessageText {text} mentions={HANDLES} />
              {/snippet}
            </ChatCollapsibleMessage>
          </ChatMessage>
        </div>
      {/each}
    </div>
  {/if}
</ChatConversation>
<ChatDemoComposer
  bind:inputRef
  bind:value={draft}
  mentionMembers={['maya', 'jordan', 'alex']}
  {notice}
  {disabled}
  onSend={send}
/>
