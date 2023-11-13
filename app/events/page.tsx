"use client";
import { DataTable } from "@/components/custom/data-table";
import useUrlQuery from "@/lib/useUrlQuery";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const columns: any = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => {
      const date = new Date(row.getValue("date"));
      return format(date, "dd-MM-yyyy");
    },
  },
  {
    accessorKey: "name",
    header: "Event",
  },
  {
    accessorKey: "creator",
    header: "Creator",
  },
];

export interface dataType {
  data: [];
  count: number;
}

export default function Event() {
  const [Loading, setLoading] = useState(true);
  const router = useRouter();
  const [data, setData] = useState<dataType>({
    data: [],
    count: 0,
  });
  const my = useUrlQuery("my").value;
  const search = useUrlQuery("search").value;

  const { value: page, genrateUrl: setPage } = useUrlQuery("page");

  let length = 15;

  const apiCall = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        `/api/events/all?my=${my}&search=${
          search ?? ""
        }&size=${length.toString()}&page=${page ?? "1"}`
      );

      if (!response.ok) {
        throw new Error("Event not found");
      }

      let data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, [my, search, page]);

  const navigate = (e: string) => {
    router.push(setPage(e));
  };

  return (
    <div className="p-4">
      {Loading ? (
        <div className="space-y-2">
          <div className="space-x-2 flex w-full items-center justify-center">
            <Skeleton className="h-7 flex-1" />
            <Skeleton className="h-7 flex-1" />
            <Skeleton className="h-7 flex-1" />
          </div>
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-full" />
        </div>
      ) : (
        <DataTable
          route={"events/"}
          columns={columns}
          data={data.data}
          count={data.count}
          length={length}
          setPage={navigate}
          page={page}
        />
      )}
    </div>
  );
}
