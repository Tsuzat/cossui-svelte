<script lang="ts" module>
  import type { ChatReplyTarget } from '#lib/components/ui/chat/index.js';

  export type ChatReplyFocusTarget = ChatReplyTarget & {
    messageId: number;
    expanded: boolean;
  };
</script>

<script lang="ts">
  import { ChatReplyPreview } from '#lib/components/ui/chat/index.js';
  import ChatDemoMemberAvatar from './chat-demo-member-avatar.svelte';
  import ChatDemoMessageBody from './chat-demo-message-body.svelte';
  import { CHAT_MEMBERS, type ChatMessage } from './chat-demo-state';

  type Props = {
    target: ChatReplyFocusTarget;
    message: ChatMessage;
    replyMessage?: ChatMessage;
    dismissalRef: { current: 'cancel' | 'send' };
    onCancel: () => void;
  };

  let { target, message, replyMessage, dismissalRef, onCancel }: Props = $props();

  const own = $derived(message.author === 'you');
</script>

<ChatReplyPreview
  {target}
  side={own ? 'outgoing' : 'incoming'}
  author={own ? 'your message' : CHAT_MEMBERS[message.author].name}
  replyLabel={own ? 'Reply to your message' : `Reply to ${CHAT_MEMBERS[message.author].name}`}
  cancelLabel="Cancel reply"
  {dismissalRef}
  {onCancel}
>
  {#snippet avatar()}
    <ChatDemoMemberAvatar member={message.author} />
  {/snippet}
  <ChatDemoMessageBody defaultOpen={target.expanded} {message} {replyMessage} />
</ChatReplyPreview>
