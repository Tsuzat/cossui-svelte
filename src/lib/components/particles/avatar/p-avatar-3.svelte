<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';

  const sizes = [
    { px: 48, size: '[--avatar-size:--spacing(4)]' },
    { px: 72, size: '[--avatar-size:--spacing(6)]' },
    { px: 96, size: '[--avatar-size:--spacing(8)]' },
    { px: 120, size: '[--avatar-size:--spacing(10)]' },
    { px: 144, size: '[--avatar-size:--spacing(12)]' }
  ];
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center gap-4">
    {#each sizes as { px, size } (px)}
      <Avatar class={size}>
        <AvatarImage
          alt="User"
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w={px}&h={px}&dpr=2&q=80"
        />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    {/each}
  </div>
  <div class="flex items-center gap-4">
    {#each sizes as { px, size } (px)}
      <Avatar class={size}>
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    {/each}
  </div>
</div>
