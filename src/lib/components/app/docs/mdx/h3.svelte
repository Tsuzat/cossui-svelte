<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, id, ...restProps }: HTMLAttributes<HTMLHeadingElement> =
    $props();
</script>

<h3 {id} class={cn('mt-8 scroll-m-20 font-semibold text-lg *:[code]:text-lg', className)} {...restProps}>
  <a class="no-underline underline-offset-4 hover:underline" href="#{id}">
    {@render children?.()}
  </a>
</h3>
