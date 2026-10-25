<script lang="ts">
  import { Sparkle } from '@lucide/svelte';
  import Check from '@lucide/svelte/icons/check';
  import Copy from '@lucide/svelte/icons/copy';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '../tiptap';
  import Tooltip from './Tooltip.svelte';

  const { editor, node, updateAttributes, extension, getPos }: NodeViewProps = $props();

  let preRef = $state<HTMLPreElement>();
  let isCopying = $state(false);
  const languages: { label: string; value: string }[] = $derived(
    extension.options.lowlight
      .listLanguages()
      .sort()
      .map((language: string) => ({ label: language, value: language }))
  );
  const defaultLanguage = $derived<string>(node.attrs.language ?? 'plaintext');

  const changeLanguage = (language: string) => {
    updateAttributes({ language: language });
  };

  function copyCode() {
    if (!preRef) return;
    isCopying = true;
    navigator.clipboard.writeText(preRef.innerText);
    setTimeout(() => {
      isCopying = false;
    }, 1000);
  }

  function convertToMermaid() {
    const code = node.textContent;
    const pos = getPos();
    if (typeof pos !== 'number') return;
    editor
      .chain()
      .focus()
      .deleteRange({ from: pos, to: pos + node.nodeSize })
      .insertContentAt(pos, {
        type: 'mermaid',
        content: [
          {
            type: 'text',
            text: code || ''
          }
        ]
      })
      .run();
  }
</script>

<NodeViewWrapper class="my-4 rounded-lg bg-muted pb-4 dark:bg-muted/20">
  <div class="mx-2 flex items-center justify-end gap-2 print:justify-start" contenteditable="false">
    {#if defaultLanguage.toLowerCase() === 'mermaid'}
      <Tooltip tooltip="Convert to Mermaid Diagram">
        <Button variant="ghost" size="icon-xs" class="print:hidden" onclick={convertToMermaid}>
          <Sparkle />
        </Button>
      </Tooltip>
    {/if}
    <div class="relative print:hidden">
      <Tooltip tooltip="Change Language">
        <select
          aria-label="Code block language"
          value={defaultLanguage}
          disabled={!editor.isEditable}
          onchange={(event) => changeLanguage(event.currentTarget.value)}
          onclick={(event) => event.stopPropagation()}
          class="h-7 cursor-pointer appearance-none rounded-md pl-1 w-fit! border-0 bg-transparent text-xs font-medium text-muted-foreground capitalize outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {#each languages as { label, value } (value)}
            <option {value} selected={value === defaultLanguage} class="capitalize">
              {label}
            </option>
          {/each}
        </select>
      </Tooltip>
    </div>
    <Button
      variant="ghost"
      size="icon-xs"
      class="text-muted-foreground print:hidden"
      onclick={copyCode}
    >
      {#if isCopying}
        <Check class=" text-green-500" />
      {:else}
        <Copy />
      {/if}
    </Button>
  </div>
  <pre bind:this={preRef} draggable={false} spellcheck="false">
		<NodeViewContent as="code" class={`language-${defaultLanguage}`} {...node.attrs} />
	</pre>
</NodeViewWrapper>
