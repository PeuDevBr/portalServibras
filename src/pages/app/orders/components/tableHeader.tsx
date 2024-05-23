import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLocation } from "react-router-dom";

export function TableHeaders() {
  const { pathname } = useLocation();

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="min-w-[20px]" />
        <TableHead className="min-w-[200px]">Fornecedor</TableHead>
        <TableHead className="min-w-[300px]">Nº do pedido</TableHead>
        {pathname === "/orders" ? (
          <TableHead className="min-w-[300px]">Pedido Efetuado</TableHead>
        ) : (
          <TableHead className="min-w-[300px]">Tempo de entrega</TableHead>
        )}
        <TableHead className="min-w-[300px]">Status</TableHead>
        <TableHead className="w-[40px] text-right" />
        <TableHead className="w-[40px] text-right" />
        <TableHead className="w-[40px] text-right" />
      </TableRow>
    </TableHeader>
  );
}
