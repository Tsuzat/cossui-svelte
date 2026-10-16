<script lang="ts">
  import {
    ChatCollapsibleMessage,
    ChatMessageText,
    ChatReplyReference
  } from '#lib/components/ui/chat/index.js';
  import { CHAT_MEMBERS, type ChatMessage, getMessagePreview } from './chat-demo-state';

  type Props = {
    message: ChatMessage;
    replyMessage?: ChatMessage;
    onJump?: (id: number) => void;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };

  let { message, replyMessage, onJump, defaultOpen, open, onOpenChange }: Props = $props();

  const own = $derived(message.author === 'you');
  const handles = Object.values(CHAT_MEMBERS).map((member) => member.handle);
</script>

{#if message.forwarded}
  <span class="text-xs italic opacity-65">Forwarded</span>
{/if}
{#if message.replyTo}
  <ChatReplyReference
    author={replyMessage ? CHAT_MEMBERS[replyMessage.author].name : 'Original message'}
    preview={replyMessage ? getMessagePreview(replyMessage) : 'Message unavailable'}
    onclick={() => onJump?.(message.replyTo ?? message.id)}
    disabled={!replyMessage || !onJump}
  />
{/if}
<ChatCollapsibleMessage
  {defaultOpen}
  {open}
  {onOpenChange}
  text={message.text}
  side={own ? 'outgoing' : 'incoming'}
  showMoreLabel="Show more"
  showLessLabel="Show less"
>
  {#snippet renderText(text)}
    <ChatMessageText {text} mentions={handles} />
  {/snippet}
</ChatCollapsibleMessage>
