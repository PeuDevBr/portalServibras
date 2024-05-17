import { useContext, useEffect } from "react";

import { NewRequisitionDialog } from "./requisitionDialog";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequisitionsContext } from "@/contexts/requisitionsContex";
import { NewFilterRequisitionList } from "./requisitionsFilter";
export function RequisitionsList() {
  const { handleDeleteRequisition, requisitionsList, getRequisitionsList } =
    useContext(RequisitionsContext);

  useEffect(() => {
    getRequisitionsList();
  }, []);

  return (
    <div className="flex flex-col items-center pb-20">
      <div className="w-full pb-4">
        <h3 className="pb-4 text-3xl font-bold">Lista de requisições</h3>
        <NewFilterRequisitionList />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead className="w-[220px]">Técnicos</TableHead>
            <TableHead className="w-[260px]">Descrição</TableHead>
            <TableHead className="w-[220px] text-center">Quantidade</TableHead>
            <TableHead className="w-[220px]">Data</TableHead>
            <TableHead className="text-right">
              <NewRequisitionDialog />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requisitionsList.map((requisition: any) => (
            <TableRow key={requisition.id}>
              <TableCell>{requisition.technicianName}</TableCell>
              <TableCell>{requisition.itemDescription}</TableCell>
              <TableCell className="text-center">
                {requisition.amount}
              </TableCell>
              <TableCell className="">{requisition.openingDate}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size={"sm"}
                  onClick={() => handleDeleteRequisition(requisition.id)}
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
