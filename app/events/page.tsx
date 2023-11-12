"use client";
import { DataTable } from "@/components/custom/data-table";
import useUrlQuery from "@/lib/useUrlQuery";
import { useEffect, useState } from "react";

export const columns: any = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

export default function Event() {
  const [event, setEvent] = useState({ data: [] });
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
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={event.data}
        onPaginationChange={console.log}
      />
    </div>
  );
}
