<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { ButtonSize, ButtonVariant } from '#lib/components/ui/button/button-variants.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { useComposerEditorContext } from './composer-editor.svelte.js';

  type Props = Omit<HTMLButtonAttributes, 'type' | 'class'> & {
    class?: string;
    ref?: HTMLElement | null;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    children?: Snippet;
  };

  let { ref = $bindable(null), disabled, onclick, ...restProps }: Props = $props();

  const editor = useComposerEditorContext();
</script>

<Button
  bind:ref
  data-slot="composer-submit"
  type="button"
  disabled={disabled ?? !editor?.canSubmit}
  onpointerdown={(event: PointerEvent) => {
    // Keep the caret in the input while pressing Send.
    const input = editor?.inputElement;
    if (
      event.button === 0 &&
      input &&
      input === (event.currentTarget as HTMLElement).ownerDocument.activeElement
    ) {
      event.preventDefault();
    }
  }}
  onclick={(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
    onclick?.(event);
    if (event.defaultPrevented || disabled) return;
    event.preventDefault();
    editor?.submit();
  }}
  {...restProps}
/>
