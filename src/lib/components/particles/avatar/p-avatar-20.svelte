<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
</script>

<Tooltip>
  <TooltipTrigger
    class="inline-flex rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
  >
    <Avatar>
      <AvatarImage
        alt="Frida Kahlo"
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
      />
      <AvatarFallback>FK</AvatarFallback>
    </Avatar>
  </TooltipTrigger>
  <TooltipPopup>Frida Kahlo</TooltipPopup>
</Tooltip>
