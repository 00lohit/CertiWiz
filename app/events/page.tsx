"use client";
import useUrlQuery from "@/lib/useUrlQuery";
``;
import { useEffect, useState } from "react";

export default function Event() {
  const [event, setEvent] = useState([]);
  const my = useUrlQuery("my").value;
  const search = useUrlQuery("search").value;

  useEffect(() => {
    fetch(`/api/events/all?my=${my}&search=${search ?? ""}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Event not found");
        }
      })
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [my, search]);

  return (
    <h1>
      {event.length}
      {JSON.stringify(event)}
    </h1>
  );
}
