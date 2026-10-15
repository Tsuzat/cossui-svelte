<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let { class: className, children, id, ...restProps }: HTMLAttributes<HTMLHeadingElement> =
    $props();
</script>

<h2 {id} class={cn('mt-12 scroll-m-20 font-heading font-semibold text-2xl first:mt-0 lg:mt-16 *:[code]:text-2xl', className)} {...restProps}>
  <a class="no-underline underline-offset-4 hover:underline" href="#{id}">
    {@render children?.()}
  </a>
</h2>
