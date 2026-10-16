<script lang="ts">
  import CopyIcon from '@lucide/svelte/icons/copy';
  import InfoIcon from '@lucide/svelte/icons/info';
  import PinIcon from '@lucide/svelte/icons/pin';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    ChatDeliveryIndicator,
    ChatMessage as ChatMessageView,
    ChatMessageActionToolbar,
    ChatReactionChip,
    ChatReactionPicker
  } from '#lib/components/ui/chat/index.js';
  import { MenuItem, MenuSeparator } from '#lib/components/ui/menu/index.js';
  import ChatDemoMemberAvatar from './chat-demo-member-avatar.svelte';
  import ChatDemoMessageBody from './chat-demo-message-body.svelte';
  import { DELIVERY_LABELS, getMessageDelivery } from './chat-demo-receipts';
  import {
    CHAT_EMOJI,
    CHAT_MEMBERS,
    type ChatMessage,
    getMessageDeletionReason,
    getMessagePreview,
    type MemberId
  } from './chat-demo-state';

  type Props = {
    message: ChatMessage;
    recipients: readonly MemberId[];
    entering: boolean;
    onEntranceEnd: () => void;
    replyMessage?: ChatMessage;
    grouped: boolean;
    groupEnd: boolean;
    pinned: boolean;
    highlighted: boolean;
    replyLifted: boolean;
    domId: string;
    onReply: (id: number, source: HTMLElement, firstInGroup: boolean, expanded: boolean) => void;
    onReact: (id: number, emoji: string) => void;
    onPin: (id: number) => void;
    onDelete: (id: number, trigger: HTMLElement | null) => void;
    onCopy: (text: string) => void;
    onJump: (id: number) => void;
    onRetry: (id: number) => void;
    onInfo: (id: number, trigger: HTMLElement | null) => void;
  };

  let {
    message,
    recipients,
    entering,
    onEntranceEnd,
    replyMessage,
    grouped,
    groupEnd,
    pinned,
    highlighted,
    replyLifted,
    domId,
    onReply,
    onReact,
    onPin,
    onDelete,
    onCopy,
    onJump,
    onRetry,
    onInfo
  }: Props = $props();

  let expanded = $state(false);
  let moreTrigger = $state<HTMLElement | null>(null);
  let bubble = $state<HTMLDivElement | null>(null);
  let suppressMenuFocus = false;

  // Reactions present on first render shouldn't animate in.
  // svelte-ignore state_referenced_locally
  const initialReactions = new Set(message.reactions.map((reaction) => reaction.emoji));

  const delivery = $derived(getMessageDelivery(message, recipients));
  const own = $derived(message.author === 'you');
  const member = $derived(CHAT_MEMBERS[message.author]);
  const side = $derived(own ? 'outgoing' : 'incoming');
  const viewerEmojis = $derived(
    message.reactions
      .filter((reaction) => reaction.members.includes('you'))
      .map((reaction) => reaction.emoji)
  );

  function replyToMessage() {
    if (bubble) onReply(message.id, bubble, !grouped, expanded);
  }
</script>

{#snippet reactionsSnippet()}
  {#if message.reactions.length > 0 && !message.deletedReason}
    {#each message.reactions as reaction (reaction.emoji)}
      {@const selected = reaction.members.includes('you')}
      {@const count = reaction.members.length}
      <ChatReactionChip
        animateEntrance={!initialReactions.has(reaction.emoji)}
        emoji={reaction.emoji}
        {count}
        {selected}
        reactorLabel={`${count} ${count === 1 ? 'reaction' : 'reactions'}`}
        popupAlign={own ? 'end' : 'start'}
        label={`${selected ? 'Remove' : 'Add'} ${reaction.emoji} reaction, ${count} ${count === 1 ? 'person' : 'people'}`}
        onclick={() => onReact(message.id, reaction.emoji)}
      >
        {#snippet reactorContent()}
          <ul
            aria-label="People who reacted"
            class="flex max-h-48 flex-col overflow-y-auto overscroll-contain"
          >
            {#each reaction.members as reactor (reactor)}
              <li class="flex items-center gap-2 px-1.5 py-1 text-xs leading-5">
                <ChatDemoMemberAvatar member={reactor} class="size-5 text-[.5625rem]" />
                <span class="min-w-0 flex-1 truncate">{CHAT_MEMBERS[reactor].name}</span>
                {#if reactor === 'you'}
                  <Badge variant="secondary" size="sm">You</Badge>
                {/if}
              </li>
            {/each}
          </ul>
        {/snippet}
      </ChatReactionChip>
    {/each}
  {/if}
{/snippet}
{#snippet footerSnippet()}
  {#if groupEnd || message.delivery}
    {#if pinned && !message.deletedReason}
      <PinIcon class="size-2.5" aria-label="Pinned" />
    {/if}
    <time>{message.time}</time>
    {#if own && !message.deletedReason}
      <ChatDeliveryIndicator status={delivery} label={DELIVERY_LABELS[delivery]} />
      {#if message.delivery === 'failed'}
        <Button variant="ghost" size="xs" onclick={() => onRetry(message.id)}>Retry</Button>
      {/if}
    {/if}
  {/if}
{/snippet}
<ChatMessageView
  reactions={message.reactions.length > 0 && !message.deletedReason ? reactionsSnippet : undefined}
  footer={groupEnd || message.delivery ? footerSnippet : undefined}
  id={domId}
  tabindex={-1}
  aria-label={`${member.name}, ${message.dateLabel} at ${message.time}`}
  {side}
  author={member.name}
  {grouped}
  lifted={replyLifted}
  bubble={!message.deletedReason}
  bind:bubbleRef={bubble}
  animateEntrance={entering}
  onAnimationComplete={entering ? onEntranceEnd : undefined}
  {highlighted}
>
  {#snippet avatar()}
    <ChatDemoMemberAvatar member={message.author} />
  {/snippet}
  {#snippet actions()}
    <ChatMessageActionToolbar
      bind:menuTriggerRef={moreTrigger}
      {side}
      toolbarLabel="Message actions"
      replyLabel={`Reply to ${member.name}`}
      replyTooltip="Reply"
      onReply={replyToMessage}
      moreLabel={`More actions for ${member.name}'s message`}
      moreTooltip="More actions"
      menuFinalFocus={() => {
        if (!suppressMenuFocus) return true;
        suppressMenuFocus = false;
        return false;
      }}
    >
      {#snippet reactionPicker(toolbar)}
        <ChatReactionPicker
          options={CHAT_EMOJI}
          selectedEmojis={viewerEmojis}
          triggerLabel="React to message"
          triggerTooltip="React"
          popupLabel="Choose a reaction"
          popupAlign={own ? 'start' : 'end'}
          popupAnchor={toolbar}
          onSelect={(emoji) => onReact(message.id, emoji)}
        />
      {/snippet}
      {#snippet menuChildren()}
        <MenuItem onclick={() => onCopy(message.text)}><CopyIcon /> Copy text</MenuItem>
        <MenuItem onclick={() => onPin(message.id)}>
          <PinIcon />
          {pinned ? 'Unpin message' : 'Pin message'}
        </MenuItem>
        {#if own}
          <MenuItem
            onclick={() => {
              suppressMenuFocus = true;
              onInfo(message.id, moreTrigger);
            }}
          >
            <InfoIcon /> Message info
          </MenuItem>
        {/if}
        {#if getMessageDeletionReason(message)}
          <MenuSeparator />
          <MenuItem
            variant="destructive"
            onclick={() => {
              suppressMenuFocus = true;
              onDelete(message.id, moreTrigger);
            }}
          >
            <Trash2Icon /> Delete message
          </MenuItem>
        {/if}
      {/snippet}
    </ChatMessageActionToolbar>
  {/snippet}
  {#if message.deletedReason}
    <div class="flex items-center gap-1 px-1 py-2 text-muted-foreground text-xs">
      <Trash2Icon class="size-3 opacity-80" aria-hidden="true" />
      {getMessagePreview(message)}
    </div>
  {:else}
    <ChatDemoMessageBody
      {message}
      {replyMessage}
      {onJump}
      open={expanded}
      onOpenChange={(next) => (expanded = next)}
    />
  {/if}
</ChatMessageView>
