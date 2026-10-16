<script lang="ts">
  import CornerDownLeftIcon from '@lucide/svelte/icons/corner-down-left';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import type { ComponentProps, Snippet } from 'svelte';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Menu, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import { Toolbar, ToolbarButton } from '#lib/components/ui/toolbar/index.js';
  import { Tooltip, TooltipPopup } from '#lib/components/ui/tooltip/index.js';
  import { cn } from '#lib/utils.js';
  import { ChatTip } from './chat-tip.svelte.js';
  import { useChatPopupDismissal } from './use-chat-popup-dismissal.svelte.js';

  type Props = {
    side: 'incoming' | 'outgoing';
    toolbarLabel: string;
    /** Receives the toolbar element so the picker popup can anchor to it. */
    reactionPicker?: Snippet<[HTMLElement | null]>;
    replyLabel?: string;
    replyTooltip?: string;
    onReply?: () => void;
    moreLabel?: string;
    moreTooltip?: string;
    menuChildren?: Snippet;
    menuTriggerRef?: HTMLElement | null;
    menuFinalFocus?: ComponentProps<typeof MenuPopup>['finalFocus'];
  };

  let {
    side,
    toolbarLabel,
    reactionPicker,
    replyLabel,
    replyTooltip,
    onReply,
    moreLabel,
    moreTooltip,
    menuChildren,
    menuTriggerRef = $bindable(null),
    menuFinalFocus
  }: Props = $props();

  let menuOpen = $state(false);
  let toolbar = $state<HTMLElement | null>(null);
  const replyTip = new ChatTip();
  const moreTip = new ChatTip();

  useChatPopupDismissal(
    () => menuOpen,
    () => menuTriggerRef,
    () => (menuOpen = false)
  );

  const buttonClass = cn(
    buttonVariants({ size: 'icon-xs', variant: 'ghost' }),
    'pointer-coarse:size-8 rounded-full before:rounded-full'
  );
</script>

{#if reactionPicker || onReply || menuChildren}
  <Toolbar
    {@attach (element: HTMLElement) => {
      toolbar = element;
      return () => (toolbar = null);
    }}
    aria-label={toolbarLabel}
    data-slot="chat-message-action-toolbar"
    class="z-10 min-w-max flex-none items-center gap-0 self-center rounded-full bg-transparent p-0.5 opacity-0 pointer-coarse:opacity-100 transition-opacity group-hover/message:opacity-100 has-data-popup-open:opacity-100 has-focus-visible:opacity-100 motion-reduce:transition-none"
  >
    {@render reactionPicker?.(toolbar)}
    {#if onReply}
      <Tooltip bind:open={replyTip.open}>
        <ToolbarButton
          {@attach (element: HTMLElement) => {
            replyTip.anchor = element;
            return () => (replyTip.anchor = null);
          }}
          class={buttonClass}
          aria-label={replyLabel}
          onmousedown={(event: MouseEvent) => {
            if (event.button === 0) event.preventDefault();
          }}
          onclick={onReply}
          {...replyTip.props}
        >
          <CornerDownLeftIcon aria-hidden="true" />
        </ToolbarButton>
        <TooltipPopup customAnchor={replyTip.anchor}>{replyTooltip}</TooltipPopup>
      </Tooltip>
    {/if}
    {#if menuChildren}
      <Menu bind:open={menuOpen}>
        <Tooltip bind:open={moreTip.open}>
          <MenuTrigger
            bind:ref={
              () => menuTriggerRef,
              (element) => {
                menuTriggerRef = element;
                moreTip.anchor = element;
              }
            }
            class={buttonClass}
            aria-label={moreLabel}
            data-message-actions=""
            {...moreTip.props}
          >
            <EllipsisIcon aria-hidden="true" />
          </MenuTrigger>
          <TooltipPopup customAnchor={moreTip.anchor}>{moreTooltip}</TooltipPopup>
        </Tooltip>
        <MenuPopup align={side === 'outgoing' ? 'start' : 'end'} finalFocus={menuFinalFocus}>
          {@render menuChildren()}
        </MenuPopup>
      </Menu>
    {/if}
  </Toolbar>
{/if}
