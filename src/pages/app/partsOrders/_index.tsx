import { Table } from "@/components/ui/table";

import { NewOrderDialog } from "./orderDialog";
import { useContext, useEffect } from "react";
import { OrdersContext } from "@/contexts/ordersContext";
import { OrdersFilter } from "./ordersFilter";
import { TableHeaders } from "./components/tableHeader";
import { TableBodys } from "./components/tableBody";

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
        <TableHeaders />

        <TableBodys
          ordersList={ordersList}
          handleDeleteOrder={handleDeleteOrder}
          handleArchiveOrder={handleArchiveOrder}
        />
      </Table>
    </div>
  );
}
