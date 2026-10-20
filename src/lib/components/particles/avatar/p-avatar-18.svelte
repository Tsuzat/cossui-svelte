<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
</script>

<Avatar
  as="a"
  href="#people"
  aria-label="View Nadia Ekman's profile"
  class="cursor-pointer outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
>
  <AvatarImage
    alt="Nadia Ekman"
    src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80"
  />
  <AvatarFallback>NE</AvatarFallback>
</Avatar>
