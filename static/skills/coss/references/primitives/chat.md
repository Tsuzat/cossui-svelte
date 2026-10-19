# coss Chat UI (cossui-svelte only)

## When to use

- Conversations in a drawer, panel or page: message rows, bubbles, reactions, replies, typing/delivery indicators, date/unread markers, end-following scroll.

The components handle presentation and local interaction; your application owns messages, membership, persistence, delivery state and authorization. Full docs: `https://cossui-svelte.com/docs/chat`. Complete reference implementation: the `chat-01` bloc (`https://cossui-svelte.com/blocs/view/chat-01`, source in `src/lib/components/blocs/chat-01/`).

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/chat.json https://cossui-svelte.com/r/composer.json https://cossui-svelte.com/r/avatar.json
```

Chat installs into `ui/chat/` with its scroll controller and helpers, plus the coss components, Lucide icons and ShardsUI it needs. The draft input is the shared [Composer](composer.md).

## Canonical imports

```svelte
<script lang="ts">
  import { ChatConversation, ChatMessage, ChatScroll } from '#lib/components/ui/chat/index.js';
</script>
```

Component map (all from the `chat` module; no global provider):

| Area | Components |
| --- | --- |
| Conversation | `ChatConversation`, `ChatScroll` (class), `useChatPopupDismissal` |
| Message | `ChatMessage` |
| Surfaces | `ChatMessageBubble`, `ChatBubble`, `ChatMessageLayout`, `ChatMessageHeader`, `ChatMessageContent`, `ChatMessageFooter`, `ChatMessageAvatar` |
| Content | `ChatMessageText`, `ChatCollapsibleMessage`, `ChatReplyReference`, `splitChatMessagePreview` |
| Actions | `ChatMessageActionToolbar`, `ChatReactionPicker`, `ChatReactionChip`, `ChatBubbleReactions` |
| Focused reply | `ChatReplyPreview` (type `ChatReplyTarget`) |
| Timeline | `ChatDatePill`, `ChatUnreadDivider`, `ChatJumpToLatestButton` |
| Activity | `ChatTypingIndicator`, `ChatDeliveryIndicator` |
| People | `ChatMemberList` (type `ChatMemberEntry`), `ChatMemberSection`, `ChatMessageInfo` |
| States | `ChatEmptyState`, `ChatLoadingState`, `ChatStatusBar` |

## Minimal pattern

```svelte
<script lang="ts">
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  import { Avatar, AvatarFallback } from '#lib/components/ui/avatar/index.js';
  import { ChatConversation, ChatMessage, ChatScroll } from '#lib/components/ui/chat/index.js';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerSubmit,
    type ComposerValue,
    getComposerText
  } from '#lib/components/ui/composer/index.js';

  let draft = $state<ComposerValue>([]);
  let messages = $state([{ id: 0, own: false, text: 'Hi! Try sending a message.' }]);
  const scroll = new ChatScroll(() => ({ itemCount: messages.length }));
</script>

<section aria-label="Chat" class="flex h-96 flex-col rounded-xl border bg-popover">
  <ChatConversation {scroll} label="Conversation" jumpLabel="Jump to latest">
    <div class="space-y-4 pt-4">
      {#each messages as message (message.id)}
        <ChatMessage side={message.own ? 'outgoing' : 'incoming'} author="Casey" animateEntrance={message.own}>
          {#snippet avatar()}
            <Avatar aria-hidden="true" class="size-7 text-xs"><AvatarFallback>C</AvatarFallback></Avatar>
          {/snippet}
          {message.text}
        </ChatMessage>
      {/each}
    </div>
  </ChatConversation>
  <div class="shrink-0 px-4 pb-4">
    <Composer
      bind:value={draft}
      submitOnEnter="desktop"
      onSubmit={(value) => {
        const text = getComposerText(value).trim();
        if (!text) return;
        scroll.atBottom = true;
        messages.push({ id: messages.length, own: true, text });
        draft = [];
      }}
    >
      <ComposerInput as="textarea" aria-label="Message" placeholder="Write a message…" />
      <ComposerActions>
        <ComposerActionGroup align="end">
          <ComposerSubmit aria-label="Send message" size="icon"><ArrowUpIcon aria-hidden="true" /></ComposerSubmit>
        </ComposerActionGroup>
      </ComposerActions>
    </Composer>
  </div>
</section>
```

A conversation needs a bounded height (`min-h-0` in flex layouts), one `ChatScroll`, messages with stable IDs, and a draft.

## Key rules

- **`ChatMessage`**: requires `side` (`incoming | outgoing`) and children; optional `author`, `avatar` / `actions` / `reactions` / `footer` snippets, `grouped` (consecutive messages from one sender), `bubble={false}` (deleted placeholder), `bind:bubbleRef`, `bubbleProps`, `highlighted`, `animateEntrance` (new arrivals only). Grouping and spacing belong to your composition.
- **Text**: string children render via `ChatMessageText` (pass `mentions` for emphasis). `ChatCollapsibleMessage` needs `text`, `side`, `showMoreLabel`, `showLessLabel` (default `maxPreviewLength` 500).
- **Reactions**: `ChatReactionPicker` (`options` `{ emoji, label }[]`, `selectedEmojis`, `onSelect`, `triggerLabel`, `triggerTooltip`, `popupLabel`, and `popupAnchor` = the toolbar element when used in `ChatMessageActionToolbar`'s `reactionPicker` snippet). `ChatReactionChip` is controlled (`selected`, `count`, `emoji`, `label`, `onclick`; `reactorContent` snippet + `reactorLabel` for the reactor list).
- **Scroll**: `new ChatScroll(() => ({ itemCount, layoutKey, active, paused }))` — options are a function so they stay reactive. Set `scroll.atBottom = true` before appending a locally sent message; incoming messages preserve the reader's position. `resetScroll()` when changing rooms. It does not fetch, paginate or virtualize.
- **Accessibility**: `ChatConversation` is a labelled `role="log"` (`live="off"` if you announce arrivals yourself). `ChatDeliveryIndicator` is a labelled image, not a live region — announce send failures through one app-owned status region.
- **Replies**: `ChatReplyReference` delegates navigation to your `onclick`; focused replies use `ChatReplyPreview` in the conversation's `overlay` snippet with a measured `ChatReplyTarget` (see the bloc's `chat-demo.svelte`, `chat-demo-message.svelte`, `chat-demo-reply-focus.svelte`).
- **Composer in chat**: `submitOnEnter="desktop"` (touch Return inserts a newline); mentions need the default contenteditable input with an `@` trigger. See [composer.md](composer.md).
- **Drawer**: header, conversation and composer as separate flex children; bottom drawers already handle the software keyboard.

## Common pitfalls

- Unbounded conversation height (nothing scrolls, end-following breaks).
- Forgetting `scroll.atBottom = true` before pushing an outgoing message.
- Treating a displayed mention or a hidden UI action as authorization — recheck every mutation server-side.
- Enabling `animateEntrance` for loaded history.

## Useful references

- bloc: `chat-01` (group chat in a drawer with replies, reactions, pinning, receipts, mentions and states)
- composer particles: `p-composer-1` – `p-composer-11`; composer in a drawer: `p-drawer-15`
