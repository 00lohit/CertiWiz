import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { useEffect } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
  length: number;
  setPage: (a: string) => void;
  page: string | null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  count,
  length,
  setPage,
  page = "1",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        {...{
          data: data.length,
          count,
          length,
          setPage,
          page,
        }}
      />
    </div>
  );
}

interface PaginationProps {
  data: number;
  count: number;
  length: number;
  setPage: (a: string) => void;
  page: string | null;
}

const Pagination = ({
  data,
  count,
  length,
  setPage,
  page,
}: PaginationProps) => {
  let num = parseInt(page ?? "");

  const pageNumber = isNaN(num) ? 1 : num;

  const PreviousDisbaled = pageNumber <= 1;
  const NextDisbaled = count <= length * pageNumber;

  const onPrevious = () => {
    let dec = pageNumber - 1;
    setPage(dec.toString());
  };
  const onNext = () => {
    let inc = pageNumber + 1;
    setPage(inc.toString());
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={PreviousDisbaled}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={NextDisbaled}
      >
        Next
      </Button>
    </div>
  );
};
