"use client";
import { DataTable } from "@/components/custom/data-table";
import useUrlQuery from "@/lib/useUrlQuery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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
  const router = useRouter();
  const [data, setData] = useState<dataType>({
    data: [],
    count: 0,
  });
  const my = useUrlQuery("my").value;
  const search = useUrlQuery("search").value;

  const { value: page, genrateUrl: setPage } = useUrlQuery("page");

  let length = 15;

  const apiCall = () => {
    fetch(
      `/api/events/all?my=${my}&search=${
        search ?? ""
      }&size=${length.toString()}&page=${page ?? "1"}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Event not found");
        }
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching event:", error));
  };

  console.log(data.data[0]);

  useEffect(() => {
    apiCall();
  }, [my, search, page]);

  const navigate = (e: string) => {
    router.push(setPage(e));
  };

  return (
    <div className="p-4">
      <DataTable
        route={"events/"}
        columns={columns}
        data={data.data}
        count={data.count}
        length={length}
        setPage={navigate}
        page={page}
      />
    </div>
  );
}
