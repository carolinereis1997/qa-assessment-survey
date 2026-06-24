import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./headless/table";
import { PaginationTable } from "./pagination-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  page?: number;
  pages?: number;
  loading: boolean;
}

export default function Table<TData, TValue>({
  columns,
  data = [],
  page = 1,
  pages = 1,
  loading,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const ordination = searchParams.get("ordination") ?? "desc";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function toggleSort() {
    setSearchParams((params) => {
      params.set("orderBy", "nome");
      params.set("ordination", ordination === "asc" ? "desc" : "asc");
      params.set("page", "1");
      return params;
    });
  }

  return (
    <div className="w-full">
      <div className="flex justify-between py-4">
        <Button
          data-test-id="order-by-name-button"
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={toggleSort}
        >
          {ordination === "asc" ? "Nome (A → Z)" : "Nome (Z → A)"}
        </Button>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white">
        <TableComponent>
          <TableHeader className="bg-zinc-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    data-test-id={`data-table-${header.index}-header`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!!table.getRowModel().rows.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-test-id={`data-table-content-row-${row.id}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!table.getRowModel().rows.length && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className={cn("py-10 text-center font-medium text-zinc-500")}
                >
                  {loading ? "Carregando pesquisas…" : "Sem resultados"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </div>

      <div className="mt-4 flex justify-end">
        <PaginationTable page={page} pages={pages} />
      </div>
    </div>
  );
}
