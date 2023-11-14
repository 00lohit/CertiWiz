"use client";
import { useEffect, useState } from "react";
import Delete from "./Delete";
import { Update } from "./Update";
import { Skeleton } from "@/components/ui/skeleton";

export default function Editable({ id }: { id: string }) {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState<any>({});
  const apiCall = async () => {
    try {
      setloading(true);
      let response = await fetch(`/api/events/${id}/editable`);
      if (!response.ok) {
        throw new Error("Event not found");
      }
      let data = await response.json();
      setData(data.data);
      setloading(false);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    id && apiCall();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    data.editable && (
      <div className="flex items-center justify-end justify-self-end absolute bottom-2 right-2">
        <Delete id={id} />
        <Update {...data} />
      </div>
    )
  );
}

const Loader = () => (
  <div className="space-x-4 flex items-center justify-end justify-self-end absolute bottom-4 right-4">
    <Skeleton className="w-20 h-8" />
    <Skeleton className="w-20 h-8" />
  </div>
);
