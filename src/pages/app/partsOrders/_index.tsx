import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { FolderSymlink, Search, X } from "lucide-react";
import { OrderStatus } from "@/components/orderStatus/order-status";
import { NewOrderDialog, UpdateOrderDialog } from "./orderDialog";
import { useContext, useEffect } from "react";
import { OrdersContext } from "@/contexts/partsOrdersContext";
import { OrdersFilter } from "./ordersFilter";
import { Link } from "react-router-dom";

/*interface supplierProps {
  supplier: {
    supplier: string;
    orderNumber: string;
    orderDate: Date;
    status:
      | "waitingSend"
      | "delivered"
      | "financialBlock"
      | "taxBlock"
      | "send";
    openingDate: Date;
  };
} */
export function PartsOrders() {
  const { ordersList, getOrdersList, deleteOrder, archiveOrder } =
    useContext(OrdersContext);

  function handleDeleteOrder(id: string) {
    deleteOrder(id);
  }

  function handleArchiveOrder(order: any) {
    archiveOrder(order);
  }

  useEffect(() => {
    getOrdersList();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between pb-10">
        <OrdersFilter />
        <NewOrderDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]" />
            <TableHead className="w-[200px]">Fornecedor</TableHead>
            <TableHead className="w-[300px]">Nº do pedido</TableHead>
            <TableHead className="w-[300px]">Pedido efetuado</TableHead>
            <TableHead className="w-[300px]">Status</TableHead>
            <TableHead className="w-[40px] text-right" />
            <TableHead className="w-[40px] text-right" />
            <TableHead className="w-[40px] text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersList.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Button variant="ghost" size={"sm"} >
                  <Link to={order.url} target="_blank">
                    <Search className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="font-medium">{order.supplier}</TableCell>
              <TableCell className="">{order.orderNumber}</TableCell>
              <TableCell
                title={format(order.orderDate, " d 'de' LLLL 'de' yyyy", {
                  locale: ptBR,
                })}
                className=""
              >
                {formatDistanceToNow(order.orderDate, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell className="">
                <div className="flex items-center gap-2">
                  <OrderStatus status={order.status} />
                  {order.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <UpdateOrderDialog order={order} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size={"sm"}
                  title="Arquivar"
                  onClick={() => handleArchiveOrder(order)}
                >
                  <FolderSymlink className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size={"sm"}
                  title="Excluir"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
