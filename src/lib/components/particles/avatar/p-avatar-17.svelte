<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
</script>

<Avatar
  as="button"
  type="button"
  aria-label="Open Frida Kahlo's profile"
  class="cursor-pointer outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
>
  <AvatarImage
    alt="Frida Kahlo"
    src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
  />
  <AvatarFallback>FK</AvatarFallback>
</Avatar>
