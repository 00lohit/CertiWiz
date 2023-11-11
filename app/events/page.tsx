"use client";
import useUrlQuery from "@/lib/useUrlQuery";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Event() {
  const [event, setEvent] = useState([]);
  const { value } = useUrlQuery("my");

  let session: any = useSession().data;
  let creatorId = session?.user?.id;

  useEffect(() => {
    fetch(`/api/events/all?my=` + value, {
      headers: {
        Authorization: creatorId,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Event not found");
        }
      })
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [value, creatorId]);

  return (
    <h1>
      {event.length}
      {JSON.stringify(event)}
    </h1>
  );
}
