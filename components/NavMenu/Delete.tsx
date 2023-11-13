"use client";
import { Button } from "../ui/button";

export default function Delete({ id }: { id: string }) {
  return (
    <Button className="m-2" variant="destructive">
      Delete
    </Button>
  );
}
