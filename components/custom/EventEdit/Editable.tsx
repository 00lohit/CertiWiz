"use client";
import Delete from "./Delete";
import { Update } from "./Update";

async function getData(id: string) {
  let res = await fetch(`/api/events/${id}/editable`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Editable({ id }: { id: string }) {
  let { data } = await getData(id);

  return (
    data.editable && (
      <div className="flex items-center justify-end justify-self-end absolute bottom-2 right-2">
        <Delete id={id} />
        <Update {...data} />
      </div>
    )
  );
}
