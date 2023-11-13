"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const deleteEvent = async (id: string) => {
  try {
    const response = await fetch(`/api/events/${id}/delete`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while deleting the event and certificates",
    };
  }
};

export default function Delete({ id }: { id: string }) {
  const router = useRouter();

  const onClick = async () => {
    let { success } = await deleteEvent(id);
    success && router.back();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="m-2" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action will also
            permanently delete all participant certificates linked to this
            event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
