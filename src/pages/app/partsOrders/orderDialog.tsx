import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, RefreshCw } from "lucide-react";
import { NewOrder } from "./newOrder";
import { UpdateOrder } from "./updateOrder";

export function NewOrderDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4 text-green-500" />
          Novo Pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-h-[625px] sm:max-w-[425px]">
        <NewOrder DialogClose={DialogClose} />
      </DialogContent>
    </Dialog>
  );
}

export function UpdateOrderDialog({ order }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"} title="Atualizar">
          <RefreshCw className="h-4 w-4 text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-h-[625px] sm:max-w-[425px]">
        <UpdateOrder DialogClose={DialogClose} order={order} />
      </DialogContent>
    </Dialog>
  );
}
