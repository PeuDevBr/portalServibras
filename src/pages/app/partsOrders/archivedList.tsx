import { Table } from "@/components/ui/table";

import { useContext, useEffect } from "react";
import { ArchivedOrdersContext } from "@/contexts/archivedOrdersContext";
import { ArchivedOrdersFilter } from "./archivedOrdersFilter";
import { TableHeaders } from "./components/tableHeader";
import { TableBodys } from "./components/tableBody";

export function ArchivedOrdersList() {
  const { archivedOrdersList, getArchivedOrdersList } = useContext(
    ArchivedOrdersContext,
  );

  useEffect(() => {
    getArchivedOrdersList();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between pb-10">
        <ArchivedOrdersFilter />
      </div>
      <Table>
        <TableHeaders />

        <TableBodys ordersList={archivedOrdersList} />
      </Table>
    </div>
  );
}
