"use client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit, Edit2, Edit3, EditIcon } from "lucide-react";
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
  const [data, setEvent] = useState<any>({});

  let { creator, date, editable, name } = data;
  let dateText = date && format(new Date(date), "dd-MM-yyyy");

  const apiCall = () => {
    fetch(`/api/events/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Event not found");
        }
      })
      .then((data) => setEvent(data.data))
      .catch((error) => console.error("Error fetching event:", error));
  };

  useEffect(() => {
    id && apiCall();
  }, [id]);

  console.log(data);

  return (
    <div className={"border-r overflow-hidden flex flex-col relative"}>
      <Button
        className={"absolute z-10 right-2 top-2"}
        variant="ghost"
        size="icon"
      >
        <div
          onClick={() => {}}
          className="w-full h-full flex items-center justify-center"
        >
          <EditIcon className="h-4 w-4" />
        </div>
      </Button>
      <div className="px-3 py-2 mt-4">
        <p className="text-sm  opacity-50">Event Name</p>
        <h2 className="mb-2 text-3xl font-semibold">{name}</h2>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm  opacity-50">Creator Name</p>
        <h2 className="mb-2 text-xl font-medium">{creator}</h2>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm  opacity-50">Date</p>
        <h2 className="mb-2 text-lg font-medium">{dateText}</h2>
      </div>
    </div>
  );
}
