/**
 * Tiny controller for tooltips attached to elements that can't also be a
 * tooltip trigger (toolbar/popover/menu triggers): spread `props` on the
 * element, bind its ref to `anchor`, and give `<TooltipPopup customAnchor>` the anchor.
 */
export class ChatTip {
  open = $state(false);
  anchor = $state<HTMLElement | null>(null);

  readonly props = {
    onpointerenter: () => (this.open = true),
    onpointerleave: () => (this.open = false),
    onfocus: (event: FocusEvent) => {
      if ((event.currentTarget as HTMLElement).matches(':focus-visible')) this.open = true;
    },
    onblur: () => (this.open = false)
  };

  close = (): void => {
    this.open = false;
  };
}
