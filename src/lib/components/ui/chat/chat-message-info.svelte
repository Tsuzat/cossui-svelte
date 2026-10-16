<script lang="ts">
  import type { Snippet } from 'svelte';
  import ChatMessageFooter from './chat-message-footer.svelte';

  let {
    bubble,
    metadata,
    children
  }: {
    /** The message being inspected, usually inside a `ChatMessageBubble`. */
    bubble: Snippet;
    /** Footer line under the message (date, delivery status…). */
    metadata: Snippet;
    /** One `ChatMemberSection` per receipt group. */
    children?: Snippet;
  } = $props();
</script>

<div data-slot="chat-message-info">
  <div class="mb-7 flex flex-col items-end gap-1">
    <div class="w-fit min-w-0 max-w-[83%]">{@render bubble()}</div>
    <ChatMessageFooter>{@render metadata()}</ChatMessageFooter>
  </div>
  <div class="flex flex-col gap-7">{@render children?.()}</div>
</div>
