import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type PaginationTableProps = {
  page: number;
  pages: number;
};

export function PaginationTable({ page, pages }: PaginationTableProps) {
  const [, setSearchParams] = useSearchParams();

  function goToPage(nextPage: number) {
    setSearchParams((params) => {
      params.set("page", String(nextPage));
      return params;
    });
  }

  return (
    <div className={cn("flex items-center gap-3")}>
      <span className="text-sm text-zinc-500">
        Página {page} de {pages}
      </span>
      <Button
        data-test-id="pagination-previous-button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
      >
        Anterior
      </Button>
      <Button
        data-test-id="pagination-next-button"
        variant="outline"
        size="sm"
        disabled={page >= pages}
        onClick={() => goToPage(page + 1)}
      >
        Próxima
      </Button>
    </div>
  );
}
