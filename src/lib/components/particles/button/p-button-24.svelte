<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import RiFacebookFill from '#lib/components/icons/FacebookFillLogos.svelte';
  import RiGithubFill from '#lib/components/icons/GithubFillLogos.svelte';
  import RiGoogleFill from '#lib/components/icons/GoogleFillLogos.svelte';
  import RiTwitterXFill from '#lib/components/icons/TwitterXFillLogos.svelte';
</script>

<div class="inline-flex flex-wrap gap-2">
  <Button aria-label="Login with Google" size="icon" variant="outline">
    <RiGoogleFill aria-hidden="true" />
  </Button>
  <Button aria-label="Login with Facebook" size="icon" variant="outline">
    <RiFacebookFill aria-hidden="true" />
  </Button>
  <Button aria-label="Login with X" size="icon" variant="outline">
    <RiTwitterXFill aria-hidden="true" />
  </Button>
  <Button aria-label="Login with GitHub" size="icon" variant="outline">
    <RiGithubFill aria-hidden="true" />
  </Button>
</div>
