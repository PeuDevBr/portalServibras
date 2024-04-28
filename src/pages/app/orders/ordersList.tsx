import { useEffect, useState } from "react";
import { getRequisitionsObservers } from "@/services/observers/requisitionsObservers";
import { deleteRequisitionsAction } from "@/services/actions/requisitionsAction";
import { NewOrder } from "./newOrder";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
export function OrdersList() {
  const [requisitions, setRequisitions] = useState<any[]>([]);

  async function handleDeleteRequisition(id: string) {
    await deleteRequisitionsAction(id);
  }

  useEffect(() => {
    getRequisitionsObservers(setRequisitions);
  }, []);

  return (
    <div className="flex flex-col items-center pb-20">
      <h3 className="pb-12 text-3xl">Lista de requisições</h3>

      <Table>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead className="w-[220px]">Técnico</TableHead>
            <TableHead className="w-[260px]">Descrição</TableHead>
            <TableHead className="w-[220px] text-center">Quantidade</TableHead>
            <TableHead className="w-[220px]">Data</TableHead>
            <TableHead className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"ghost"} size={"sm"}>
                    <Plus className="h-4 w-4 text-green-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-h-[625px] sm:max-w-[425px]">
                  <NewOrder DialogClose={DialogClose} />
                </DialogContent>
              </Dialog>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requisitions.map((requisition) => (
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
