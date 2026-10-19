<script lang="ts">
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger
  } from '#lib/components/ui/select/index.js';

  const languages: Record<string, string> = {
    cpp: 'C++',
    csharp: 'C#',
    go: 'Go',
    java: 'Java',
    javascript: 'JavaScript',
    php: 'PHP',
    python: 'Python',
    rust: 'Rust',
    swift: 'Swift',
    typescript: 'TypeScript'
  };

  const values = Object.keys(languages);
  const items = values.map((value) => ({ label: languages[value], value }));

  let selected = $state<string[]>(['javascript', 'typescript']);

  const summary = $derived.by(() => {
    if (selected.length === 0) return 'Select languages…';
    const first = languages[selected[0]];
    return selected.length === 1 ? first : `${first} (+${selected.length - 1} more)`;
  });
</script>

<Select bind:value={selected} {items} multiple>
  <SelectTrigger aria-label="Select languages">
    <span class="flex-1 truncate">{summary}</span>
  </SelectTrigger>
  <SelectPopup>
    {#each values as value (value)}
      <SelectItem {value}>{languages[value]}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
