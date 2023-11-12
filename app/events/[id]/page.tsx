"use client";
import { useEffect, useState } from "react";

export default function Event({ params }: { params: { id: string } }) {
  let { id } = params;

  return (
    <div className="bg-red h-full w-full">
      <div className="grid lg:grid-cols-5 h-full">
        <Sidebar id={id} />
      </div>
    </div>
  );
}

export function Sidebar({ id }: { id: string }) {
  const [event, setEvent] = useState(null);

  const apiCall = () => {
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
  };

  useEffect(() => {
    id && apiCall();
  }, [id]);
  return (
    <div className={"border-r h-full overflow-hidden"}>
      <h1>{JSON.stringify(event)}</h1>
    </div>
  );
}
