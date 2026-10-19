<script lang="ts">
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '#lib/components/ui/alert-dialog/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
</script>

<AlertDialog>
  <AlertDialogTrigger class={buttonVariants({ variant: 'destructive-outline' })}>
    Delete Account
  </AlertDialogTrigger>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter variant="bare">
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogClose class={buttonVariants({ variant: 'destructive' })}>
        Delete Account
      </AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
