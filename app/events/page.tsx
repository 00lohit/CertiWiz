"use client";
import { useEffect, useState } from "react";

export default function Event() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/all`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Event not found");
        }
      })
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event:", error));
  }, []);

  return <h1>{JSON.stringify(event)}</h1>;
}
