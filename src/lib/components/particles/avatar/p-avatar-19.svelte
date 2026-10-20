<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';

  const people = [
    {
      initials: 'FK',
      name: 'Frida Kahlo',
      photo: 'photo-1543610892-0b1f7e6d8ac1',
      role: 'Design'
    },
    {
      initials: 'NE',
      name: 'Nadia Ekman',
      photo: 'photo-1628157588553-5eeea00af15c',
      role: 'Engineering'
    },
    { initials: 'EW', name: 'Eli Wren', photo: '', role: 'Research' }
  ];
</script>

<div class="flex w-full flex-col gap-4 [--avatar-size:--spacing(10)]">
  {#each people as person (person.initials)}
    <div class="flex items-center gap-3">
      <Avatar>
        {#if person.photo}
          <AvatarImage
            alt={person.name}
            src="https://images.unsplash.com/{person.photo}?w=120&h=120&dpr=2&q=80"
          />
        {/if}
        <AvatarFallback>{person.initials}</AvatarFallback>
      </Avatar>
      <div class="flex min-w-0 flex-col">
        <span class="truncate text-sm font-medium">{person.name}</span>
        <span class="truncate text-xs text-muted-foreground">{person.role}</span>
      </div>
    </div>
  {/each}
</div>
