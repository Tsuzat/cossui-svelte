<script lang="ts">
  import { Textarea } from '#lib/components/ui/textarea/index.js';

  const id = $props.id();
</script>

<Textarea
  aria-label="Read-only text"
  {id}
  class="read-only:bg-muted"
  value="This is a read-only textarea"
  readonly
/>
