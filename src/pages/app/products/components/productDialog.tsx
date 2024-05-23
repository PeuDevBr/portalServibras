import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileSliders, Plus } from "lucide-react";
//import { NewOrder } from "../partsOrders/newOrder";
import { AddProduct } from "./addProduct";
//import { UpdateProduct } from "./updateProduct";
import { UpdateProduct } from "../updateProduct/[code]";

export function AddProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4 text-green-500" />
          Nova peça
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-h-[625px] sm:max-w-[425px]">
        <AddProduct DialogClose={DialogClose} />
      </DialogContent>
    </Dialog>
  );
}

export function UpdateProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"} title="Atualizar">
          <FileSliders className="h-4 w-4 text-green-500 hover:scale-150 hover:transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <UpdateProduct />
      </DialogContent>
    </Dialog>
  );
}
