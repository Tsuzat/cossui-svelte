<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComposerTokenPart } from './composer-editor.svelte.js';
  import ComposerToken from './composer-token.svelte';

  let {
    token,
    renderToken
  }: { token: ComposerTokenPart; renderToken?: Snippet<[ComposerTokenPart]> } = $props();
</script>

{#if renderToken}
  {@render renderToken(token)}
{:else}
  <ComposerToken {token} />
{/if}
