<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '#lib/utils.js';
  import ChatBubbleReactions from './chat-bubble-reactions.svelte';
  import ChatMessageAvatar from './chat-message-avatar.svelte';
  import ChatMessageBubble from './chat-message-bubble.svelte';
  import ChatMessageContent from './chat-message-content.svelte';
  import ChatMessageFooter from './chat-message-footer.svelte';
  import ChatMessageHeader from './chat-message-header.svelte';
  import ChatMessageLayout from './chat-message-layout.svelte';
  import ChatMessageText from './chat-message-text.svelte';

  type BubbleProps = ComponentProps<typeof ChatMessageBubble>;

  type Props = Omit<ComponentProps<typeof ChatMessageLayout>, 'align' | 'children'> & {
    side: 'incoming' | 'outgoing';
    author?: Snippet | string;
    avatar?: Snippet;
    grouped?: boolean;
    lifted?: boolean;
    /** Message body. A plain string is rendered as text; use a snippet for custom content. */
    children: Snippet | string;
    actions?: Snippet;
    reactions?: Snippet;
    footer?: Snippet;
    /** Set to false to render the body without a bubble (e.g. deleted messages). */
    bubble?: boolean;
    bubbleProps?: Omit<
      BubbleProps,
      | 'side'
      | 'firstInGroup'
      | 'children'
      | 'animateEntrance'
      | 'highlighted'
      | 'onAnimationComplete'
    >;
    bubbleRef?: HTMLDivElement | null;
    animateEntrance?: boolean;
    highlighted?: boolean;
    onAnimationComplete?: () => void;
  };

  let {
    ref = $bindable(null),
    bubbleRef = $bindable(null),
    side,
    author,
    avatar,
    grouped = false,
    lifted = false,
    children,
    actions,
    reactions,
    footer,
    bubble = true,
    bubbleProps,
    animateEntrance,
    highlighted,
    onAnimationComplete,
    ...restProps
  }: Props = $props();

  const own = $derived(side === 'outgoing');
</script>

{#snippet body()}
  {#if typeof children === 'string'}
    <ChatMessageText text={children} />
  {:else}
    {@render children()}
  {/if}
{/snippet}

<ChatMessageLayout bind:ref align={own ? 'end' : 'start'} {...restProps}>
  {#if !own && !grouped && author}
    <ChatMessageHeader class={lifted ? 'invisible' : undefined}>
      {#if typeof author === 'string'}{author}{:else}{@render author()}{/if}
    </ChatMessageHeader>
  {/if}
  {#if !own && avatar}
    <ChatMessageAvatar class={lifted ? 'invisible' : undefined}>
      {#if !grouped}{@render avatar()}{/if}
    </ChatMessageAvatar>
  {/if}
  <ChatMessageContent>
    {#if bubble}
      <div class={cn('flex w-full min-w-0 items-center gap-2', own && 'flex-row-reverse')}>
        <div class="relative min-w-0 max-w-[83%] shrink">
          <ChatMessageBubble
            {...bubbleProps}
            bind:ref={bubbleRef}
            {side}
            firstInGroup={!grouped}
            {animateEntrance}
            {highlighted}
            {onAnimationComplete}
            class={cn(lifted && 'invisible', bubbleProps?.class)}
          >
            {@render body()}
          </ChatMessageBubble>
        </div>
        {@render actions?.()}
      </div>
    {:else}
      {@render body()}
    {/if}
    {#if reactions}
      <ChatBubbleReactions>{@render reactions()}</ChatBubbleReactions>
    {/if}
    {#if footer}
      <ChatMessageFooter>{@render footer()}</ChatMessageFooter>
    {/if}
  </ChatMessageContent>
</ChatMessageLayout>
