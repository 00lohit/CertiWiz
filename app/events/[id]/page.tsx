"use client";
import { useEffect, useState } from "react";

export default function Event({ params }: { params: { id: string } }) {
  let { id } = params;

  const [event, setEvent] = useState(null);

  useEffect(() => {
    id &&
      fetch(`/api/events/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Event not found");
          }
        })
        .then((data) => setEvent(data))
        .catch((error) => console.error("Error fetching event:", error));
  }, [id]);

  return <h1>{JSON.stringify(event)}</h1>;
}
