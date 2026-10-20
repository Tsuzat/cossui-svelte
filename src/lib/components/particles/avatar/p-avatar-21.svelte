<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage
  } from '#lib/components/ui/avatar/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';

  const people = [
    { initials: 'FK', name: 'Frida Kahlo', photo: 'photo-1543610892-0b1f7e6d8ac1' },
    { initials: 'NE', name: 'Nadia Ekman', photo: 'photo-1628157588553-5eeea00af15c' },
    { initials: 'EW', name: 'Eli Wren', photo: 'photo-1655874819398-c6dfbec68ac7' }
  ];
</script>

<AvatarGroup>
  {#each people as person (person.initials)}
    <Tooltip>
      <TooltipTrigger
        class="inline-flex rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
      >
        <Avatar>
          <AvatarImage
            alt={person.name}
            src="https://images.unsplash.com/{person.photo}?w=96&h=96&dpr=2&q=80"
          />
          <AvatarFallback>{person.initials}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipPopup>{person.name}</TooltipPopup>
    </Tooltip>
  {/each}
  <AvatarGroupCount>+2</AvatarGroupCount>
</AvatarGroup>
