import { OrderStatus } from "@/components/orderStatus/order-status";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FolderSymlink, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { UpdateOrderDialog } from "../orderDialog";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface Order {
  orderDate?: string;
  deliveryDate?: string;
  orderNumber: string;
  status: string;
  supplier: string;
  id: string;
  url: string;
}

interface TableBodysProps {
  ordersList: Order[];
  handleDeleteOrder?: (id: string) => void;
  handleArchiveOrder?: (order: Order) => void;
}

export function TableBodys({
  ordersList,
  handleDeleteOrder,
  handleArchiveOrder,
}: TableBodysProps) {
  return (
    <TableBody>
      {ordersList.map((order) => (
        <TableRow key={order.id}>
          <TableCell>
            <Button variant="ghost" size={"sm"}>
              <Link to={order.url} target="_blank">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
          </TableCell>
          <TableCell className="font-medium">{order.supplier}</TableCell>
          <TableCell className="">{order.orderNumber}</TableCell>
          {order.orderDate && (
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
          )}
          {order.deliveryDate && (
            <TableCell className="">{order.deliveryDate}</TableCell>
          )}
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
              onClick={() => handleArchiveOrder && handleArchiveOrder(order)}
            >
              <FolderSymlink className="h-4 w-4" />
            </Button>
          </TableCell>
          <TableCell className="text-right">
            <Button
              variant="ghost"
              size={"sm"}
              title="Excluir"
              onClick={() => handleDeleteOrder && handleDeleteOrder(order.id)}
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
