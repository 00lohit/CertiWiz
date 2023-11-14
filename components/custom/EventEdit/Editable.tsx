"use client";
import { useEffect, useState } from "react";
import Delete from "./Delete";
import { Update } from "./Update";

export default function Editable({ id }: { id: string }) {
  const [data, setData] = useState<any>({});
  const apiCall = async () => {
    try {
      let response = await fetch(`/api/events/${id}/editable`);
      if (!response.ok) {
        throw new Error("Event not found");
      }
      let data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    id && apiCall();
  }, [id]);

  return (
    data.editable && (
      <div className="flex items-center justify-end justify-self-end absolute bottom-2 right-2">
        <Delete id={id} />
        <Update {...data} />
      </div>
    )
  );
}
