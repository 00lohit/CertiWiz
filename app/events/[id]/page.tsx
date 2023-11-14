"use server";
import Editable from "@/components/custom/EventEdit/Editable";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Suspense, useEffect, useState } from "react";

export default async function Event({ params }: { params: { id: string } }) {
  let { id } = params;

  return (
    <div className="bg-red h-full w-full">
      <div className="grid lg:grid-cols-5 h-full">
        <Sidebar id={id} />
      </div>
    </div>
  );
}

function Sidebar({ id }: { id: string }) {
  return (
    <div className={"border-r overflow-hidden flex flex-col relative"}>
      <Suspense fallback={<Loader />}>
        <EventData id={id} />
      </Suspense>
    </div>
  );
}

async function getEvent(id: string) {
  let res = await fetch(`${process.env.NEXTAUTH_URL}/api/events/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const EventData = async ({ id }: { id: string }) => {
  let { data } = await getEvent(id);

  let { creator, date, name } = data;

  let dateText = date && format(new Date(date), "dd-MM-yyyy");

  return (
    <>
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
      <Editable id={id} />
    </>
  );
};

const Loader = () => (
  <div className="flex flex-col w-full space-y-6 p-3">
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-6" />
    <div className="space-x-4 flex items-center justify-end justify-self-end absolute bottom-2 right-2">
      <Skeleton className="w-20 h-8" />
      <Skeleton className="w-20 h-8" />
    </div>
  </div>
);
