<script lang="ts">
  import UploadIcon from '@lucide/svelte/icons/upload';
  import { onMount } from 'svelte';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';
  import TreeNode from './components/tree-node.svelte';
  import { compareHtml, formatHtml, type DiffResult } from './diff.js';

  const STORAGE_KEY_A = 'htmldiff_inputA';
  const STORAGE_KEY_B = 'htmldiff_inputB';

  let inputA = $state('');
  let inputB = $state('');
  let result = $state<DiffResult | null>(null);

  let panelA = $state<HTMLDivElement | null>(null);
  let panelB = $state<HTMLDivElement | null>(null);

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY_A, inputA);
      localStorage.setItem(STORAGE_KEY_B, inputB);
    } catch {
      /* storage unavailable, e.g. sandboxed preview */
    }
  }

  onMount(() => {
    try {
      inputA = localStorage.getItem(STORAGE_KEY_A) ?? '';
      inputB = localStorage.getItem(STORAGE_KEY_B) ?? '';
    } catch {
      /* storage unavailable */
    }
  });

  function compare() {
    result = compareHtml(inputA, inputB);
  }

  function clearAll() {
    inputA = '';
    inputB = '';
    result = null;
    try {
      localStorage.removeItem(STORAGE_KEY_A);
      localStorage.removeItem(STORAGE_KEY_B);
    } catch {
      /* storage unavailable */
    }
  }

  async function loadFile(event: Event, side: 'A' | 'B') {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const text = await file.text();
    if (side === 'A') inputA = text;
    else inputB = text;
    input.value = '';
    save();
  }

  function format(side: 'A' | 'B') {
    if (side === 'A') inputA = formatHtml(inputA);
    else inputB = formatHtml(inputB);
    save();
  }

  // Keep both tree panels scrolled in lockstep.
  let syncing = false;
  function syncScroll(source: HTMLDivElement | null, target: HTMLDivElement | null) {
    if (syncing || !source || !target) return;
    syncing = true;
    target.scrollTop = source.scrollTop;
    target.scrollLeft = source.scrollLeft;
    syncing = false;
  }
</script>

{#snippet source(side: 'A' | 'B', label: string)}
  <Field class="flex-1">
    <div class="flex items-center justify-between gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div class="flex items-center gap-2">
        <Button onclick={() => format(side)} size="xs" variant="outline">Format</Button>
        <Button
          onclick={(e: MouseEvent) =>
            (e.currentTarget as HTMLElement).parentElement?.querySelector('input')?.click()}
          size="xs"
          variant="outline"
        >
          <UploadIcon /> Upload
        </Button>
        <input
          class="hidden"
          accept=".html,.htm,text/html"
          onchange={(e) => loadFile(e, side)}
          type="file"
        />
      </div>
    </div>
    {#if side === 'A'}
      <Textarea
        class="font-mono text-xs"
        oninput={save}
        placeholder="Paste original HTML here..."
        bind:value={inputA}
      />
    {:else}
      <Textarea
        class="font-mono text-xs"
        oninput={save}
        placeholder="Paste new HTML here..."
        bind:value={inputB}
      />
    {/if}
  </Field>
{/snippet}

<div class="min-h-svh w-full bg-background p-6 text-foreground">
  <div class="mx-auto flex max-w-6xl flex-col gap-4">
    <header>
      <h1 class="text-lg font-semibold">HTML Structure Diff</h1>
      <p class="text-sm text-muted-foreground">
        Paste or upload two HTML snippets. Comparison ignores whitespace and ordering noise — it
        diffs tags, ids, classes, attributes, and structure.
      </p>
    </header>

    <div class="flex flex-col gap-4 md:flex-row">
      {@render source('A', 'Original (A)')}
      {@render source('B', 'New (B)')}
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <Button onclick={compare}>Compare</Button>
      <Button onclick={clearAll} variant="outline">Clear</Button>
      {#if result}
        <span class="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="success">{result.stats.added} added</Badge>
          <Badge variant="error">{result.stats.removed} removed</Badge>
          <Badge variant="warning">{result.stats.changed} changed</Badge>
        </span>
      {/if}
    </div>

    <div class="flex flex-wrap gap-4 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5"
        ><span class="size-2 rounded-full bg-success"></span> added node</span
      >
      <span class="flex items-center gap-1.5"
        ><span class="size-2 rounded-full bg-destructive"></span> removed node</span
      >
      <span class="flex items-center gap-1.5"
        ><span class="size-2 rounded-full bg-warning"></span> changed attrs / text / descendants</span
      >
    </div>

    {#if result}
      <div class="grid gap-4 md:grid-cols-2">
        {#each [{ title: 'Original (A)', nodes: result.a, side: 'A' }, { title: 'New (B)', nodes: result.b, side: 'B' }] as panel (panel.side)}
          <Card>
            <CardPanel class="p-3!">
              <h2
                class="mb-2 ml-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {panel.title}
              </h2>
              {#if panel.side === 'A'}
                <div
                  bind:this={panelA}
                  class="max-h-140 overflow-auto font-mono text-xs"
                  onscroll={() => syncScroll(panelA, panelB)}
                >
                  {#each panel.nodes as node, i (i)}<TreeNode {node} />{:else}<em
                      class="text-muted-foreground">empty</em
                    >{/each}
                </div>
              {:else}
                <div
                  bind:this={panelB}
                  class="max-h-140 overflow-auto font-mono text-xs"
                  onscroll={() => syncScroll(panelB, panelA)}
                >
                  {#each panel.nodes as node, i (i)}<TreeNode {node} />{:else}<em
                      class="text-muted-foreground">empty</em
                    >{/each}
                </div>
              {/if}
            </CardPanel>
          </Card>
        {/each}
      </div>
    {/if}
  </div>
</div>
