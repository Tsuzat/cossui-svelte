<script lang="ts" module>
  import { prefersReducedMotion } from 'svelte/motion';
  export type ChatReplyTarget = {
    source: HTMLElement;
    width: number;
    firstInGroup: boolean;
  };
</script>

<script lang="ts">
  import XIcon from '@lucide/svelte/icons/x';
  import type { Snippet } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { Button } from '#lib/components/ui/button/index.js';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { Tooltip, TooltipPopup } from '#lib/components/ui/tooltip/index.js';
  import { cn } from '#lib/utils.js';
  import ChatMessageBubble from './chat-message-bubble.svelte';
  import { ChatTip } from './chat-tip.svelte.js';

  type Props = {
    target: ChatReplyTarget;
    side: 'incoming' | 'outgoing';
    avatar?: Snippet;
    author: string;
    replyLabel: string;
    cancelLabel: string;
    children: Snippet;
    /** Why the preview is being dismissed; "cancel" animates the bubble back to its source. */
    dismissalRef: { current: 'cancel' | 'send' };
    onCancel: () => void;
  };

  let {
    target,
    side,
    avatar,
    author,
    replyLabel,
    cancelLabel,
    children,
    dismissalRef,
    onCancel
  }: Props = $props();

  let anchor = $state<HTMLElement | null>(null);
  let bubble = $state<HTMLElement | null>(null);
  let origin = $state<number | null>(null);
  const cancelTip = new ChatTip();
  const own = $derived(side === 'outgoing');
  const reduceMotion = () => prefersReducedMotion.current;

  // Measure where the source bubble sits relative to the focused copy.
  $effect(() => {
    if (!anchor || !bubble) return;
    const destination = anchor.getBoundingClientRect();
    const source = target.source.getBoundingClientRect();
    origin = source.top - destination.top - bubble.offsetTop;
  });

  function returning(): boolean {
    return dismissalRef.current === 'cancel' && target.source.isConnected;
  }

  // Slides the focused bubble from/to the source message.
  function lift(
    _node: HTMLElement,
    _params: object,
    options: { direction: 'in' | 'out' | 'both' }
  ) {
    if (reduceMotion()) return { duration: 0 };
    const from = origin ?? 0;
    if (options.direction === 'in')
      return {
        duration: 350,
        easing: cubicOut,
        css: (t: number) => `transform: translateY(${(1 - t) * from}px)`
      };
    const back = returning();
    return {
      duration: back ? 350 : 300,
      easing: cubicOut,
      css: (t: number) =>
        back
          ? `transform: translateY(${(1 - t) * from}px)`
          : `transform: translateY(${(1 - t) * 6}px); opacity: ${t}`
    };
  }

  const fadeDuration = () => (reduceMotion() ? 0 : 220);
</script>

<button
  type="button"
  tabindex="-1"
  aria-label={cancelLabel}
  class="absolute inset-0 z-40 cursor-default touch-none bg-popover/32 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-6 before:bg-linear-to-b before:from-popover before:to-transparent before:content-['']"
  transition:fade|global={{ duration: fadeDuration() }}
  onclick={onCancel}
  onmousedown={(event) => {
    if (event.button === 0) event.preventDefault();
  }}
  onwheel={(event) => event.preventDefault()}
></button>
<div class="pointer-events-none absolute inset-0 z-50 overflow-clip">
  <ScrollArea
    overscrollContain
    class="**:data-[slot=scroll-area-content]:flex **:data-[slot=scroll-area-content]:min-h-full **:data-[slot=scroll-area-content]:flex-col **:data-[slot=scroll-area-content]:py-4 [&_[data-slot=scroll-area-scrollbar]]:pointer-events-auto"
  >
    <div bind:this={anchor} data-slot="chat-reply-focus" class="relative mx-4 mt-auto shrink-0">
      <div
        aria-hidden="true"
        class="absolute -inset-x-4 -top-20 -bottom-4 bg-linear-to-t from-[calc(100%-4rem)] from-popover to-transparent"
        transition:fade|global={{ duration: fadeDuration() }}
      ></div>
      <div
        transition:lift|global
        class={cn(
          'relative grid items-start gap-y-1',
          own ? 'grid-cols-1' : 'grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2',
          origin === null && 'invisible'
        )}
      >
        {#if !own}
          <div class="col-start-1 row-start-2 w-7">{@render avatar?.()}</div>
        {/if}
        <div
          class={cn(
            'flex h-lh min-w-0 max-w-full items-center gap-2 px-1 font-medium text-muted-foreground text-xs',
            own ? 'justify-self-end' : 'col-start-2 row-start-1'
          )}
        >
          <span role="status" class="min-w-0 truncate">{replyLabel}</span>
        </div>
        <div
          bind:this={bubble}
          style:width="{target.width}px"
          class={cn(
            'pointer-events-auto relative row-start-2 max-w-full rounded-2xl bg-popover',
            own ? 'justify-self-end' : 'col-start-2',
            target.firstInGroup && (own ? 'rounded-se-md' : 'rounded-ss-md')
          )}
        >
          <ChatMessageBubble
            side={own ? 'outgoing' : 'incoming'}
            firstInGroup={target.firstInGroup}
          >
            {@render children()}
          </ChatMessageBubble>
          <div
            class={cn(
              'absolute -top-2.5 z-10 flex rounded-full bg-popover',
              own ? '-start-2.5' : '-end-2.5'
            )}
            transition:fade|global={{ duration: reduceMotion() ? 0 : 180 }}
          >
            <Tooltip bind:open={cancelTip.open}>
              <Button
                type="button"
                size="icon-xs"
                variant="outline"
                aria-label={cancelLabel}
                class="size-6 rounded-full before:rounded-full"
                bind:ref={cancelTip.anchor}
                onmousedown={(event: MouseEvent) => {
                  if (event.button === 0) event.preventDefault();
                }}
                onclick={onCancel}
                {...cancelTip.props}
              >
                <XIcon aria-hidden="true" />
              </Button>
              <TooltipPopup customAnchor={cancelTip.anchor}>{cancelLabel}</TooltipPopup>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  </ScrollArea>
</div>
