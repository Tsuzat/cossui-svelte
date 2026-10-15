<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, alt = '', ...restProps }: HTMLImgAttributes = $props();
</script>

<img {alt} class={cn('rounded-md', className)} {...restProps} />
